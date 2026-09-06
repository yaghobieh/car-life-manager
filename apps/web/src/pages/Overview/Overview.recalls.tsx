import { Badge, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { CARD_RADIUS_XL, COLOR_MUTED, FLEX_GAP_MD, FLEX_GAP_SM, TYPO_SECTION_TITLE, ZERO } from '@const';
import type { OverviewRecallsProps } from './Overview.types';

export function OverviewRecalls(props: OverviewRecallsProps) {
  const { recalls } = props;
  const t = useTranslate();

  return (
    <Card className="Bear-OverviewRecalls" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Flex justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
          <Typography variant={TYPO_SECTION_TITLE}>{t('recalls')}</Typography>
          <Badge variant="success" pill>{t('official')}</Badge>
        </Flex>
        {recalls.length === ZERO && (
          <Typography color={COLOR_MUTED}>{t('noRecalls')}</Typography>
        )}
        {recalls.map((recall) => (
          <Flex key={recall.recallId} direction="column" gap={FLEX_GAP_SM}>
            <Typography weight="bold">{t('recallCampaign')} {recall.recallId}</Typography>
            {recall.faultKind && <Typography>{recall.faultKind}</Typography>}
            {recall.description && <Typography color={COLOR_MUTED}>{recall.description}</Typography>}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
