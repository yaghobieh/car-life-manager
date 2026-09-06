import { Card } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { GridTable } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';
import { asTableRows } from '../table.utils';

export function Expenses() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const expenses = dashboard?.expenses ?? [];
  if (expenses.length === 0) {
    return (
      <Card variant="elevated" padding="lg">
        <EmptyState title={t('noExpenses')} body={t('noExpensesBody')} />
      </Card>
    );
  }
  return (
    <Card className="Bear-Expenses" variant="elevated" padding="lg">
      <GridTable
        data={asTableRows(expenses)}
        getRowId={(row) => row.id}
        columns={[
          { id: 'category', accessor: 'category', header: t('category') },
          { id: 'amount', accessor: 'amount', header: t('amount') },
          { id: 'occurredAt', accessor: 'occurredAt', header: t('date') },
        ]}
      />
    </Card>
  );
}
