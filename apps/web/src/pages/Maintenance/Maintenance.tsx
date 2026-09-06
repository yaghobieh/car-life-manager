import { useState } from 'react';
import { Input, Select } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import { CURRENCY_ILS, EMPTY_STRING, SVG_EMPTY_MAINTENANCE, ZERO } from '@const';
import { ClmButton, ClmEmpty, ClmList, ClmPageHead, ClmRow } from '@common';
import { useAppState } from '@hooks';
import { MAINTENANCE_TYPES } from './Maintenance.const';

export function Maintenance() {
  const { dashboard, currentId, refresh } = useAppState();
  const t = useTranslate();
  const { formatCurrency } = useLingoFormat();
  const records = dashboard?.maintenance ?? [];
  const [showForm, setShowForm] = useState(records.length > ZERO);
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
    <div className="Bear-Maintenance">
      <ClmPageHead title={t('maintenance')} subtitle={t('pageSubMaintenance')} />
      {records.length === ZERO && !showForm ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_MAINTENANCE}
          title={t('noMaintenanceTitle')}
          body={t('noMaintenanceBody')}
          action={<ClmButton onClick={() => setShowForm(true)}>{t('addRecord')}</ClmButton>}
        />
      ) : (
        <>
          {records.length > ZERO && (
            <ClmList>
              {records.map((record) => (
                <ClmRow
                  key={record.id}
                  iconSrc={SVG_EMPTY_MAINTENANCE}
                  title={t(`maintenance_${record.serviceType}`)}
                  subtitle={[
                    record.serviceDate,
                    record.garage,
                    record.cost !== null ? formatCurrency(record.cost, CURRENCY_ILS) : EMPTY_STRING,
                  ].filter(Boolean).join(' · ')}
                />
              ))}
            </ClmList>
          )}
          <div className="Clm-form">
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
            <ClmButton disabled={busy} onClick={() => void submit()}>{busy ? t('saving') : t('addRecord')}</ClmButton>
          </div>
        </>
      )}
    </div>
  );
}
