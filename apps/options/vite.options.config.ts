import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
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
