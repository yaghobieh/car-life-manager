import { useState } from 'react';
import { Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { sourceFromProvenance } from '@clm/shared';
import { CARD_RADIUS_XL, COLOR_MUTED, FLEX_GAP_LG, FLEX_GAP_SM, SPACE, TYPO_PAGE_TITLE, ZERO } from '@const';
import { SourceBadge } from '@components/SourceBadge';
import { useAppState } from '@hooks';
import { VEHICLE_TABS } from './VehicleFile.const';
import type { VehicleTabId } from './VehicleFile.types';
import { VehicleFileEmpty } from './helpers/VehicleFileEmpty';
import { VehicleFilePanel } from './helpers/VehicleFilePanel';

export function VehicleFile() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const [tab, setTab] = useState<VehicleTabId>(VEHICLE_TABS[ZERO].id);
  const vehicle = dashboard?.vehicle;

  if (!dashboard || !vehicle) {
    return <VehicleFileEmpty title={t('noVehicles')} body={t('noVehiclesBody')} />;
  }

  return (
    <Card className="Bear-VehicleFile" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Typography variant={TYPO_PAGE_TITLE}>
          {[vehicle.make, vehicle.model].filter(Boolean).join(SPACE) || t('unknown')}
        </Typography>
        <Typography color={COLOR_MUTED}>{vehicle.formattedRegistrationNumber}</Typography>
        <SourceBadge source={sourceFromProvenance(vehicle.dataProvenance)} updatedAt={vehicle.dataSourceUpdatedAt} />
        <Flex gap={FLEX_GAP_SM} wrap="wrap">
          {VEHICLE_TABS.map((item) => (
            <Button
              key={item.id}
              variant={tab === item.id ? 'primary' : 'ghost'}
              compact
              onClick={() => setTab(item.id)}
            >
              {t(item.labelKey)}
            </Button>
          ))}
        </Flex>
        <VehicleFilePanel
          tab={tab}
          emptyTitle={t('vehicleTimeline')}
          emptyBody={t('noTimeline')}
          input={{
            dashboard,
            unknownLabel: t('unknown'),
            intro: t('dashboardIntro'),
            yearLabel: t('year'),
            colorLabel: t('color'),
            handLabel: t('hand'),
            licenseLabel: t('licenseExpiry'),
            testLabel: t('test'),
            timelineTitle: (type) => t(`timeline_${type}`),
          }}
        />
      </Flex>
    </Card>
  );
}
