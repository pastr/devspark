import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  define: {
    "process.env": {}
  },
  build: {
    target: "esnext",
    emptyOutDir: false, // was true
    outDir: resolve(__dirname, "../../dist"),
    lib: {
      formats: ["iife"],
      entry: resolve(__dirname, "./content.main.tsx"),
      name: "devspark"
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.global.js",
        extend: true
      }
    }
  }
});
