import { Badge, Flex } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { FLEX_GAP_SM } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import { SOURCE_LABEL_KEYS } from './SourceBadge.const';
import type { SourceBadgeProps } from './SourceBadge.types';
import { SourceBadgeUpdated } from './helpers/SourceBadgeUpdated';

export function SourceBadge(props: SourceBadgeProps) {
  const { source, updatedAt, id, testId } = props;
  const t = useTranslate();
  const { formatDate } = useLingoFormat();
  const generatedId = useBearId('SourceBadge');
  const domId = resolveBearId(id, generatedId);
  const labelKey = SOURCE_LABEL_KEYS[source] ?? SOURCE_LABEL_KEYS.unknown;

  return (
    <Flex
      id={domId}
      data-testid={testId}
      className="Bear-SourceBadge"
      align="center"
      gap={FLEX_GAP_SM}
      wrap="wrap"
    >
      <Badge variant="neutral" pill>
        {t(labelKey)}
      </Badge>
      <SourceBadgeUpdated updatedAt={updatedAt} label={t('lastUpdated')} formatDate={formatDate} />
    </Flex>
  );
}
