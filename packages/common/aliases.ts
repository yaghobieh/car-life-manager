import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packagesRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const common = path.join(packagesRoot, 'common/src');
const sdk = path.join(packagesRoot, 'sdk/src');

/** Internal aliases used inside @tavo/common and @tavo/sdk sources. */
export const tavoPackageAliases: Record<string, string> = {
  '@const': path.join(common, 'constants'),
  '@logger': path.join(common, 'logger'),
  '@locales': path.join(common, 'locales'),
  '@theme': path.join(common, 'theme'),
  '@common': path.join(common, 'common'),
  '@components': path.join(common, 'components'),
  '@api': path.join(sdk, 'api'),
  '@store': path.join(sdk, 'store'),
  '@hooks': path.join(sdk, 'store/hooks'),
  '@connected': path.join(sdk, 'components'),
  '@forgedevstack/bear-icons': path.resolve(packagesRoot, '../node_modules/@forgedevstack/bear-icons/dist/index.cjs'),
};
