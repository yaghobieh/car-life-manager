import { Box } from '@forgedevstack/bear';
import { resolveBearId, useBearId } from '@hooks';
import { ClmButton } from '@common';
import type { PlatformProductOpenButtonProps } from '../Platform.types';

export function PlatformProductOpenButton(props: PlatformProductOpenButtonProps) {
  const { id, testId, label, to, onOpen } = props;
  const generatedId = useBearId('PlatformProductOpenButton');
  const domId = resolveBearId(id, generatedId);

  return (
    <Box id={domId} data-testid={testId}>
      <ClmButton onClick={() => onOpen(to)}>{label}</ClmButton>
    </Box>
  );
}
