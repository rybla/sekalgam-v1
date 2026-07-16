/// <reference types="vitest/config" />
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import fs from "fs";
import { fileURLToPath } from "node:url";
import path from "path";
import { defineConfig } from "vite";
import packageConfig from "./package.json";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

function multiPageEntrypointsPlugin() {
  const router_path = "./site/Router.tsx";
  const index_path = "./dist/index.html";
  return {
    name: "multi-page-entrypoints",
    closeBundle() {
      if (!fs.existsSync(router_path)) {
        console.warn(
          `${log_prefix} Failed to find a React router at "${router_path}", so, skipping multi-page entrypoint generation.`
        );
        return;
      }
      if (!fs.existsSync(index_path)) {
        console.warn(
          `${log_prefix} Failed to find a index HTML file at "${index_path}", so, skipping multi-page entrypoint generation.`
        );
        return;
      }
      const index_content = fs.readFileSync(index_path, {
        encoding: "utf-8",
      });
      for (const page_path of fs.globSync("./site/page/**/*.page.tsx")) {
        const match = page_path.match(/^(?:\.\/)?site\/page\/(.*)\.page\.tsx$/);
        if (!match) {
          console.warn(
            `${log_prefix} Failed to extract page route from page path "${page_path}", so, skipping entrypoint generation`
          );
          continue;
        }
        const page_route = match[1];
        const entrypoint_filepaths = [
          `./dist/${page_route}.html`,
          `./dist/${page_route}/index.html`,
        ];
        for (const filepath of entrypoint_filepaths) {
          fs.mkdirSync(path.dirname(filepath), {
            recursive: true,
          });
          fs.writeFileSync(filepath, index_content, {
            encoding: "utf-8",
          });
        }
      }
      console.log("");
    },
  };
}
export default defineConfig({
  base: `/${packageConfig.name}/`,
  plugins: [react(), multiPageEntrypointsPlugin()],
  root: "site",
  cacheDir: path.resolve(__dirname, "node_modules", ".vite"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rolldownOptions: {
      input: ["index.html"],
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mantine/core")) {
              return "mantine";
            }
            if (id.includes("@phosphor-icons/react")) {
              return "phosphor";
            }
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "react-vendor";
            }
            if (id.includes("shiki") || id.includes("@shikijs")) {
              if (id.includes("langs") || id.includes("themes")) {
                return;
              }
              return "shiki-vendor";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@site": path.resolve(dirname, "site"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(dirname, "vitest.setup.mjs"),
    projects: [
      {
        extends: true,
        root: dirname,
        test: {
          name: "unit",
          include: ["**/*.test.ts"],
          setupFiles: [],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest(),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
