import { Badge, Flex, Typography } from '@forgedevstack/bear';
import { BOOLEAN_TRUE, FLEX_GAP_SM } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import { ClmButton } from '@common';
import type { PlatformProductDisabledNoteProps } from '../Platform.types';

export function PlatformProductDisabledNote(props: PlatformProductDisabledNoteProps) {
  const { id, testId, label, note } = props;
  const generatedId = useBearId('PlatformProductDisabledNote');
  const domId = resolveBearId(id, generatedId);

  return (
    <Flex id={domId} data-testid={testId} direction="column" gap={FLEX_GAP_SM}>
      <Badge variant="neutral" pill>{note}</Badge>
      <ClmButton disabled={BOOLEAN_TRUE}>{label}</ClmButton>
    </Flex>
  );
}
