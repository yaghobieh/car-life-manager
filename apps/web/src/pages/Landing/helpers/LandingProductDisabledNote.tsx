import { Badge, Button, Flex } from '@forgedevstack/bear';
import { BOOLEAN_TRUE, FLEX_GAP_SM } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { LandingProductDisabledNoteProps } from '../Landing.types';

export function LandingProductDisabledNote(props: LandingProductDisabledNoteProps) {
  const { id, testId, label, note } = props;
  const generatedId = useBearId('LandingProductDisabledNote');
  const domId = resolveBearId(id, generatedId);

  return (
    <Flex id={domId} data-testid={testId} direction="column" gap={FLEX_GAP_SM}>
      <Badge variant="neutral" pill>{note}</Badge>
      <Button variant="primary" disabled={BOOLEAN_TRUE}>{label}</Button>
    </Flex>
  );
}
