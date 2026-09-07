import { useState } from 'react';
import { Badge } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { OfficialAddress } from '@clm/shared';
import {
  EMPTY_STRING,
  FILTER_ALL,
  SEARCH_MIN_LENGTH,
  SVG_EMPTY_PROPERTY,
  ZERO,
} from '@const';
import { AddressSearchBoard } from '@components/AddressSearchBoard';
import { AreaPriceList } from '@components/AreaPriceList';
import { HomesBoard } from '@components/HomesBoard';
import { ClmEmpty, ClmList, ClmPageHead, ClmRow, ClmSectionTitle, ClmStatCard } from '@common';
import { usePropertyState } from '@hooks';
import { HOME_DEAL_OPTIONS, PROPERTY_CITY_CHIPS } from '../Property.const';
import { dueHomes, isOverdue, todayIso } from '../Property.utils';
import { PropertyHomeForm } from './PropertyHome.form';

export function PropertyHome() {
  const t = useTranslate();
  const {
    search,
    searchAreaPrices,
    searching,
    areaSearching,
    addresses,
    areaPrices,
    areaSearchError,
    clearSearch,
    homes,
    lawyers,
    expenses,
  } = usePropertyState();
  const [query, setQuery] = useState(EMPTY_STRING);
  const [dealFilter, setDealFilter] = useState(FILTER_ALL);
  const [city, setCity] = useState(EMPTY_STRING);
  const [street, setStreet] = useState(EMPTY_STRING);
  const today = todayIso();
  const dues = dueHomes(homes);
  const overdueCount = dues.filter((home) => home.nextDueDate && isOverdue(home.nextDueDate, today)).length;

  async function runLive(next: string) {
    if (next.length < SEARCH_MIN_LENGTH) return;
    await Promise.all([search(next), searchAreaPrices(next)]);
  }

  function pickAddress(address: OfficialAddress) {
    setQuery([address.street, address.city].filter(Boolean).join(' '));
    setCity(address.city);
    setStreet(address.street ?? EMPTY_STRING);
    void runLive(address.city);
  }

  return (
    <div className="Bear-PropertyHome">
      <ClmPageHead title={t('propertyHomes')} subtitle={t('pageSubProperty')} />
      <section className="Clm-homes-hero">
        <h1>{t('propertyHeroTitle')}</h1>
        <AddressSearchBoard
          query={query}
          onQueryChange={(value) => {
            setQuery(value);
            setCity(EMPTY_STRING);
            setStreet(EMPTY_STRING);
          }}
          onSearch={() => void runLive(query.trim())}
          onLiveSearch={(value) => void runLive(value)}
          onClear={clearSearch}
          onPick={pickAddress}
          suggestions={addresses}
          busy={searching}
          hint={t('propertyLiveSearchHint')}
          dealType={dealFilter}
          onDealTypeChange={setDealFilter}
          dealOptions={[
            { value: FILTER_ALL, label: t('homeFilter_all') },
            ...HOME_DEAL_OPTIONS.map((value) => ({ value, label: t(`deal_${value}`) })),
          ]}
        />
      </section>
      <div className="Clm-hero-tags">
        {PROPERTY_CITY_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="Clm-chip"
            onClick={() => {
              setQuery(chip);
              setCity(chip);
              setStreet(EMPTY_STRING);
              void runLive(chip);
            }}
          >
            {chip}
          </button>
        ))}
      </div>
      <div className="Clm-grid">
        <ClmStatCard title={t('homesOnBoard')} value={String(homes.length)} note={t('homesOnBoardNote')} />
        <ClmStatCard title={t('propertyLawyers')} value={String(lawyers.length)} note={t('lawyersYouAdded')} />
        <ClmStatCard title={t('overdue')} value={String(overdueCount)} note={t('alertsFromYourDates')} />
        <ClmStatCard title={t('expenses')} value={String(expenses.length)} note={t('basedOnRecorded')} />
      </div>
      <HomesBoard homes={homes} dealFilter={dealFilter} city={city || query} street={street} />
      {query.trim().length >= SEARCH_MIN_LENGTH ? (
        <AreaPriceList prices={areaPrices} error={areaSearchError} busy={areaSearching} />
      ) : null}
      <ClmSectionTitle title={t('propertyAlerts')} />
      {dues.length === ZERO ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_PROPERTY}
          title={t('propertyAlertsEmptyTitle')}
          body={t('propertyAlertsEmptyBody')}
        />
      ) : (
        <ClmList>
          {dues.map((home) => (
            <ClmRow
              key={home.id}
              title={home.nextDueTitle || home.city}
              subtitle={home.nextDueDate ?? EMPTY_STRING}
              action={(
                <Badge variant={home.nextDueDate && isOverdue(home.nextDueDate, today) ? 'danger' : 'warning'} pill>
                  {home.nextDueDate && isOverdue(home.nextDueDate, today) ? t('overdue') : t('upcoming')}
                </Badge>
              )}
            />
          ))}
        </ClmList>
      )}
      <ClmSectionTitle title={t('addHome')} />
      <PropertyHomeForm />
    </div>
  );
}
