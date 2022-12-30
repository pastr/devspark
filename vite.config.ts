import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: new URL('./popup/popup.html', import.meta.url).pathname,
        background: new URL('./background/background.html', import.meta.url).pathname,
        options: new URL('./options/options.html', import.meta.url).pathname,
      },
    }
  }
})