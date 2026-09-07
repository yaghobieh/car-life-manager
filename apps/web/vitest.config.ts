import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { aliases } from './vite.aliases';

const styleStub = path.resolve(__dirname, 'src/test/empty-style.ts');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...aliases,
      '@forgedevstack/bear/styles.css': styleStub,
      '@forgedevstack/bear/dist/styles.css': styleStub,
      '@forgedevstack/grid-table/grid-table.css': styleStub,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    server: {
      deps: {
        inline: ['@forgedevstack/bear', '@forgedevstack/bear-icons', '@forgedevstack/grid-table'],
      },
    },
  },
});
