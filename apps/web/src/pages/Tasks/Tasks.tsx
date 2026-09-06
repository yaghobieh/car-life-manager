import { Card } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { GridTable } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';
import { asTableRows } from '../table.utils';

export function Tasks() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const tasks = dashboard?.tasks ?? [];
  if (tasks.length === 0) {
    return (
      <Card variant="elevated" padding="lg">
        <EmptyState title={t('noTasks')} body={t('noVehiclesBody')} />
      </Card>
    );
  }
  return (
    <Card className="Bear-Tasks" variant="elevated" padding="lg">
      <GridTable
        data={asTableRows(tasks)}
        getRowId={(row) => row.id}
        columns={[
          { id: 'title', accessor: 'title', header: t('leftover') },
          { id: 'priority', accessor: 'priority', header: t('priority') },
          { id: 'status', accessor: 'status', header: t('status') },
          { id: 'source', accessor: 'source', header: t('source') },
        ]}
      />
    </Card>
  );
}
