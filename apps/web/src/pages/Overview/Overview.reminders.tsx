import { Box, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import {
  CARD_RADIUS_XL,
  COLOR_BLUE,
  COLOR_MUTED,
  COLOR_TILE,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  ROUTE_REMINDERS,
  TYPO_SECTION_TITLE,
  VISIBLE_REMINDER_COUNT,
  ZERO,
} from '@const';
import type { OverviewRemindersProps } from './Overview.types';
import { formatOverviewDate, visibleReminders } from './Overview.utils';

export function OverviewReminders(props: OverviewRemindersProps) {
  const { reminders } = props;
  const navigate = useNavigate();
  const t = useTranslate();
  const { locale } = useLingoFormat();
  const items = visibleReminders(reminders, VISIBLE_REMINDER_COUNT);

  if (items.length === ZERO) {
    return (
      <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <Flex direction="column" gap={FLEX_GAP_SM}>
          <Typography variant={TYPO_SECTION_TITLE}>{t('upcoming')}</Typography>
          <Typography color={COLOR_MUTED}>{t('remindersOfficial')}</Typography>
          <Typography color={COLOR_MUTED}>{t('noReminders')}</Typography>
          <Button variant="ghost" compact disableElevation onClick={() => navigate(ROUTE_REMINDERS)}>
            <Typography color={COLOR_BLUE}>{t('viewAll')}</Typography>
          </Button>
        </Flex>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Flex justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
          <Typography variant={TYPO_SECTION_TITLE}>{t('upcoming')}</Typography>
          <Typography color={COLOR_MUTED}>{t('remindersOfficial')}</Typography>
        </Flex>
        <Flex gap={FLEX_GAP_SM} wrap="wrap">
          {items.map((item) => (
            <Box key={item.id} bg={COLOR_TILE} p={3} rounded="lg" className="bear-flex-1">
              <Typography weight="bold">{item.title}</Typography>
              <Typography color={COLOR_MUTED}>{formatOverviewDate(item.dueDate, locale, t('unknown'))}</Typography>
            </Box>
          ))}
        </Flex>
        <Button variant="ghost" compact disableElevation onClick={() => navigate(ROUTE_REMINDERS)}>
          <Typography color={COLOR_BLUE}>{t('viewAll')}</Typography>
        </Button>
      </Flex>
    </Card>
  );
}
