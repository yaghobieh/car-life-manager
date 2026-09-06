import { useState } from 'react';
import { Button, Card, Flex, Grid, Input, Select, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import type { Vehicle } from '@clm/shared';
import { api } from '@api';
import {
  CARD_RADIUS_XL,
  COLOR_MUTED,
  COMPARE_COLS,
  EMPTY_STRING,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  TYPO_SECTION_TITLE,
} from '@const';
import { useAppState } from '@hooks';
import { COMPARE_FIELD_KEYS } from './Overview.const';
import type { OverviewCompareProps } from './Overview.types';
import { compareFieldValue, compareVehicleLabel } from './Overview.utils';

export function OverviewCompare(props: OverviewCompareProps) {
  const { currentId } = props;
  const { vehicles, dashboard } = useAppState();
  const t = useTranslate();
  const { locale } = useLingoFormat();
  const [otherId, setOtherId] = useState(EMPTY_STRING);
  const [plate, setPlate] = useState(EMPTY_STRING);
  const [lookedUp, setLookedUp] = useState<Vehicle | null>(null);
  const [busy, setBusy] = useState(false);
  const current = dashboard?.vehicle;
  const unknown = t('unknown');
  const others = vehicles.filter((vehicle) => vehicle.id !== currentId);
  const selected = others.find((vehicle) => vehicle.id === otherId) ?? lookedUp;

  async function lookupOther() {
    setBusy(true);
    try {
      const result = await api.lookup(plate);
      setLookedUp({
        ...result.vehicle,
        id: result.vehicle.registrationNumber,
        userId: currentId,
        createdAt: result.vehicle.dataSourceUpdatedAt,
        updatedAt: result.vehicle.dataSourceUpdatedAt,
      });
      setOtherId(EMPTY_STRING);
    } catch {
      setLookedUp(null);
    } finally {
      setBusy(false);
    }
  }

  if (!current) return null;

  return (
    <Card className="Bear-Overview__compare" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Typography variant={TYPO_SECTION_TITLE}>{t('compareWith')}</Typography>
        <Typography color={COLOR_MUTED}>{t('compareHint')}</Typography>
        {others.length > 0 && (
          <Select
            aria-label={t('compareWith')}
            value={otherId}
            onChange={(value) => {
              setOtherId(value);
              setLookedUp(null);
            }}
            options={others.map((vehicle) => ({
              value: vehicle.id,
              label: compareVehicleLabel(vehicle, unknown),
            }))}
            placeholder={t('selectVehicle')}
            displayEmpty
          />
        )}
        <Flex gap={FLEX_GAP_SM} wrap="wrap" align="end">
          <Input
            label={t('lookupCompare')}
            value={plate}
            onChange={(event) => setPlate(event.target.value)}
          />
          <Button variant="secondary" loading={busy} loadingText={t('checking')} onClick={() => void lookupOther()}>
            {t('compare')}
          </Button>
        </Flex>
        {!selected && <Typography color={COLOR_MUTED}>{t('compareNeedAnother')}</Typography>}
        {selected && (
          <Flex direction="column" gap={FLEX_GAP_SM}>
            <Grid cols={COMPARE_COLS} gap={FLEX_GAP_SM}>
              <Typography color={COLOR_MUTED}>{t('compare')}</Typography>
              <Typography weight="bold">{current.formattedRegistrationNumber}</Typography>
              <Typography weight="bold">{selected.formattedRegistrationNumber}</Typography>
            </Grid>
            {COMPARE_FIELD_KEYS.map((field) => (
              <Grid key={field} cols={COMPARE_COLS} gap={FLEX_GAP_SM}>
                <Typography color={COLOR_MUTED}>{t(field)}</Typography>
                <Typography>{compareFieldValue(field, current, locale, unknown)}</Typography>
                <Typography>{compareFieldValue(field, selected, locale, unknown)}</Typography>
              </Grid>
            ))}
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
