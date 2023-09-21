import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [Vue()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(
      new URL("../src/main/resources/static", import.meta.url)
    ),
    minify: true,
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["iife"],
      name: "SponsorCard",
      fileName: (format) => `post-sponsor-card.${format}.js`,
    },
    sourcemap: false,
  },
  server: {
    port: 4000,
    proxy: {
      "/actuator": {
        target: "http://localhost:8090",
        changeOrigin: true,
      },
    },
  },
});
