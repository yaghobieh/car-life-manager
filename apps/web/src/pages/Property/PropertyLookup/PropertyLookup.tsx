import { useState } from 'react';
import { Badge, Button } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { OfficialAddress } from '@clm/shared';
import {
  DATA_GOV_IL_URL,
  EMPTY_STRING,
  LAND_AUTHORITY_URL,
  SEARCH_MIN_LENGTH,
  SVG_EMPTY_PROPERTY,
  TABU_OFFICIAL_URL,
} from '@const';
import { AddressSearchBoard } from '@components/AddressSearchBoard';
import { AreaPriceList } from '@components/AreaPriceList';
import { OfficialLink } from '@components/OfficialLink';
import { ClmEmpty, ClmList, ClmPageHead, ClmRow } from '@common';
import { usePropertyState } from '@hooks';
import { addressSubtitle, addressTitle } from '../Property.utils';

export function PropertyLookup() {
  const t = useTranslate();
  const {
    addresses,
    search,
    searchAreaPrices,
    searching,
    areaSearching,
    areaPrices,
    areaSearchError,
    searchError,
    saveAddress,
    clearSearch,
  } = usePropertyState();
  const [query, setQuery] = useState(EMPTY_STRING);
  const [picked, setPicked] = useState<OfficialAddress | null>(null);

  async function runSearch(next = query.trim()) {
    if (next.length < SEARCH_MIN_LENGTH) return;
    await Promise.all([search(next), searchAreaPrices(next)]);
  }

  function pickAddress(address: OfficialAddress) {
    setPicked(address);
    setQuery(addressTitle(address));
    void searchAreaPrices(address.city);
  }

  return (
    <div className="Bear-PropertyLookup">
      <ClmPageHead title={t('propertyLookup')} subtitle={t('pageSubPropertyLookup')} />
      <AddressSearchBoard
        query={query}
        onQueryChange={setQuery}
        onSearch={() => void runSearch()}
        onLiveSearch={(value) => void search(value)}
        onClear={clearSearch}
        onPick={pickAddress}
        suggestions={addresses}
        busy={searching}
      />
      {searchError ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_PROPERTY}
          title={t('propertySearchErrorTitle')}
          body={t('propertySearchErrorBody')}
        />
      ) : null}
      {picked ? (
        <section className="Clm-lookup-result">
          <div className="Clm-lookup-eyebrow">{t('lookupResultFor')}</div>
          <h2 className="Clm-lookup-title">{addressTitle(picked)}</h2>
          <p className="Clm-page-sub">{addressSubtitle(picked, t('officialCity'))}</p>
          <Badge variant="success" pill>{t('officialAddress')}</Badge>
          <p className="Clm-lookup-empty">{t('lookupNoTabu')}</p>
          <AreaPriceList prices={areaPrices} error={areaSearchError} busy={areaSearching} />
          <Button
            variant="outline"
            onClick={() => void saveAddress({
              city: picked.city,
              street: picked.street,
              cityCode: picked.cityCode,
              streetCode: picked.streetCode,
              region: picked.region,
            })}
          >
            {t('propertySaveAddress')}
          </Button>
        </section>
      ) : (
        <ClmEmpty
          iconSrc={SVG_EMPTY_PROPERTY}
          title={t('lookupEmptyTitle')}
          body={t('lookupEmptyBody')}
        />
      )}
      <ClmList>
        <ClmRow
          title={t('lookupTabu')}
          subtitle={t('lookupTabuBody')}
          action={<OfficialLink href={TABU_OFFICIAL_URL} label={t('officialSite')} />}
        />
        <ClmRow
          title={t('lookupDataGov')}
          subtitle={t('lookupDataGovBody')}
          action={<OfficialLink href={DATA_GOV_IL_URL} label={t('officialSite')} />}
        />
        <ClmRow
          title={t('lookupLand')}
          subtitle={t('lookupLandBody')}
          action={<OfficialLink href={LAND_AUTHORITY_URL} label={t('officialSite')} />}
        />
      </ClmList>
    </div>
  );
}
