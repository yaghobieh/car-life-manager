import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { aliases } from './vite.aliases';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: aliases },
  server: {
    host: '127.0.0.1',
    port: 5188,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4173',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://127.0.0.1:4173',
        changeOrigin: true,
      },
    },
  },
});
