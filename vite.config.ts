/// <reference types="vite/client" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV ?? "production"
    ),
  },
  plugins: [
    svgr(),
    react(),
    dts({
      exclude: ["node_modules", "**/*.stories.ts", "src/test", "**/*.test.tsx"],
    }),
    libInjectCss(),
  ],
  build: {
    target: "esnext",
    outDir: "dist",
    // lib: {
    //   name: "site",
    //   entry: {
    //     site: resolve(__dirname, "src/site.tsx"),
    //   },
    //   formats: ["umd"],
    // },
    rollupOptions: {
      input: {
        site: resolve(__dirname, "src/site.tsx"),
      },
      output: {
        format: "umd",
        // entryFileNames: "[name]-[hash].js",
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  server: {
    hmr: false,
  },
});
