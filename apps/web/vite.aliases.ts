import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tavoPackageAliases } from '../../packages/common/aliases';

const root = path.dirname(fileURLToPath(import.meta.url));

export const aliases = {
  ...tavoPackageAliases,
  '@forgedevstack/bear-icons': path.resolve(root, '../../node_modules/@forgedevstack/bear-icons'),
  '@pages': path.resolve(root, 'src/pages'),
  '@routes': path.resolve(root, 'src/Route.utils.ts'),
};
