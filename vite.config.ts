/// <reference types="vite/client" />

import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import svgr from "vite-plugin-svgr";
import { injectJsHotReloadPlugin } from "./vite.plugin.hot";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV ?? "production"
    ),
  },
  plugins: [
    injectJsHotReloadPlugin("main.tsx"),
    svgr(),
    react(),
    dts({
      exclude: ["node_modules", "**/*.stories.ts", "src/test", "**/*.test.tsx"],
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, "src/main.tsx"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  server: {},
});
