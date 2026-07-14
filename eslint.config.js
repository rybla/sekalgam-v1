import eslint_comments from "@eslint-community/eslint-plugin-eslint-comments";
import eslint_react from "@eslint-react/eslint-plugin";
import eslint_css from "@eslint/css";
import eslint_js from "@eslint/js";
import eslint_jsdoc from "eslint-plugin-jsdoc";
import eslint_pathAlias from "eslint-plugin-path-alias";
import eslint_reactExtras from "eslint-plugin-react";
import eslint_reactHooks from "eslint-plugin-react-hooks";
import eslint_reactRefresh from "eslint-plugin-react-refresh";
import eslint_simpleImportSort from "eslint-plugin-simple-import-sort";
import eslint_storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import path from "path";
import ts from "typescript";
import eslint_typescript from "typescript-eslint";
import tsconfig from "./tsconfig.json" with { type: "json" };

// --------------------------------
// custom plugins
// --------------------------------

const eslint_indexSignaturePropertyAccessRequiresBracketNotation = {
  rules: {
    "bracket-notation-for-indexed-types": {
      meta: {
        type: "suggestion",
        docs: {
          description:
            "Require bracket notation for property accesses of indexed types.",
        },
        fixable: "code",
        schema: [],
      },
      create(context) {
        const services = context.sourceCode.parserServices;
        if (!services || !services.program || !services.esTreeNodeToTSNodeMap) {
          return {};
        }
        const checker = services.program.getTypeChecker();

        return {
          MemberExpression(node) {
            if (node.computed) {
              return;
            }

            const property = node.property;
            if (property.type !== "Identifier") {
              return;
            }

            const tsNode = services.esTreeNodeToTSNodeMap.get(node.object);
            if (!tsNode) {
              return;
            }

            const type = checker.getTypeAtLocation(tsNode);
            if (!type) {
              return;
            }

            const isIndexedAccess = (t) => {
              if (t.flags & ts.TypeFlags.Union) {
                return t.types.some((constituent) =>
                  isIndexedAccess(constituent)
                );
              }

              const indexInfos = checker.getIndexInfosOfType(t);
              if (indexInfos.length === 0) {
                return false;
              }

              const hasProp = checker.getPropertyOfType(t, property.name);
              return !hasProp;
            };

            if (isIndexedAccess(type)) {
              context.report({
                node: property,
                message: `Property '${property.name}' comes from an index signature, so it must be accessed with bracket notation.`,
                fix(fixer) {
                  const isOptional = node.optional;
                  const replacement = isOptional
                    ? `?.["${property.name}"]`
                    : `["${property.name}"]`;
                  return fixer.replaceTextRange(
                    [node.object.range[1], node.property.range[1]],
                    replacement
                  );
                },
              });
            }
          },
        };
      },
    },
  },
};

// --------------------------------
// ESLint config
// --------------------------------

export default defineConfig([
  // Apply global ignores using the new helper to exclude build artifacts and dependencies
  globalIgnores([
    "dist",
    "node_modules",
    ".agent",
    "drizzle",
    "storybook-static",
    "vitest.shims.d.ts",
  ]),
  globalIgnores(["!.storybook"], "Include Storybook Directory"),

  // Define the main configuration block for TypeScript React files
  {
    // Target the specific file patterns this configuration applies to
    files: ["**/*.{ts,tsx}"],

    extends: [
      eslint_js.configs.recommended,
      eslint_typescript.configs.recommendedTypeChecked,
      eslint_react.configs["recommended-typescript"],
      eslint_react.configs["recommended-type-checked"],
      eslint_react.configs["jsx"],
      eslint_reactHooks.configs.flat.recommended,
      eslint_reactRefresh.configs.vite,
      eslint_storybook.configs["flat/recommended"],
      eslint_jsdoc.configs["flat/recommended-typescript"],
    ],

    // Set up language options such as the ECMAScript version and browser globals
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: eslint_typescript.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    // Register the required ESLint plugins locally
    plugins: {
      "simple-import-sort": eslint_simpleImportSort,
      "@eslint-community/eslint-comments": eslint_comments,
      "react-extras": eslint_reactExtras,
      "path-alias": eslint_pathAlias,
      "index-signature-property-access-requires-bracket-notation":
        eslint_indexSignaturePropertyAccessRequiresBracketNotation,
    },

    // Define specific linting rules, pulling in React recommendations and overriding defaults
    rules: {
      // Always use bracket notation on index signatures.
      "dot-notation": "off",
      "@typescript-eslint/dot-notation": [
        "error",
        { allowIndexSignaturePropertyAccess: false },
      ],
      "index-signature-property-access-requires-bracket-notation/bracket-notation-for-indexed-types":
        "error",
      // All variables must be used by default. To mark a variable as *intentionally* unused, prefix the variable name with "_".
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Variables used in jsdoc comments are marked as used.
      "jsdoc/no-undefined-types": [
        "error",
        {
          markVariablesAsUsed: true,
        },
      ],
      // Always require JSDoc descriptions of parameters and return values.
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns": "error",
      // All promises must be awaited. Promises *cannot* be left floating.
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/require-await": "off",
      // Forbid use of deprecated definitions.
      "@typescript-eslint/no-deprecated": "error",
      // All "eslint-disable" comments must also have a description.
      "@eslint-community/eslint-comments/require-description": "error",
      // Forbids style prop on native HTML elements (e.g., <div style={{...}} />)
      "react-extras/forbid-dom-props": ["error", { forbid: ["style"] }],
      // Forbids style prop on custom components (e.g., <MyComponent style={{...}} />)
      "react-extras/forbid-component-props": ["error", { forbid: ["style"] }],
      // Forbids <style> elements. Styles should always be defined in separate CSS files.
      "react-extras/forbid-elements": ["error", { forbid: ["style"] }],
      // All paths must be relative to their respective root path alias (e.g. "@", "@site", "@exe", etc.).
      "path-alias/no-relative": [
        "error",
        {
          paths: Object.fromEntries(
            Object.entries(tsconfig.compilerOptions.paths)
              .map(([k, vs]) => {
                if (!k.startsWith("@")) {
                  console.error(
                    `All path alias keys in tsconfig must start with "@". However, this path alias key does not start with "@": "${k}"`
                  );
                }

                // normalize key
                while (k.endsWith("*") || k.endsWith("/")) {
                  k = k.substring(0, k.length - 1);
                }

                return vs.map((v) => {
                  // normalize value
                  v = path.resolve(import.meta.dirname, v);

                  return [k, v];
                });
              })
              .flat()
          ),
        },
      ],
    },

    // Provide general settings expected by the plugins
    settings: {
      react: {
        version: "19.0",
      },
      // Point the plugin to your tsconfig.json so it correctly maps absolute paths from compilerOptions.paths
      path: {
        config: "tsconfig.json",
      },
      jsdoc: {
        mode: "typescript",
      },
    },
  },

  // Lint CSS files
  {
    files: ["**/*.css"],
    language: "css/css",
    ...eslint_css.configs.recommended,
    rules: {
      ...eslint_css.configs.recommended.rules,
      "css/no-invalid-properties": ["error", { allowUnknownVariables: true }],
      "css/use-baseline": "off",
    },
    languageOptions: {
      tolerant: true, // Crucial for PostCSS syntax like nesting and mixins
    },
  },
]);
