import { Card } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { GridTable } from '@forgedevstack/grid-table';
import { ZERO } from '@const';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';
import { asTableRows } from '../table.utils';
import { taskColumns } from './Tasks.utils';

export function Tasks() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const tasks = dashboard?.tasks ?? [];

  if (tasks.length === ZERO) {
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
        columns={taskColumns(t)}
      />
    </Card>
  );
}
