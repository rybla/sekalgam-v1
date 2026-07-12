/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import packageConfig from "./package.json";

function multiPageEntrypointsPlugin() {
  const log_prefix = `[multi-page-entrypoints]`;

  return {
    name: "multi-page-entrypoints",
    closeBundle() {
      const router_path = "./site/Router.tsx";
      if (!fs.existsSync(router_path)) {
        console.warn(
          `${log_prefix} Failed to find a React router at "${router_path}", so, skipping multi-page entrypoint generation.`
        );
        return;
      }

      const out_dir = path.join(".", "dist");
      const index_path = path.join(out_dir, "index.html");
      if (!fs.existsSync(index_path)) {
        console.warn(
          `${log_prefix} Failed to find a index HTML file at "${index_path}", so, skipping multi-page entrypoint generation.`
        );
        return;
      }

      const index_content = fs.readFileSync(index_path, { encoding: "utf-8" });

      console.log(
        `${log_prefix} Generating entrypoints for each page route...`
      );
      for (const page_path of fs.globSync("./site/**/*.page.tsx")) {
        const match = page_path.match(/^(?:\.\/)?site\/(.*)\.page\.tsx$/);
        if (!match) {
          console.warn(
            `${log_prefix} Failed to extract page route from page path "${page_path}", so, skipping entrypoint generation`
          );
          continue;
        }
        const page_route = match[1];

        const entrypoint_filepaths = [
          path.join(out_dir, `${page_route}.html`),
          path.join(out_dir, page_route, `index.html`),
        ];
        for (const filepath of entrypoint_filepaths) {
          fs.mkdirSync(path.dirname(filepath), { recursive: true });
          fs.writeFileSync(filepath, index_content, { encoding: "utf-8" });
        }

        console.log(
          `${log_prefix} Successfully generated entrypoints for page route "${page_route}"`
        );
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
    },
  },

  resolve: {
    tsconfigPaths: true,
    alias: {
      "@site": path.resolve(__dirname, "site"),
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "vitest.setup.mjs"),
    projects: [
      {
        extends: true,
        plugins: [
          // storybookTest
        ],
      },
    ],
  },
});
