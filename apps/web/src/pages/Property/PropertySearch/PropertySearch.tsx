import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Badge, Button } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { OfficialAddress } from '@clm/shared';
import {
  ADDRESS_QUERY_PARAM,
  EMPTY_STRING,
  FILTER_ALL,
  SEARCH_MIN_LENGTH,
  SVG_EMPTY_PROPERTY,
  ZERO,
} from '@const';
import { AddressSearchBoard } from '@components/AddressSearchBoard';
import { AreaPriceList } from '@components/AreaPriceList';
import { HomesBoard } from '@components/HomesBoard';
import { ClmEmpty, ClmList, ClmPageHead, ClmRow } from '@common';
import { usePropertyState } from '@hooks';
import { addressSubtitle, addressTitle } from '../Property.utils';

function SearchResults(props: {
  addresses: OfficialAddress[];
  onSave: (address: OfficialAddress) => void;
}) {
  const t = useTranslate();
  return (
    <ClmList>
      {props.addresses.map((address) => (
        <ClmRow
          key={address.id}
          title={addressTitle(address)}
          subtitle={addressSubtitle(address, t('officialCity'))}
          action={(
            <Button variant="outline" onClick={() => props.onSave(address)}>
              {t('propertySaveAddress')}
            </Button>
          )}
        />
      ))}
    </ClmList>
  );
}

export function PropertySearch() {
  const t = useTranslate();
  const [params] = useSearchParams();
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
    homes,
  } = usePropertyState();
  const [query, setQuery] = useState(params.get(ADDRESS_QUERY_PARAM) ?? EMPTY_STRING);
  const hasResults = addresses.length > ZERO;

  async function submitSearch(next = query.trim()) {
    if (next.length < SEARCH_MIN_LENGTH) return;
    await Promise.all([search(next), searchAreaPrices(next)]);
  }

  function SearchBody() {
    if (searchError) {
      return (
        <ClmEmpty
          iconSrc={SVG_EMPTY_PROPERTY}
          title={t('propertySearchErrorTitle')}
          body={t('propertySearchErrorBody')}
        />
      );
    }
    if (hasResults) {
      return (
        <SearchResults
          addresses={addresses}
          onSave={(address) => void saveAddress({
            city: address.city,
            street: address.street,
            cityCode: address.cityCode,
            streetCode: address.streetCode,
            region: address.region,
          })}
        />
      );
    }
    return (
      <ClmEmpty
        iconSrc={SVG_EMPTY_PROPERTY}
        title={t('propertySearchEmptyTitle')}
        body={t('propertySearchEmptyBody')}
      />
    );
  }

  return (
    <div className="Bear-PropertySearch">
      <ClmPageHead title={t('propertySearch')} subtitle={t('pageSubPropertySearch')} />
      <Badge variant="success" pill>{t('officialAddress')}</Badge>
      <AddressSearchBoard
        query={query}
        onQueryChange={setQuery}
        onSearch={() => void submitSearch()}
        onLiveSearch={(value) => void submitSearch(value)}
        onClear={clearSearch}
        onPick={(address) => {
          setQuery(addressTitle(address));
          void submitSearch(address.street || address.city);
        }}
        suggestions={addresses}
        busy={searching}
        hint={t('propertyLiveSearchHint')}
      />
      <SearchBody />
      <HomesBoard homes={homes} dealFilter={FILTER_ALL} city={query} street={EMPTY_STRING} />
      {query.trim().length >= SEARCH_MIN_LENGTH ? (
        <AreaPriceList prices={areaPrices} error={areaSearchError} busy={areaSearching} />
      ) : null}
    </div>
  );
}
