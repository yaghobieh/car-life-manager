import { Flex, Typography } from '@forgedevstack/bear';
import { COLOR_MUTED, FLEX_GAP_SM, TYPO_SECTION_TITLE } from '@const';
import type { EmptyStateProps } from './EmptyState.types';

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <Flex className="Bear-EmptyState" direction="column" align="center" gap={FLEX_GAP_SM}>
      <Typography variant={TYPO_SECTION_TITLE}>{title}</Typography>
      <Typography color={COLOR_MUTED}>{body}</Typography>
    </Flex>
  );
}
