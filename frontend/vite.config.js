import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend server URL
        changeOrigin: true,  // This can be set to `true` to modify the origin of the request
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the path
      },
    },
  }
})
