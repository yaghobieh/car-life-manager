import React, { useMemo } from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import { SvgIcon } from '../../Landing.art';
import {
  DEFAULT_CITIES,
  FUELS,
  YEAR_FILTER_OPTIONS,
  ROOM_FILTER_OPTIONS,
  EMPTY_COUNT,
} from '../../Landing.const';
import type { LandingHeroProps } from './LandingHero.types';

export function LandingHero({
  smartQuery,
  setSmartQuery,
  searchFocused,
  setSearchFocused,
  searchBoxRef,
  onSmartSearchSubmit,
  handleSmartSearch,
  cities,
  apartments,
  cars,
  addressSuggestions,
  onSelectAddress,
  heroTab,
  setHeroTab,
  heroDeal,
  setHeroDeal,
  heroCity,
  setHeroCity,
  heroRooms,
  setHeroRooms,
  heroMaxPrice,
  setHeroMaxPrice,
  heroMaker,
  setHeroMaker,
  heroYear,
  setHeroYear,
  heroFuel,
  setHeroFuel,
  makers,
  handleHeroSearch,
}: LandingHeroProps) {
  const t = useTranslate();

  const queryTrimmed = smartQuery.trim();

  const matchedCities = useMemo(() => {
    if (!queryTrimmed) return [];
    return cities.filter((c) => c.includes(queryTrimmed));
  }, [cities, queryTrimmed]);

  const onFormSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleHeroSearch();
  };

  return (
    <section className="hero on-dark">
      <div className="container">
        <h1>{t('landing_heroTitle')}</h1>
        <p className="lead">{t('landing_heroSubtitle')}</p>

        <div className="search-panel">
          <div className="search-panel__input-wrap">
            <form className="smart" role="search" onSubmit={onSmartSearchSubmit}>
              <SvgIcon name="sparkle" />
              <label className="sr" htmlFor="smartQ">
                {t('landing_searchFree')}
              </label>
              <input
                id="smartQ"
                placeholder={t('landing_searchPlaceholder')}
                value={smartQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchFocused(true);
                  setSmartQuery(e.target.value);
                }}
              />
              <span className="badge badge--accent">{t('landing_searchBeta')}</span>
              <button className="btn btn--sm" type="submit">
                <SvgIcon name="search" /> {t('landing_searchBtn')}
              </button>
            </form>

            {searchFocused && (
              <div
                className="search-autocomplete-box"
                ref={searchBoxRef}
                onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div className="search-autocomplete-box__header">
                  <span className="search-autocomplete-box__title">{t('landing_allCities')}</span>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => setSearchFocused(false)}
                  >
                    ✕ {t('close')}
                  </button>
                </div>

                <div className="search-autocomplete-box__pills">
                  {DEFAULT_CITIES.slice(0, 10).map((city) => (
                    <button
                      key={city}
                      type="button"
                      className={`search-autocomplete-box__pill ${
                        city.includes(queryTrimmed) && queryTrimmed
                          ? 'search-autocomplete-box__pill--highlight'
                          : ''
                      }`}
                      onClick={() => {
                        setSmartQuery(city);
                        setSearchFocused(false);
                        void handleSmartSearch(city);
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>

                {queryTrimmed && (
                  <>
                    <div className="search-autocomplete-box__divider" />
                    <div className="search-autocomplete-box__header search-autocomplete-box__title">
                      <span>{queryTrimmed}</span>
                      <span className="badge">{matchedCities.length}</span>
                    </div>

                    {matchedCities.length > EMPTY_COUNT ? (
                      <div className="search-autocomplete-box__pills">
                        {matchedCities.map((city) => {
                          const aptCount = apartments.filter((a) => a.city === city).length;
                          const carCount = cars.filter((c) => c.city === city).length;
                          return (
                            <button
                              key={city}
                              type="button"
                              className="search-autocomplete-box__pill search-autocomplete-box__pill--selected"
                              onClick={() => {
                                setSmartQuery(city);
                                setSearchFocused(false);
                                void handleSmartSearch(city);
                              }}
                            >
                              <SvgIcon name="pin" />
                              <span>{city}</span>
                              <span className="search-autocomplete-box__pill-count">
                                ({aptCount} {t('landing_apartments')}, {carCount} {t('landing_cars')})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="search-autocomplete-box__empty">
                        {t('landing_noAdsFoundDesc')}
                      </div>
                    )}

                    {addressSuggestions.length > EMPTY_COUNT && (
                      <>
                        <div className="search-autocomplete-box__header-spaced search-autocomplete-box__title">
                          <span>{t('officialAddress')} (data.gov.il)</span>
                          <span className="badge badge--success">{t('completed')}</span>
                        </div>
                        <div className="search-autocomplete-box__list">
                          {addressSuggestions.map((item, idx) => {
                            const label = item.street ? `${item.street}, ${item.city}` : item.city;
                            return (
                              <button
                                key={idx}
                                type="button"
                                className="search-autocomplete-box__item"
                                onClick={() => onSelectAddress(item)}
                              >
                                <SvgIcon name="pin" />
                                <span>{label}</span>
                                <span className="search-autocomplete-box__badge">{item.city}</span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="divider-text">{t('landing_orSearchByDetails')}</div>

          <div className="seg" role="tablist">
            <button
              type="button"
              role="tab"
              className={heroTab === 'apt' ? 'is-active' : ''}
              onClick={() => setHeroTab('apt')}
            >
              <SvgIcon name="home" /> {t('landing_apartments')}
            </button>
            <button
              type="button"
              role="tab"
              className={heroTab === 'car' ? 'is-active' : ''}
              onClick={() => setHeroTab('car')}
            >
              <SvgIcon name="car" /> {t('landing_cars')}
            </button>
          </div>

          <form className="search-fields" onSubmit={onFormSearchSubmit}>
            {heroTab === 'apt' ? (
              <>
                <div className="field">
                  <label htmlFor="h-deal">{t('landing_dealType')}</label>
                  <select
                    className="select"
                    id="h-deal"
                    value={heroDeal}
                    onChange={(e) => setHeroDeal(e.target.value)}
                  >
                    <option value="all">{t('landing_dealAll')}</option>
                    <option value="sale">{t('landing_dealSale')}</option>
                    <option value="rent">{t('landing_dealRent')}</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="h-city">{t('landing_city')}</label>
                  <select
                    className="select"
                    id="h-city"
                    value={heroCity}
                    onChange={(e) => setHeroCity(e.target.value)}
                  >
                    <option value="">{t('landing_allCountry')}</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="h-rooms">{t('landing_rooms')}</label>
                  <select
                    className="select"
                    id="h-rooms"
                    value={heroRooms}
                    onChange={(e) => setHeroRooms(e.target.value)}
                  >
                    {ROOM_FILTER_OPTIONS.map((n) => (
                      <option key={n} value={String(n)}>
                        {n === EMPTY_COUNT ? t('landing_dealAll') : `${n}+`}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="h-maker">{t('landing_maker')}</label>
                  <select
                    className="select"
                    id="h-maker"
                    value={heroMaker}
                    onChange={(e) => setHeroMaker(e.target.value)}
                  >
                    <option value="">{t('landing_allMakers')}</option>
                    {makers.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="h-year">{t('landing_fromYear')}</label>
                  <select
                    className="select"
                    id="h-year"
                    value={heroYear}
                    onChange={(e) => setHeroYear(e.target.value)}
                  >
                    <option value="">{t('landing_dealAll')}</option>
                    {YEAR_FILTER_OPTIONS.map((y) => (
                      <option key={y} value={String(y)}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="h-fuel">{t('landing_fuel')}</label>
                  <select
                    className="select"
                    id="h-fuel"
                    value={heroFuel}
                    onChange={(e) => setHeroFuel(e.target.value)}
                  >
                    <option value="">{t('landing_allFuels')}</option>
                    {FUELS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="field">
              <label htmlFor="h-max">{t('landing_priceMax')}</label>
              <input
                className="input"
                id="h-max"
                inputMode="numeric"
                placeholder="₪"
                value={heroMaxPrice}
                onChange={(e) => setHeroMaxPrice(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn--lg">
              <SvgIcon name="search" /> {t('landing_searchBtn')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
