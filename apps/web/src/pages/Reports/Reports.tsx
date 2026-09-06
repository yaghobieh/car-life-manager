import { Card, Flex, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { vehicleCostInsight } from '@clm/shared';
import {
  CARD_RADIUS_XL,
  COLOR_MUTED,
  CURRENCY_ILS,
  EMPTY_ICON_REPORT,
  FLEX_GAP_LG,
  FLEX_GAP_SM,
  TYPO_SECTION_TITLE,
  ZERO,
} from '@const';
import { EmptyState } from '@components/EmptyState';
import { PageHeader } from '@components/PageHeader';
import { useAppState } from '@hooks';

export function Reports() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const { formatCurrency } = useLingoFormat();
  const summary = dashboard?.expenseSummary;
  const insight = summary ? vehicleCostInsight(summary) : null;
  const reminders = dashboard?.reminders ?? [];
  const expiring = (dashboard?.documents ?? []).filter((document) => document.expiresAt);
  const timeline = dashboard?.timeline ?? [];
  const empty = !insight?.hasData && reminders.length === ZERO && expiring.length === ZERO;

  if (empty) {
    return (
      <Flex className="Bear-Reports" direction="column" gap={FLEX_GAP_LG}>
        <PageHeader title={t('reports')} subtitle={t('pageSubReports')} />
        <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
          <EmptyState title={t('reports')} body={t('noReports')} icon={EMPTY_ICON_REPORT} />
        </Card>
      </Flex>
    );
  }

  return (
    <Flex className="Bear-Reports" direction="column" gap={FLEX_GAP_LG}>
      <PageHeader title={t('reports')} subtitle={t('pageSubReports')} />
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        {insight?.hasData && (
          <Flex direction="column" gap={FLEX_GAP_SM}>
            <Typography variant={TYPO_SECTION_TITLE}>{t('myCarCosts')}</Typography>
            <Typography weight="extrabold">{formatCurrency(insight.monthly, CURRENCY_ILS)} / {t('thisMonth')}</Typography>
            <Typography>{t('thisYear')}: {formatCurrency(insight.yearly, CURRENCY_ILS)}</Typography>
            <Typography>{t('averageMonth')}: {formatCurrency(insight.averageMonthly, CURRENCY_ILS)}</Typography>
            <Typography color={COLOR_MUTED}>{t('basedOnRecorded')}</Typography>
          </Flex>
        )}
        <Flex direction="column" gap={FLEX_GAP_SM}>
          <Typography variant={TYPO_SECTION_TITLE}>{t('upcomingObligations')}</Typography>
          {reminders.length === ZERO && <Typography color={COLOR_MUTED}>{t('noReminders')}</Typography>}
          {reminders.map((reminder) => (
            <Typography key={reminder.id}>{reminder.title} — {reminder.dueDate}</Typography>
          ))}
        </Flex>
        <Flex direction="column" gap={FLEX_GAP_SM}>
          <Typography variant={TYPO_SECTION_TITLE}>{t('documentsExpiring')}</Typography>
          {expiring.length === ZERO && <Typography color={COLOR_MUTED}>{t('noDocuments')}</Typography>}
          {expiring.map((document) => (
            <Typography key={document.id}>{document.title} — {document.expiresAt}</Typography>
          ))}
        </Flex>
        <Flex direction="column" gap={FLEX_GAP_SM}>
          <Typography variant={TYPO_SECTION_TITLE}>{t('ownershipTimeline')}</Typography>
          {timeline.slice(ZERO, 8).map((event) => (
            <Typography key={event.id}>{t(`timeline_${event.type}`)} — {event.detail ?? event.occurredAt}</Typography>
          ))}
        </Flex>
      </Flex>
    </Card>
    </Flex>
  );
}
