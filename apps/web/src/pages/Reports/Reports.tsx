import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { vehicleCostInsight } from '@clm/shared';
import { CURRENCY_ILS, SVG_EMPTY_REPORT, ZERO } from '@const';
import { ClmEmpty, ClmList, ClmPageHead, ClmRow, ClmSectionTitle, ClmStatCard } from '@common';
import { useAppState } from '@hooks';

export function Reports() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const { formatCurrency } = useLingoFormat();
  const summary = dashboard?.expenseSummary;
  const insight = summary ? vehicleCostInsight(summary) : null;
  const reminders = dashboard?.reminders ?? [];
  const expiring = (dashboard?.documents ?? []).filter((document) => document.expiresAt);
  const empty = !insight?.hasData && reminders.length === ZERO && expiring.length === ZERO;

  return (
    <div className="Bear-Reports">
      <ClmPageHead title={t('reports')} subtitle={t('pageSubReports')} />
      {empty ? (
        <ClmEmpty iconSrc={SVG_EMPTY_REPORT} title={t('noReportsTitle')} body={t('noReports')} />
      ) : (
        <>
          {insight?.hasData && (
            <div className="Clm-grid">
              <ClmStatCard title={t('thisMonth')} value={formatCurrency(insight.monthly, CURRENCY_ILS)} note={t('basedOnRecorded')} />
              <ClmStatCard title={t('yearToDate')} value={formatCurrency(insight.yearly, CURRENCY_ILS)} note={t('averageMonth')} />
            </div>
          )}
          <ClmSectionTitle title={t('upcomingObligations')} />
          <ClmList>
            {reminders.map((reminder) => (
              <ClmRow key={reminder.id} title={reminder.title} subtitle={reminder.dueDate} />
            ))}
          </ClmList>
          <ClmSectionTitle title={t('documentsExpiring')} />
          <ClmList>
            {expiring.map((document) => (
              <ClmRow key={document.id} title={document.title} subtitle={document.expiresAt ?? undefined} />
            ))}
          </ClmList>
        </>
      )}
    </div>
  );
}
