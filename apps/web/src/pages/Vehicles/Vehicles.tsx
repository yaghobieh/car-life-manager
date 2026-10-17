import { Button, Card, Flex } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { GridTable } from '@forgedevstack/grid-table';
import { useNavigate } from 'react-router-dom';
import { CARD_RADIUS_XL, FLEX_GAP_LG, ROUTE_VEHICLE, ZERO } from '@const';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';
import { asTableRows } from '../table.utils';
import { vehicleColumns } from './Vehicles.utils';

export function Vehicles() {
  const { vehicles, select } = useAppState();
  const t = useTranslate();
  const navigate = useNavigate();

  if (vehicles.length === ZERO) {
    return (
      <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <EmptyState title={t('noVehicles')} body={t('noVehiclesBody')} />
      </Card>
    );
  }

  return (
    <Card className="Bear-Vehicles bear-overflow-x-auto light" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Button
          variant="primary"
          onClick={() => {
            if (vehicles[ZERO]) void select(vehicles[ZERO].id);
            navigate(ROUTE_VEHICLE);
          }}
        >
          {t('viewVehicle')}
        </Button>
        <GridTable
          data={asTableRows(vehicles)}
          getRowId={(row) => row.id}
          columns={vehicleColumns(t)}
        />
      </Flex>
    </Card>
  );
}
