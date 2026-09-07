import { useState } from 'react';
import { Button, Flex, Input, Select } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { HomeDealType } from '@clm/shared';
import {
  BOOLEAN_FALSE,
  DEAL_OWNED,
  EMPTY_STRING,
  FLEX_GAP_MD,
  LISTED_BROKER,
  LISTED_PRIVATE,
} from '@const';
import { usePropertyState } from '@hooks';
import { HOME_DEAL_OPTIONS } from '../Property.const';
import { mergeHomeFeatures, parseCsvList } from '../Property.utils';

export function PropertyHomeForm() {
  const t = useTranslate();
  const { addHome } = usePropertyState();
  const [dealType, setDealType] = useState<string>(DEAL_OWNED);
  const [city, setCity] = useState(EMPTY_STRING);
  const [street, setStreet] = useState(EMPTY_STRING);
  const [houseNumber, setHouseNumber] = useState(EMPTY_STRING);
  const [neighborhood, setNeighborhood] = useState(EMPTY_STRING);
  const [rooms, setRooms] = useState(EMPTY_STRING);
  const [sqm, setSqm] = useState(EMPTY_STRING);
  const [floor, setFloor] = useState(EMPTY_STRING);
  const [price, setPrice] = useState(EMPTY_STRING);
  const [listedBy, setListedBy] = useState(LISTED_PRIVATE);
  const [elevator, setElevator] = useState(BOOLEAN_FALSE);
  const [aircon, setAircon] = useState(BOOLEAN_FALSE);
  const [features, setFeatures] = useState(EMPTY_STRING);
  const [imageUrls, setImageUrls] = useState(EMPTY_STRING);
  const [model3dUrl, setModel3dUrl] = useState(EMPTY_STRING);
  const [nextDueDate, setNextDueDate] = useState(EMPTY_STRING);
  const [nextDueTitle, setNextDueTitle] = useState(EMPTY_STRING);
  const [notes, setNotes] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(EMPTY_STRING);

  async function submit() {
    if (!city.trim()) {
      setError(t('homeCityRequired'));
      return;
    }
    setBusy(true);
    setError(EMPTY_STRING);
    try {
      await addHome({
        dealType: dealType as HomeDealType,
        city,
        street: street || null,
        houseNumber: houseNumber || null,
        neighborhood: neighborhood || null,
        rooms: rooms ? Number(rooms) : null,
        sqm: sqm ? Number(sqm) : null,
        floor: floor ? Number(floor) : null,
        price: price ? Number(price) : null,
        features: mergeHomeFeatures(parseCsvList(features), listedBy, elevator, aircon),
        imageUrls: parseCsvList(imageUrls),
        model3dUrl: model3dUrl || null,
        nextDueDate: nextDueDate || null,
        nextDueTitle: nextDueTitle || null,
        notes: notes || null,
      });
      setStreet(EMPTY_STRING);
      setHouseNumber(EMPTY_STRING);
      setNeighborhood(EMPTY_STRING);
      setRooms(EMPTY_STRING);
      setSqm(EMPTY_STRING);
      setFloor(EMPTY_STRING);
      setPrice(EMPTY_STRING);
      setListedBy(LISTED_PRIVATE);
      setElevator(BOOLEAN_FALSE);
      setAircon(BOOLEAN_FALSE);
      setFeatures(EMPTY_STRING);
      setImageUrls(EMPTY_STRING);
      setModel3dUrl(EMPTY_STRING);
      setNextDueDate(EMPTY_STRING);
      setNextDueTitle(EMPTY_STRING);
      setNotes(EMPTY_STRING);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('genericError'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="Clm-card">
      <Flex className="Bear-PropertyHomeForm Clm-form" direction="column" gap={FLEX_GAP_MD}>
        <Select
          label={t('dealType')}
          value={dealType}
          onChange={setDealType}
          fullWidth
          options={HOME_DEAL_OPTIONS.map((value) => ({ value, label: t(`deal_${value}`) }))}
        />
        <Input label={t('homeCity')} value={city} onChange={(event) => setCity(event.target.value)} fullWidth />
        <Input label={t('homeStreet')} value={street} onChange={(event) => setStreet(event.target.value)} fullWidth />
        <Input label={t('homeNumber')} value={houseNumber} onChange={(event) => setHouseNumber(event.target.value)} fullWidth />
        <Input label={t('homeNeighborhood')} value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} fullWidth />
        <Input label={t('homeRooms')} type="number" value={rooms} onChange={(event) => setRooms(event.target.value)} fullWidth />
        <Input label={t('homeSqm')} type="number" value={sqm} onChange={(event) => setSqm(event.target.value)} fullWidth />
        <Input label={t('homeFloor')} type="number" value={floor} onChange={(event) => setFloor(event.target.value)} fullWidth />
        <Input label={t('homePrice')} type="number" value={price} onChange={(event) => setPrice(event.target.value)} fullWidth />
        <Select
          label={t('homeListedBy')}
          value={listedBy}
          onChange={setListedBy}
          fullWidth
          options={[
            { value: LISTED_PRIVATE, label: t('listed_private') },
            { value: LISTED_BROKER, label: t('listed_broker') },
          ]}
        />
        <div className="Clm-tabs">
          <button
            type="button"
            className={elevator ? 'Clm-tab Clm-tab--active' : 'Clm-tab'}
            onClick={() => setElevator(!elevator)}
          >
            {t('homeElevator')}
          </button>
          <button
            type="button"
            className={aircon ? 'Clm-tab Clm-tab--active' : 'Clm-tab'}
            onClick={() => setAircon(!aircon)}
          >
            {t('homeAircon')}
          </button>
        </div>
        <Input label={t('homeFeatures')} value={features} onChange={(event) => setFeatures(event.target.value)} fullWidth />
        <Input label={t('homeImageUrls')} value={imageUrls} onChange={(event) => setImageUrls(event.target.value)} fullWidth />
        <Input label={t('homeModel3d')} value={model3dUrl} onChange={(event) => setModel3dUrl(event.target.value)} fullWidth />
        <Input label={t('homeNextDue')} type="date" value={nextDueDate} onChange={(event) => setNextDueDate(event.target.value)} fullWidth />
        <Input label={t('homeNextDueTitle')} value={nextDueTitle} onChange={(event) => setNextDueTitle(event.target.value)} fullWidth />
        <Input label={t('notes')} value={notes} onChange={(event) => setNotes(event.target.value)} fullWidth />
        {error ? <p className="Clm-page-sub" role="alert">{error}</p> : null}
        <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void submit()}>
          {t('addHome')}
        </Button>
      </Flex>
    </div>
  );
}
