import { Flex, Typography } from '@forgedevstack/bear';
import { COLOR_MUTED, FLEX_GAP_SM, SVG_EMPTY_SIZE, TYPO_SECTION_TITLE } from '@const';
import { SvgAsset } from '@components/SvgAsset';
import { resolveBearId, useBearId } from '@hooks';
import { EMPTY_ICON_SRC } from './EmptyState.const';
import type { EmptyStateProps } from './EmptyState.types';

export function EmptyState(props: EmptyStateProps) {
  const { title, body, icon, action, id, testId } = props;
  const generatedId = useBearId('EmptyState');
  const domId = resolveBearId(id, generatedId);
  const src = icon ? EMPTY_ICON_SRC[icon] : undefined;

  return (
    <Flex
      id={domId}
      data-testid={testId}
      className="Bear-EmptyState"
      direction="column"
      align="center"
      gap={FLEX_GAP_SM}
    >
      {src ? <SvgAsset src={src} alt={title} width={SVG_EMPTY_SIZE} height={SVG_EMPTY_SIZE} /> : null}
      <Typography variant={TYPO_SECTION_TITLE}>{title}</Typography>
      <Typography color={COLOR_MUTED}>{body}</Typography>
      {action}
    </Flex>
  );
}
