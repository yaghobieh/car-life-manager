import { readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { aliases } from './vite.aliases';

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf8')) as { version: string };
const buildSha = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.VITE_BUILD_SHA ?? 'local';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: aliases },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
    'import.meta.env.VITE_BUILD_SHA': JSON.stringify(buildSha),
  },
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
