import { Card, Flex, Grid, GridItem, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { COLOR_MUTED, FLEX_GAP_SM, GRID_COLS, GRID_GAP, REMINDER_SPAN, VISIBLE_REMINDER_COUNT, ZERO } from '@const';
import type { OverviewRemindersProps } from './Overview.types';
import { formatOverviewDate, visibleReminders } from './Overview.utils';

export function OverviewReminders(props: OverviewRemindersProps) {
  const { reminders } = props;
  const t = useTranslate();
  const { locale } = useLingoFormat();
  const items = visibleReminders(reminders, VISIBLE_REMINDER_COUNT);

  if (items.length === ZERO) {
    return (
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={FLEX_GAP_SM}>
          <Typography variant="h2">{t('upcoming')}</Typography>
          <Typography color={COLOR_MUTED}>{t('remindersOfficial')}</Typography>
          <Typography color={COLOR_MUTED}>{t('noReminders')}</Typography>
        </Flex>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="lg">
      <Flex direction="column" gap={FLEX_GAP_SM}>
        <Typography variant="h2">{t('upcoming')}</Typography>
        <Typography color={COLOR_MUTED}>{t('remindersOfficial')}</Typography>
      </Flex>
      <Grid cols={GRID_COLS} gap={GRID_GAP}>
        {items.map((item) => (
          <GridItem key={item.id} colSpan={REMINDER_SPAN}>
            <Typography weight="bold">{item.title}</Typography>
            <Typography color={COLOR_MUTED}>{formatOverviewDate(item.dueDate, locale, t('unknown'))}</Typography>
          </GridItem>
        ))}
      </Grid>
    </Card>
  );
}
