import { useState } from 'react';
import { Button, Card, Flex, Input, Select, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import {
  CARD_RADIUS_XL,
  COLOR_MUTED,
  CURRENCY_ILS,
  EMPTY_STRING,
  FLEX_GAP_LG,
  FLEX_GAP_SM,
  ZERO,
} from '@const';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';
import { MAINTENANCE_TYPES } from './Maintenance.const';

export function Maintenance() {
  const { dashboard, currentId, refresh } = useAppState();
  const t = useTranslate();
  const { formatCurrency } = useLingoFormat();
  const records = dashboard?.maintenance ?? [];
  const [serviceType, setServiceType] = useState<string>(MAINTENANCE_TYPES[ZERO]);
  const [serviceDate, setServiceDate] = useState(EMPTY_STRING);
  const [mileage, setMileage] = useState(EMPTY_STRING);
  const [garage, setGarage] = useState(EMPTY_STRING);
  const [cost, setCost] = useState(EMPTY_STRING);
  const [notes, setNotes] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!currentId) return;
    setBusy(true);
    try {
      await api.addMaintenance(currentId, {
        serviceDate,
        serviceType,
        mileage: mileage ? Number(mileage) : null,
        garage: garage || null,
        cost: cost ? Number(cost) : null,
        notes: notes || null,
      });
      setServiceDate(EMPTY_STRING);
      setMileage(EMPTY_STRING);
      setGarage(EMPTY_STRING);
      setCost(EMPTY_STRING);
      setNotes(EMPTY_STRING);
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="Bear-Maintenance" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Select
          label={t('serviceType')}
          value={serviceType}
          onChange={setServiceType}
          fullWidth
          options={MAINTENANCE_TYPES.map((value) => ({ value, label: t(`maintenance_${value}`) }))}
        />
        <Input label={t('date')} type="date" value={serviceDate} onChange={(event) => setServiceDate(event.target.value)} fullWidth />
        <Input label={t('mileage')} value={mileage} onChange={(event) => setMileage(event.target.value)} fullWidth />
        <Input label={t('garage')} value={garage} onChange={(event) => setGarage(event.target.value)} fullWidth />
        <Input label={t('cost')} value={cost} onChange={(event) => setCost(event.target.value)} fullWidth />
        <Input label={t('notes')} value={notes} onChange={(event) => setNotes(event.target.value)} fullWidth />
        <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void submit()}>
          {t('addMaintenance')}
        </Button>
        {records.length === ZERO && <EmptyState title={t('maintenance')} body={t('noMaintenance')} />}
        {records.map((record) => (
          <Flex key={record.id} direction="column" gap={FLEX_GAP_SM}>
            <Typography weight="bold">{t(`maintenance_${record.serviceType}`)}</Typography>
            <Typography color={COLOR_MUTED}>{record.serviceDate}</Typography>
            {record.mileage !== null && <Typography color={COLOR_MUTED}>{record.mileage}</Typography>}
            {record.garage && <Typography color={COLOR_MUTED}>{record.garage}</Typography>}
            {record.cost !== null && <Typography>{formatCurrency(record.cost, CURRENCY_ILS)}</Typography>}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
