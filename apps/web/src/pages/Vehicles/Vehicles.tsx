import { Card } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { GridTable } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';
import { asTableRows } from '../table.utils';

export function Vehicles() {
  const { vehicles } = useAppState();
  const t = useTranslate();
  if (vehicles.length === 0) {
    return (
      <Card variant="elevated" padding="lg">
        <EmptyState title={t('noVehicles')} body={t('noVehiclesBody')} />
      </Card>
    );
  }
  return (
    <Card className="Bear-Vehicles" variant="elevated" padding="lg">
      <GridTable
        data={asTableRows(vehicles)}
        getRowId={(row) => row.id}
        columns={[
          { id: 'plate', accessor: 'formattedRegistrationNumber', header: t('plate') },
          { id: 'make', accessor: 'make', header: t('make') },
          { id: 'model', accessor: 'model', header: t('model') },
          { id: 'year', accessor: 'modelYear', header: t('year') },
          { id: 'source', accessor: 'dataSource', header: t('source') },
        ]}
      />
    </Card>
  );
}
