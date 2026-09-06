import { Button, Card, Flex } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import { CARD_RADIUS_XL, EMPTY_ICON_VEHICLE, FLEX_GAP_LG, ROUTE_VEHICLE, ZERO } from '@const';
import { ClmGridTable } from '@components/ClmGridTable';
import { EmptyState } from '@components/EmptyState';
import { PageHeader } from '@components/PageHeader';
import { useAppState } from '@hooks';
import { asTableRows } from '../table.utils';
import { vehicleColumns } from './Vehicles.utils';

export function Vehicles() {
  const { vehicles, select } = useAppState();
  const t = useTranslate();
  const navigate = useNavigate();

  if (vehicles.length === ZERO) {
    return (
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <PageHeader title={t('vehicles')} subtitle={t('pageSubVehicles')} />
        <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
          <EmptyState title={t('noVehicles')} body={t('noVehiclesBody')} icon={EMPTY_ICON_VEHICLE} />
        </Card>
      </Flex>
    );
  }

  return (
    <Flex className="Bear-Vehicles" direction="column" gap={FLEX_GAP_LG}>
      <PageHeader title={t('vehicles')} subtitle={t('pageSubVehicles')} />
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
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
        <ClmGridTable
          data={asTableRows(vehicles)}
          getRowId={(row) => row.id}
          columns={vehicleColumns(t)}
        />
      </Flex>
    </Card>
    </Flex>
  );
}
