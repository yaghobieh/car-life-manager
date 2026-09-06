import { Card, Flex } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { GridTable } from '@forgedevstack/grid-table';
import { CARD_RADIUS_XL, FLEX_GAP_LG, ZERO } from '@const';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';
import { asTableRows } from '../table.utils';
import { ExpensesForm } from './Expenses.form';
import { expenseColumns } from './Expenses.utils';

export function Expenses() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const expenses = dashboard?.expenses ?? [];

  return (
    <Card className="Bear-Expenses bear-overflow-x-auto light" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <ExpensesForm />
        {expenses.length === ZERO && <EmptyState title={t('noExpenses')} body={t('noExpensesBody')} />}
        {expenses.length > ZERO && (
          <GridTable
            data={asTableRows(expenses)}
            getRowId={(row) => row.id}
            columns={expenseColumns(t)}
          />
        )}
      </Flex>
    </Card>
  );
}
