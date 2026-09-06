import { Card } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { GridTable } from '@forgedevstack/grid-table';
import { ZERO } from '@const';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';
import { asTableRows } from '../table.utils';
import { vehicleColumns } from './Vehicles.utils';

export function Vehicles() {
  const { vehicles } = useAppState();
  const t = useTranslate();

  if (vehicles.length === ZERO) {
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
        columns={vehicleColumns(t)}
      />
    </Card>
  );
}
