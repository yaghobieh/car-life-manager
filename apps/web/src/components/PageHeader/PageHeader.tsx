import { Flex, Typography } from '@forgedevstack/bear';
import { COLOR_MUTED, FLEX_GAP_SM, TYPO_PAGE_TITLE } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { PageHeaderProps } from './PageHeader.types';

export function PageHeader(props: PageHeaderProps) {
  const { title, subtitle, id, testId } = props;
  const generatedId = useBearId('PageHeader');
  const domId = resolveBearId(id, generatedId);

  return (
    <Flex
      id={domId}
      data-testid={testId}
      className="Bear-PageHeader"
      direction="column"
      gap={FLEX_GAP_SM}
    >
      <Typography variant={TYPO_PAGE_TITLE}>{title}</Typography>
      {subtitle ? <Typography color={COLOR_MUTED}>{subtitle}</Typography> : null}
    </Flex>
  );
}
