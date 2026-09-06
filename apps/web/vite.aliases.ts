import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export const aliases = {
  '@forgedevstack/bear-icons': path.resolve(root, '../../node_modules/@forgedevstack/bear-icons'),
  '@const': path.resolve(root, 'src/constants'),
  '@hooks': path.resolve(root, 'src/hooks'),
  '@pages': path.resolve(root, 'src/pages'),
  '@components': path.resolve(root, 'src/components'),
  '@store': path.resolve(root, 'src/store'),
  '@locales': path.resolve(root, 'src/locales'),
  '@api': path.resolve(root, 'src/api'),
};
