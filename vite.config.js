import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Dropp-Web/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://63ztvgg2-8000.inc1.devtunnels.ms',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
