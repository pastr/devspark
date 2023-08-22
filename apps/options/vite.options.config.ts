import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../../dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        options: new URL("./options.html", import.meta.url).pathname
      }
    }
  }
});
