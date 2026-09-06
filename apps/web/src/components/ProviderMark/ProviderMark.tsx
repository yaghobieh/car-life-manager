import { Box } from '@forgedevstack/bear';
import { PROVIDER_MARK_SIZE } from '@const';
import { PROVIDER_MARK_SRC } from './ProviderMark.const';
import type { ProviderMarkProps } from './ProviderMark.types';

export function ProviderMark({ providerId, name }: ProviderMarkProps) {
  const src = PROVIDER_MARK_SRC[providerId];
  if (!src) return null;

  return (
    <Box
      className="Bear-ProviderMark"
      rounded="md"
      aria-hidden="true"
      style={{ width: PROVIDER_MARK_SIZE, height: PROVIDER_MARK_SIZE, overflow: 'hidden' }}
    >
      <img src={src} alt={name} className="bear-w-full bear-h-full" />
    </Box>
  );
}
