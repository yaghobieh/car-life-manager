import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { vehicleCostInsight } from '@clm/shared';
import { CURRENCY_ILS, ZERO } from '@const';
import { ClmPageHead, ClmStatCard } from '@common';
import { useAppState } from '@hooks';
import { ExpensesForm } from './Expenses.form';

export function Expenses() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const { formatCurrency, locale } = useLingoFormat();
  const expenses = dashboard?.expenses ?? [];
  const summary = dashboard?.expenseSummary;
  const insight = summary ? vehicleCostInsight(summary) : null;
  const top = summary?.byCategory[ZERO];
  const topShare = top && summary && summary.yearlyTotal > ZERO
    ? Math.round((top.amount / summary.yearlyTotal) * 100)
    : ZERO;

  return (
    <div className="Bear-Expenses">
      <ClmPageHead title={t('expenses')} subtitle={t('pageSubExpenses')} />
      <div className="Clm-grid">
        <ClmStatCard
          title={t('thisMonth')}
          value={formatCurrency(summary?.currentMonth ?? ZERO, CURRENCY_ILS)}
          note={`${expenses.length} ${t('paymentsCount')}`}
        />
        <ClmStatCard
          title={t('yearToDate')}
          value={formatCurrency(insight?.yearly ?? summary?.yearlyTotal ?? ZERO, CURRENCY_ILS)}
          note={t('basedOnRecorded')}
        />
        <ClmStatCard
          title={t('topCategory')}
          value={top ? t(`expense_${top.category}`) : t('unknown')}
          note={top ? `${topShare}% ${t('ofExpenses')}` : t('notEnoughExpenseBody')}
        />
      </div>
      {expenses.length > ZERO && (
        <table className="Clm-table">
          <thead>
            <tr>
              <th>{t('date')}</th>
              <th>{t('category')}</th>
              <th>{t('description')}</th>
              <th>{t('amount')}</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{new Date(expense.occurredAt).toLocaleDateString(locale)}</td>
                <td>{t(`expense_${expense.category}`)}</td>
                <td>{expense.description ?? expense.merchant ?? t('unknown')}</td>
                <td className="Clm-amount">{formatCurrency(expense.amount, CURRENCY_ILS)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="Clm-form">
        <ExpensesForm />
      </div>
    </div>
  );
}
