import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
export default defineConfig({
  root: './frontend',
  plugins: [
      react(),
      tailwindcss(),
  ],
  server: {
    proxy: {
      '/products': 'http://localhost:5000',
    }
  }
})
