import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, "../../dist"),
    lib: {
      formats: ["iife"],
      entry: resolve(__dirname, "./background.main.ts"),
      name: "devspark"
    },
    rollupOptions: {
      output: {
        entryFileNames: "background.global.js",
        extend: true
      }
    }
  }
});
