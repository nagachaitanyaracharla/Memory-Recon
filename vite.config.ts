import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  worker: {
    // Export runs in a module worker; Vite's default IIFE format cannot use import.
    format: 'es',
  },
  optimizeDeps: {
    // Prevent esbuild pre-bundle from breaking worker dynamic imports
    exclude: ['@elah/editor', '@elah/core', '@elah/react', '@elah/timeline', 'mediabunny'],
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
})
