import { fileURLToPath, URL } from "node:url"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [vue(), vueJsx()],
  root: './',
  publicDir: 'public',
  assetsInclude: '',
  clearScreen: true,
  base: '/copy-emojis',
  build: {
    outDir: './docs',
    emptyOutDir: true,
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    sourcemap: true,
    manifest: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 500
  }
})
