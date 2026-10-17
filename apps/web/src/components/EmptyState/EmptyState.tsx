import { Flex, Typography } from '@forgedevstack/bear';
import { COLOR_MUTED, FLEX_GAP_SM, TYPO_SECTION_TITLE } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { EmptyStateProps } from './EmptyState.types';

export function EmptyState(props: EmptyStateProps) {
  const { title, body, id, testId } = props;
  const generatedId = useBearId('EmptyState');
  const domId = resolveBearId(id, generatedId);

  return (
    <Flex
      id={domId}
      data-testid={testId}
      className="Bear-EmptyState"
      direction="column"
      align="center"
      gap={FLEX_GAP_SM}
    >
      <Typography variant={TYPO_SECTION_TITLE}>{title}</Typography>
      <Typography color={COLOR_MUTED}>{body}</Typography>
    </Flex>
  );
}
