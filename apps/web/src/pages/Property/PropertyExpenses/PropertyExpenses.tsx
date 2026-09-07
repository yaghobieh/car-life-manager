import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { CURRENCY_ILS, SVG_EMPTY_PROPERTY, ZERO } from '@const';
import { ClmGridTable } from '@components';
import { ClmEmpty, ClmPageHead, ClmStatCard } from '@common';
import { usePropertyState } from '@hooks';
import { propertyExpenseColumns, propertyExpenseRows } from './PropertyExpenses.utils';
import {
  currentMonthKey,
  currentYearKey,
  monthExpenseTotal,
  topExpenseCategory,
  yearExpenseTotal,
} from '../Property.utils';
import { PropertyExpensesForm } from './PropertyExpenses.form';

export function PropertyExpenses() {
  const t = useTranslate();
  const { formatCurrency, locale } = useLingoFormat();
  const { expenses } = usePropertyState();
  const monthTotal = monthExpenseTotal(expenses, currentMonthKey());
  const yearTotal = yearExpenseTotal(expenses, currentYearKey());
  const top = topExpenseCategory(expenses);

  return (
    <div className="Bear-PropertyExpenses">
      <ClmPageHead title={t('propertyExpenses')} subtitle={t('pageSubPropertyExpenses')} />
      <div className="Clm-grid">
        <ClmStatCard
          title={t('thisMonth')}
          value={formatCurrency(monthTotal, CURRENCY_ILS)}
          note={`${expenses.length} ${t('paymentsCount')}`}
        />
        <ClmStatCard
          title={t('yearToDate')}
          value={formatCurrency(yearTotal, CURRENCY_ILS)}
          note={t('basedOnRecorded')}
        />
        <ClmStatCard
          title={t('topCategory')}
          value={top ? t(`propertyExpense_${top}`) : t('unknown')}
          note={t('basedOnRecorded')}
        />
      </div>
      {expenses.length === ZERO ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_PROPERTY}
          title={t('noExpenses')}
          body={t('propertyExpensesEmptyBody')}
        />
      ) : (
        <ClmGridTable
          columns={propertyExpenseColumns(t)}
          data={propertyExpenseRows(expenses, t, formatCurrency, locale)}
        />
      )}
      <PropertyExpensesForm />
    </div>
  );
}
