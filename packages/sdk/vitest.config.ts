import { defineConfig } from 'vite';
import { tavoPackageAliases } from '../common/aliases';

export default defineConfig({
  resolve: { alias: tavoPackageAliases },
  test: {
    environment: 'jsdom',
    server: {
      deps: {
        inline: [/@forgedevstack\//],
      },
    },
  },
} as Parameters<typeof defineConfig>[0]);
