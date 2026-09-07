import { useState } from 'react';
import { Select } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { AreaPrice, OfficialAddress } from '@clm/shared';
import { api } from '@api';
import { AddressSearchBoard } from '@components/AddressSearchBoard';
import { AreaPriceList } from '@components/AreaPriceList';
import { AUTH_ROLE_OPTIONS } from '../Auth.const';
import { roleLabelKey } from '../Auth.utils';
import type { AuthRegisterExtrasProps } from './AuthRegisterExtras.types';

export function AuthRegisterExtras(props: AuthRegisterExtrasProps) {
  const { role, onRoleChange, city, onCityChange } = props;
  const t = useTranslate();
  const [addresses, setAddresses] = useState<OfficialAddress[]>([]);
  const [prices, setPrices] = useState<AreaPrice[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function liveSearch(value: string) {
    setBusy(true);
    setError(null);
    try {
      const [addressPayload, pricePayload] = await Promise.all([
        api.searchAddresses(value),
        api.searchAreaPrices(value),
      ]);
      setAddresses(addressPayload.addresses);
      setPrices(pricePayload.prices);
    } catch (err) {
      setAddresses([]);
      setPrices([]);
      setError(err instanceof Error ? err.message : t('genericError'));
    } finally {
      setBusy(false);
    }
  }

  function pickAddress(address: OfficialAddress) {
    onCityChange(address.city);
    void liveSearch(address.city);
  }

  return (
    <>
      <Select
        label={t('accountRole')}
        value={role}
        onChange={onRoleChange}
        fullWidth
        options={AUTH_ROLE_OPTIONS.map((value) => ({ value, label: t(roleLabelKey(value)) }))}
      />
      <AddressSearchBoard
        query={city}
        onQueryChange={onCityChange}
        onSearch={() => void liveSearch(city.trim())}
        onLiveSearch={(value) => void liveSearch(value)}
        onClear={() => {
          setAddresses([]);
          setPrices([]);
        }}
        onPick={pickAddress}
        suggestions={addresses}
        busy={busy}
        hideSubmit
        hint={t('registerAreaHint')}
      />
      {city.trim() ? <AreaPriceList prices={prices} error={error} busy={busy} /> : null}
    </>
  );
}
