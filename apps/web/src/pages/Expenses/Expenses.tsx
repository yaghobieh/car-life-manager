import { Card, Flex, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { vehicleCostInsight } from '@clm/shared';
import { CARD_RADIUS_XL, COLOR_MUTED, CURRENCY_ILS, FLEX_GAP_LG, FLEX_GAP_SM, TYPO_SECTION_TITLE, ZERO } from '@const';
import { ClmGridTable } from '@components/ClmGridTable';
import { EmptyState } from '@components/EmptyState';
import { PageHeader } from '@components/PageHeader';
import { useAppState } from '@hooks';
import { asTableRows } from '../table.utils';
import { ExpensesForm } from './Expenses.form';
import { expenseColumns } from './Expenses.utils';

export function Expenses() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const { formatCurrency } = useLingoFormat();
  const expenses = dashboard?.expenses ?? [];
  const insight = dashboard?.expenseSummary ? vehicleCostInsight(dashboard.expenseSummary) : null;

  return (
    <Flex className="Bear-Expenses" direction="column" gap={FLEX_GAP_LG}>
      <PageHeader title={t('expenses')} subtitle={t('pageSubExpenses')} />
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        {insight?.hasData ? (
          <Flex direction="column" gap={FLEX_GAP_SM}>
            <Typography variant={TYPO_SECTION_TITLE}>{t('myCarCosts')}</Typography>
            <Typography weight="extrabold">{formatCurrency(insight.monthly, CURRENCY_ILS)}</Typography>
            <Typography>{t('thisMonth')}: {formatCurrency(insight.monthly, CURRENCY_ILS)}</Typography>
            <Typography>{t('thisYear')}: {formatCurrency(insight.yearly, CURRENCY_ILS)}</Typography>
            <Typography>{t('averageMonth')}: {formatCurrency(insight.averageMonthly, CURRENCY_ILS)}</Typography>
            <Typography color={COLOR_MUTED}>{t('basedOnRecorded')}</Typography>
          </Flex>
        ) : (
          <EmptyState title={t('notEnoughExpenseData')} body={t('notEnoughExpenseBody')} />
        )}
        <ExpensesForm />
        {expenses.length === ZERO && <EmptyState title={t('noExpenses')} body={t('noExpensesBody')} />}
        {expenses.length > ZERO && (
          <ClmGridTable
            data={asTableRows(expenses)}
            getRowId={(row) => row.id}
            columns={expenseColumns(t)}
          />
        )}
      </Flex>
    </Card>
    </Flex>
  );
}
