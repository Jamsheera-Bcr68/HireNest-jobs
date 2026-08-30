import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["narrative-bottle-promised-harvest.trycloudflare.com"],
    proxy: {
      '/api': {
        target: 'http://localhost:7000',
        changeOrigin: true,
        secure: false, // Set to false if using self-signed SSL certificates
        rewrite: (path) => path.replace(/^\/api/, ''), // Strips '/api' from the request
      },
    },
  }
});
