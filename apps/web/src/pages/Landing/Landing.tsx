import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '@forgedevstack/lingo/react';
import { Button, Link, Typography } from '@forgedevstack/bear';
import { BearIcons } from '@forgedevstack/bear-icons';

const HeartIcon = BearIcons.HeartIcon;
import { ROUTE_CAR, ROUTE_PROPERTY, ROUTE_AUTH, BOOLEAN_TRUE, BOOLEAN_FALSE } from '@const';
import { SvgIcon, renderSkylineSvg } from './Landing.art';
import {
  FEATS,
  DEFAULT_CITIES,
  DEFAULT_MAKERS,
  FUELS,
  EMPTY_STRING,
  NUMBER_ZERO,
  EMPTY_COUNT,
  POST_MOCK_TIMEOUT_MS,
  DEAL_TYPE_ALL,
  DEAL_TYPE_SALE,
  DEAL_TYPE_RENT,
  SORT_OPTION_NEW,
  SORT_OPTION_ASC,
  SORT_OPTION_DESC,
  POST_KIND_APT,
  POST_KIND_CAR,
  PREVIEW_ID_APT,
  PREVIEW_ID_CAR,
  DEFAULT_PREVIEW_COLOR,
  DEFAULT_PREVIEW_ROOMS,
  DEFAULT_PREVIEW_SIZE,
  DEFAULT_PREVIEW_FLOOR,
  DEFAULT_PREVIEW_FLOORS,
  DEFAULT_PREVIEW_YEAR,
  DEFAULT_PREVIEW_KM,
  DEFAULT_PREVIEW_HAND,
  DEFAULT_PREVIEW_PRICE,
  DEFAULT_APT_FILTERS,
  DEFAULT_CAR_FILTERS,
  HOME_SECTION_ITEMS_LIMIT,
  GEAR_AUTO,
  GEAR_MANUAL,
  ROOM_FILTER_OPTIONS,
  YEAR_FILTER_OPTIONS,
  POST_ROOMS_OPTIONS,
  DEAL_TYPE_OPTIONS,
} from './Landing.const';
import type {
  LandingDealType,
  LandingSortOption,
  WebListingItem,
} from './Landing.types';
import { useLanding } from './hooks/useLanding';
import { LandingNavbar } from './components/LandingNavbar';
import { LandingHero } from './components/LandingHero';
import { LandingCard } from './components/LandingCard';
import { LandingItemDetail } from './components/LandingItemDetail';
import { LandingFooter } from './components/LandingFooter';

export function Landing() {
  const t = useTranslate();
  const navigate = useNavigate();

  const {
    routePath,
    themeMode,
    stripVisible,
    setStripVisible,
    smartQuery,
    setSmartQuery,
    searchFocused,
    setSearchFocused,
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
    aptFilters,
    setAptFilters,
    carFilters,
    setCarFilters,
    userMenuOpen,
    setUserMenuOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    loginModalOpen,
    setLoginModalOpen,
    contactModalOpen,
    setContactModalOpen,
    aptViewMode,
    setAptViewMode,
    selectedGalleryThumb,
    setSelectedGalleryThumb,
    view360Angle,
    setView360Angle,
    autoRotate360,
    phoneRevealed,
    setPhoneRevealed,
    heroCarIndex,
    user,
    apartments,
    cars,
    favs,
    favoritesList,
    toasts,
    cities,
    makers,
    addressSuggestions,
    postForm,
    setPostForm,
    searchBoxRef,
    userMenuRef,
    goTo,
    showToast,
    toggleFavorite,
    cycleTheme,
    handleSmartSearch,
    onSmartSearchSubmit,
    onSelectAddress,
    handleHeroSearch,
    toggleAutoRotate360,
    rotate360Left,
    rotate360Right,
    handleSetPostKindApt,
    handleSetPostKindCar,
    handleNavigateToHome,
    handleNavigateToApartments,
    handleNavigateToCars,
    handleNavigateToPost,
    handleNavigateToDesign,
    currentDetailItem,
    filteredApartments,
    filteredCars,
  } = useLanding();

  const getDealLabel = (deal: LandingDealType) => {
    switch (deal) {
      case DEAL_TYPE_SALE:
        return t('landing_dealSale');
      case DEAL_TYPE_RENT:
        return t('landing_dealRent');
      case DEAL_TYPE_ALL:
      default:
        return t('landing_dealAll');
    }
  };

  const getSortLabel = (sort: LandingSortOption) => {
    switch (sort) {
      case SORT_OPTION_ASC:
        return t('landing_sortAsc');
      case SORT_OPTION_DESC:
        return t('landing_sortDesc');
      case SORT_OPTION_NEW:
      default:
        return t('landing_sortNew');
    }
  };

  const resetAptFilters = () => {
    setAptFilters(DEFAULT_APT_FILTERS);
  };

  const resetCarFilters = () => {
    setCarFilters(DEFAULT_CAR_FILTERS);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasValidPrice = Boolean(+String(postForm.price).replace(/\D/g, EMPTY_STRING));
    if (!hasValidPrice) {
      setPostForm((p) => ({ ...p, priceError: BOOLEAN_TRUE }));
      return;
    }
    setPostForm((p) => ({ ...p, loading: BOOLEAN_TRUE, priceError: BOOLEAN_FALSE }));
    setTimeout(() => {
      setPostForm((p) => ({ ...p, loading: BOOLEAN_FALSE }));
      showToast(t('landing_adPublished'));
      goTo('/');
    }, POST_MOCK_TIMEOUT_MS);
  };

  const previewItem: WebListingItem =
    postForm.kind === POST_KIND_APT
      ? {
          id: PREVIEW_ID_APT,
          cat: POST_KIND_APT,
          deal: DEAL_TYPE_SALE,
          price: Number(postForm.price) || DEFAULT_PREVIEW_PRICE,
          city: postForm.city || t('landing_defaultPreviewCity'),
          street: postForm.street || t('landing_defaultPreviewStreet'),
          rooms: Number(postForm.rooms) || DEFAULT_PREVIEW_ROOMS,
          size: Number(postForm.size) || DEFAULT_PREVIEW_SIZE,
          floor: DEFAULT_PREVIEW_FLOOR,
          floors: DEFAULT_PREVIEW_FLOORS,
          desc: postForm.desc || EMPTY_STRING,
          feats: [],
          isNew: BOOLEAN_TRUE,
        }
      : {
          id: PREVIEW_ID_CAR,
          cat: POST_KIND_CAR,
          maker: postForm.maker || t('landing_defaultPreviewMaker'),
          model: postForm.model || t('landing_defaultPreviewModel'),
          year: Number(postForm.year) || DEFAULT_PREVIEW_YEAR,
          km: Number(postForm.km) || DEFAULT_PREVIEW_KM,
          hand: DEFAULT_PREVIEW_HAND,
          fuel: t('landing_defaultPreviewFuel'),
          gear: t('landing_defaultPreviewGear'),
          color: DEFAULT_PREVIEW_COLOR,
          city: postForm.city || t('landing_defaultPreviewCity'),
          price: Number(postForm.price) || DEFAULT_PREVIEW_PRICE,
          desc: postForm.desc || EMPTY_STRING,
          isNew: BOOLEAN_TRUE,
        };

  const renderTopAnnouncementStrip = () => {
    if (!stripVisible) {
      return null;
    }

    return (
      <div className="strip" role="region" aria-label={t('landing_announcement')}>
        <div className="container">
          <div className="strip__content">
            <span className="badge">Tavo 2026</span>
            <span>{t('landing_announcement')}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="btn btn--icon btn--sm"
            onClick={() => setStripVisible(false)}
            aria-label={t('close')}
          >
            <SvgIcon name="x" />
          </Button>
        </div>
      </div>
    );
  };

  const renderApartmentListings = () => {
    if (filteredApartments.length === EMPTY_COUNT) {
      return (
        <div className="empty">
          <SvgIcon name="search" />
          <Typography variant="h3">{t('landing_noAdsFound')}</Typography>
          <Typography variant="body2" color="muted" className="muted">{t('landing_noAdsFoundDesc')}</Typography>
          <Button variant="secondary" className="btn btn--secondary" onClick={resetAptFilters}>
            {t('landing_resetFilter')}
          </Button>
        </div>
      );
    }

    return (
      <div className="grid">
        {filteredApartments.map((item) => (
          <LandingCard
            key={item.id}
            item={item}
            isFav={favs.has(item.id)}
            onToggleFav={toggleFavorite}
            onNavigate={goTo}
          />
        ))}
      </div>
    );
  };

  const renderCarListings = () => {
    if (filteredCars.length === EMPTY_COUNT) {
      return (
        <div className="empty">
          <SvgIcon name="search" />
          <Typography variant="h3">{t('landing_noAdsFound')}</Typography>
          <Typography variant="body2" color="muted" className="muted">{t('landing_noAdsFoundDesc')}</Typography>
          <Button variant="secondary" className="btn btn--secondary" onClick={resetCarFilters}>
            {t('landing_resetFilter')}
          </Button>
        </div>
      );
    }

    return (
      <div className="grid">
        {filteredCars.map((item) => (
          <LandingCard
            key={item.id}
            item={item}
            isFav={favs.has(item.id)}
            onToggleFav={toggleFavorite}
            onNavigate={goTo}
          />
        ))}
      </div>
    );
  };

  const renderFavoritesListings = () => {
    if (favoritesList.length === EMPTY_COUNT) {
      return (
        <div className="empty empty-spaced">
          <HeartIcon size={32} />
          <Typography variant="h3">{t('landing_favoritesEmptyTitle')}</Typography>
          <Typography variant="body2" color="muted" className="muted">{t('landing_favoritesEmptyDesc')}</Typography>
          <Button
            variant="primary"
            className="btn btn--homes"
            onClick={handleNavigateToApartments}
          >
            {t('landing_searchAptsBtn')}
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-spaced">
        {favoritesList.map((item) => (
          <LandingCard
            key={item.id}
            item={item}
            isFav={favs.has(item.id)}
            onToggleFav={toggleFavorite}
            onNavigate={goTo}
          />
        ))}
      </div>
    );
  };

  const renderHomeView = () => (
    <div>
      <LandingHero
        smartQuery={smartQuery}
        setSmartQuery={setSmartQuery}
        searchFocused={searchFocused}
        setSearchFocused={setSearchFocused}
        searchBoxRef={searchBoxRef}
        onSmartSearchSubmit={onSmartSearchSubmit}
        handleSmartSearch={handleSmartSearch}
        cities={cities}
        apartments={apartments}
        cars={cars}
        addressSuggestions={addressSuggestions}
        onSelectAddress={onSelectAddress}
        heroTab={heroTab}
        setHeroTab={setHeroTab}
        heroDeal={heroDeal}
        setHeroDeal={setHeroDeal}
        heroCity={heroCity}
        setHeroCity={setHeroCity}
        heroRooms={heroRooms}
        setHeroRooms={setHeroRooms}
        heroMaxPrice={heroMaxPrice}
        setHeroMaxPrice={setHeroMaxPrice}
        heroMaker={heroMaker}
        setHeroMaker={setHeroMaker}
        heroYear={heroYear}
        setHeroYear={setHeroYear}
        heroFuel={heroFuel}
        setHeroFuel={setHeroFuel}
        makers={makers}
        handleHeroSearch={handleHeroSearch}
        goTo={goTo}
      />

      <div
        className="hero-art-strip"
        dangerouslySetInnerHTML={{ __html: renderSkylineSvg(heroCarIndex) }}
      />

      <div className="container">
        <div className="tiles">
          <Link
            className="tile tile--homes"
            href="#/apartments"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateToApartments();
            }}
          >
            <div>
              <Typography variant="h3">{t('landing_apartments')}</Typography>
              <Typography variant="body2">
                {apartments.length} {t('landing_adsCount')} · {t('landing_apartmentsSubtitle')}
              </Typography>
            </div>
            <span className="go">
              <SvgIcon name="chev" />
            </span>
          </Link>

          <Link
            className="tile tile--cars"
            href="#/cars"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateToCars();
            }}
          >
            <div>
              <Typography variant="h3">{t('landing_cars')}</Typography>
              <Typography variant="body2">
                {cars.length} {t('landing_adsCount')} · {t('landing_carsSubtitle')}
              </Typography>
            </div>
            <span className="go">
              <SvgIcon name="chev" />
            </span>
          </Link>
        </div>

        <section className="section">
          <div className="section__head">
            <Typography variant="h2">{t('landing_newAptsSection')}</Typography>
            <Link
              className="link"
              href="#/apartments"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateToApartments();
              }}
            >
              {t('landing_allAptsLink')} ({apartments.length})
            </Link>
          </div>
          <div className="grid">
            {apartments.slice(NUMBER_ZERO, HOME_SECTION_ITEMS_LIMIT).map((item) => (
              <LandingCard
                key={item.id}
                item={item}
                isFav={favs.has(item.id)}
                onToggleFav={toggleFavorite}
                onNavigate={goTo}
              />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="banner banner--teal">
            <div>
              <Typography variant="h3">{t('landing_sellersBannerTitle')}</Typography>
              <Typography variant="body1">{t('landing_sellersBannerDesc')}</Typography>
            </div>
            <Button
              variant="accent"
              size="lg"
              className="btn btn--accent btn--lg"
              onClick={handleNavigateToPost}
            >
              <SvgIcon name="plus" /> {t('landing_postAd')}
            </Button>
          </div>
        </section>

        <section className="section">
          <div className="section__head">
            <Typography variant="h2">{t('landing_newCarsSection')}</Typography>
            <Link
              className="link"
              href="#/cars"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateToCars();
              }}
            >
              {t('landing_allCarsLink')} ({cars.length})
            </Link>
          </div>
          <div className="grid">
            {cars.slice(NUMBER_ZERO, HOME_SECTION_ITEMS_LIMIT).map((item) => (
              <LandingCard
                key={item.id}
                item={item}
                isFav={favs.has(item.id)}
                onToggleFav={toggleFavorite}
                onNavigate={goTo}
              />
            ))}
          </div>
        </section>

        <section className="section grid-2">
          <div className="banner banner--soft">
            <div>
              <Typography variant="h3">{t('landing_mortgageCalcTitle')}</Typography>
              <Typography variant="body1">{t('landing_mortgageCalcDesc')}</Typography>
            </div>
            <Button
              variant="secondary"
              className="btn btn--secondary"
              onClick={() => showToast(t('landing_comingSoon'))}
            >
              {t('landing_toCalc')}
            </Button>
          </div>
          <div className="banner banner--soft banner--cobalt">
            <div>
              <Typography variant="h3">{t('landing_carValuationTitle')}</Typography>
              <Typography variant="body1">{t('landing_carValuationDesc')}</Typography>
            </div>
            <Button
              variant="secondary"
              className="btn btn--secondary"
              onClick={() => showToast(t('landing_comingSoon'))}
            >
              {t('landing_toValuation')}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );

  const renderApartmentsView = () => (
    <div className="container">
      <div className="page-head">
        <nav className="crumbs" aria-label={t('landing_crumbHome')}>
          <Link
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateToHome();
            }}
          >
            {t('landing_crumbHome')}
          </Link>
          <SvgIcon name="chev" />
          <span>{t('landing_apartments')}</span>
        </nav>
        <Typography variant="h1">{t('landing_apartmentsTitle')}</Typography>
        <Typography variant="body1" className="muted page-subtitle-muted">{t('landing_apartmentsSubtitle')}</Typography>
      </div>

      <div className="layout">
        <aside className="filters" aria-label={t('landing_filterAptsTitle')}>
          <Typography variant="h3">{t('landing_filterAptsTitle')}</Typography>

          <div className="field">
            <span className="label">{t('landing_dealType')}</span>
            <div className="chips">
              {DEAL_TYPE_OPTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`chip ${aptFilters.deal === d ? 'is-active' : ''}`}
                  onClick={() => setAptFilters((p) => ({ ...p, deal: d }))}
                >
                  {getDealLabel(d)}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="f-apt-city">{t('landing_city')}</label>
            <select
              className="select"
              id="f-apt-city"
              value={aptFilters.city}
              onChange={(e) => setAptFilters((p) => ({ ...p, city: e.target.value }))}
            >
              <option value={EMPTY_STRING}>{t('landing_allCities')}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <span className="label">{t('landing_roomsAtLeast')}</span>
            <div className="chips">
              {ROOM_FILTER_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`chip ${aptFilters.rooms === n ? 'is-active' : ''}`}
                  onClick={() => setAptFilters((p) => ({ ...p, rooms: n }))}
                >
                  {n === EMPTY_COUNT ? t('landing_dealAll') : `${n}+`}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="f-apt-max">{t('landing_priceMaxNis')}</label>
            <input
              className="input"
              id="f-apt-max"
              inputMode="numeric"
              placeholder={t('landing_noLimit')}
              value={aptFilters.max}
              onChange={(e) => setAptFilters((p) => ({ ...p, max: e.target.value }))}
            />
          </div>

          <div className="field">
            <span className="label">{t('landing_features')}</span>
            {Object.entries(FEATS).map(([k, [labelKey]]) => {
              const checked = aptFilters.feats.includes(k);
              return (
                <label key={k} className="check">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...aptFilters.feats, k]
                        : aptFilters.feats.filter((f) => f !== k);
                      setAptFilters((p) => ({ ...p, feats: next }));
                    }}
                  />
                  {t(labelKey as any) || labelKey}
                </label>
              );
            })}
          </div>

          <Button variant="ghost" size="sm" className="btn btn--ghost btn--sm" onClick={resetAptFilters}>
            {t('landing_resetFilter')}
          </Button>
        </aside>

        <div>
          <div className="toolbar">
            <div className="row">
              <strong id="count">
                {filteredApartments.length} {t('landing_adsCount')}
              </strong>
            </div>
            <select
              className="select"
              value={aptFilters.sort}
              onChange={(e) =>
                setAptFilters((p) => ({ ...p, sort: e.target.value as any }))
              }
              aria-label={t('landing_sort')}
            >
              <option value={SORT_OPTION_NEW}>{getSortLabel(SORT_OPTION_NEW)}</option>
              <option value={SORT_OPTION_ASC}>{getSortLabel(SORT_OPTION_ASC)}</option>
              <option value={SORT_OPTION_DESC}>{getSortLabel(SORT_OPTION_DESC)}</option>
            </select>
          </div>

          {renderApartmentListings()}
        </div>
      </div>
    </div>
  );

  const renderCarsView = () => (
    <div className="container">
      <div className="page-head">
        <nav className="crumbs" aria-label={t('landing_crumbHome')}>
          <Link
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateToHome();
            }}
          >
            {t('landing_crumbHome')}
          </Link>
          <SvgIcon name="chev" />
          <span>{t('landing_cars')}</span>
        </nav>
        <Typography variant="h1">{t('landing_carsTitle')}</Typography>
        <Typography variant="body1" className="muted page-subtitle-muted">{t('landing_carsSubtitle')}</Typography>
      </div>

      <div className="layout">
        <aside className="filters" aria-label={t('landing_filterCarsTitle')}>
          <Typography variant="h3">{t('landing_filterCarsTitle')}</Typography>

          <div className="field">
            <label htmlFor="f-car-maker">{t('landing_maker')}</label>
            <select
              className="select"
              id="f-car-maker"
              value={carFilters.maker}
              onChange={(e) => setCarFilters((p) => ({ ...p, maker: e.target.value }))}
            >
              <option value={EMPTY_STRING}>{t('landing_allMakers')}</option>
              {DEFAULT_MAKERS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="f-car-year">{t('landing_fromYear')}</label>
            <select
              className="select"
              id="f-car-year"
              value={carFilters.year}
              onChange={(e) => setCarFilters((p) => ({ ...p, year: e.target.value }))}
            >
              <option value={EMPTY_STRING}>{t('landing_dealAll')}</option>
              {YEAR_FILTER_OPTIONS.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="f-car-fuel">{t('landing_fuel')}</label>
            <select
              className="select"
              id="f-car-fuel"
              value={carFilters.fuel}
              onChange={(e) => setCarFilters((p) => ({ ...p, fuel: e.target.value }))}
            >
              <option value={EMPTY_STRING}>{t('landing_allFuels')}</option>
              {FUELS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="f-car-gear">{t('landing_gear')}</label>
            <select
              className="select"
              id="f-car-gear"
              value={carFilters.gear}
              onChange={(e) => setCarFilters((p) => ({ ...p, gear: e.target.value }))}
            >
              <option value={EMPTY_STRING}>{t('landing_allGears')}</option>
              <option value={GEAR_AUTO}>{t('landing_gearAuto')}</option>
              <option value={GEAR_MANUAL}>{t('landing_gearManual')}</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="f-car-max">{t('landing_priceMaxNis')}</label>
            <input
              className="input"
              id="f-car-max"
              inputMode="numeric"
              placeholder={t('landing_noLimit')}
              value={carFilters.max}
              onChange={(e) => setCarFilters((p) => ({ ...p, max: e.target.value }))}
            />
          </div>

          <Button variant="ghost" size="sm" className="btn btn--ghost btn--sm" onClick={resetCarFilters}>
            {t('landing_resetFilter')}
          </Button>
        </aside>

        <div>
          <div className="toolbar">
            <div className="row">
              <strong id="count">
                {filteredCars.length} {t('landing_adsCount')}
              </strong>
            </div>
            <select
              className="select"
              value={carFilters.sort}
              onChange={(e) =>
                setCarFilters((p) => ({ ...p, sort: e.target.value as any }))
              }
              aria-label={t('landing_sort')}
            >
              <option value={SORT_OPTION_NEW}>{getSortLabel(SORT_OPTION_NEW)}</option>
              <option value={SORT_OPTION_ASC}>{getSortLabel(SORT_OPTION_ASC)}</option>
              <option value={SORT_OPTION_DESC}>{getSortLabel(SORT_OPTION_DESC)}</option>
            </select>
          </div>

          {renderCarListings()}
        </div>
      </div>
    </div>
  );

  const renderFavoritesView = () => (
    <div className="container page-container-padded">
      <div className="page-head">
        <nav className="crumbs" aria-label={t('landing_crumbHome')}>
          <Link
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateToHome();
            }}
          >
            {t('landing_crumbHome')}
          </Link>
          <SvgIcon name="chev" />
          <span>{t('landing_favorites')}</span>
        </nav>
        <Typography variant="h1">
          {t('landing_favoritesTitle')} ({favoritesList.length})
        </Typography>
      </div>

      {renderFavoritesListings()}
    </div>
  );

  const renderGeneralsView = () => (
    <div className="container page-container-padded">
      <div className="page-head">
        <Typography variant="h1">{t('landing_dashboardHub')}</Typography>
        <Typography variant="body1" className="muted page-subtitle-muted">
          {t('landing_active')} — Tavo Ecosystem Hub
        </Typography>
      </div>

      <div className="grid-generals">
        <div className="panel generals-card generals-card--cobalt">
          <div>
            <div className="generals-card__header">
              <div className="generals-icon generals-icon--cobalt">
                <SvgIcon name="car" />
              </div>
              <div>
                <Typography variant="h2">{t('productCarTitle')}</Typography>
                <span className="badge badge--brand">{t('landing_active')}</span>
              </div>
            </div>
            <Typography variant="body1" className="muted generals-card__body">{t('productCarBody')}</Typography>
          </div>
          <Button
            size="lg"
            className="btn btn--cars btn--lg btn--block"
            onClick={() => navigate(ROUTE_CAR)}
          >
            <SvgIcon name="car" /> {t('productCarCta')}
          </Button>
        </div>

        <div className="panel generals-card generals-card--teal">
          <div>
            <div className="generals-card__header">
              <div className="generals-icon generals-icon--teal">
                <SvgIcon name="home" />
              </div>
              <div>
                <Typography variant="h2">{t('productPropertyTitle')}</Typography>
                <span className="badge badge--soft">{t('landing_apartments')}</span>
              </div>
            </div>
            <Typography variant="body1" className="muted generals-card__body">{t('productPropertyBody')}</Typography>
          </div>
          <Button
            size="lg"
            className="btn btn--homes btn--lg btn--block"
            onClick={() => navigate(ROUTE_PROPERTY)}
          >
            <SvgIcon name="home" /> {t('productPropertyCta')}
          </Button>
        </div>
      </div>

      <div className="panel quick-actions-panel">
        <Typography variant="h3">{t('manage')}</Typography>
        <div className="quick-actions-wrap">
          <Button
            variant="secondary"
            className="btn btn--secondary"
            onClick={handleNavigateToPost}
          >
            <SvgIcon name="plus" /> {t('landing_postAd')}
          </Button>
          <Button
            variant="ghost"
            className="btn btn--ghost"
            onClick={() => goTo('/favorites')}
          >
            <HeartIcon size={16} /> {t('landing_favorites')} ({favoritesList.length})
          </Button>
          <Button
            variant="ghost"
            className="btn btn--ghost"
            onClick={() => navigate(ROUTE_PROPERTY)}
          >
            <SvgIcon name="home" /> {t('productPropertyTitle')}
          </Button>
          <Button
            variant="ghost"
            className="btn btn--ghost"
            onClick={() => navigate(ROUTE_CAR)}
          >
            <SvgIcon name="car" /> {t('productCarTitle')}
          </Button>
          <Button
            variant="ghost"
            className="btn btn--ghost"
            onClick={handleNavigateToDesign}
          >
            {t('landing_footerDesign')}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPostView = () => (
    <div className="container page-container-padded">
      <div className="page-head">
        <nav className="crumbs" aria-label={t('landing_crumbHome')}>
          <Link
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateToHome();
            }}
          >
            {t('landing_crumbHome')}
          </Link>
          <SvgIcon name="chev" />
          <span>{t('landing_postTitle')}</span>
        </nav>
        <Typography variant="h1">{t('landing_postTitle')}</Typography>
      </div>

      <div className="post">
        <form className="panel" onSubmit={handlePostSubmit}>
          <div className="field field-spacing-bottom">
            <span className="label">{t('landing_whatToPublish')}</span>
            <div className="seg">
              <Button
                type="button"
                variant="ghost"
                className={postForm.kind === POST_KIND_APT ? 'is-active' : ''}
                onClick={handleSetPostKindApt}
              >
                <SvgIcon name="home" /> {t('landing_postApartment')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className={postForm.kind === POST_KIND_CAR ? 'is-active' : ''}
                onClick={handleSetPostKindCar}
              >
                <SvgIcon name="car" /> {t('landing_postCar')}
              </Button>
            </div>
          </div>

          <div className="form-grid">
            {postForm.kind === POST_KIND_APT ? (
              <>
                <div className="field">
                  <label htmlFor="p-street">{t('landing_addressLabel')}</label>
                  <input
                    className="input"
                    id="p-street"
                    placeholder={t('landing_addressPlaceholder')}
                    value={postForm.street}
                    onChange={(e) => setPostForm((p) => ({ ...p, street: e.target.value }))}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="p-city">{t('landing_city')}</label>
                  <select
                    className="select"
                    id="p-city"
                    value={postForm.city}
                    onChange={(e) => setPostForm((p) => ({ ...p, city: e.target.value }))}
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="p-rooms">{t('landing_rooms')}</label>
                  <select
                    className="select"
                    id="p-rooms"
                    value={postForm.rooms}
                    onChange={(e) => setPostForm((p) => ({ ...p, rooms: e.target.value }))}
                  >
                    {POST_ROOMS_OPTIONS.map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="p-size">{t('landing_areaLabel')}</label>
                  <input
                    className="input"
                    id="p-size"
                    inputMode="numeric"
                    value={postForm.size}
                    onChange={(e) => setPostForm((p) => ({ ...p, size: e.target.value }))}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="p-maker">{t('landing_maker')}</label>
                  <select
                    className="select"
                    id="p-maker"
                    value={postForm.maker}
                    onChange={(e) => setPostForm((p) => ({ ...p, maker: e.target.value }))}
                  >
                    {makers.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="p-model">{t('landing_modelLabel')}</label>
                  <input
                    className="input"
                    id="p-model"
                    value={postForm.model}
                    onChange={(e) => setPostForm((p) => ({ ...p, model: e.target.value }))}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="p-year">{t('landing_yearLabel')}</label>
                  <input
                    className="input"
                    id="p-year"
                    inputMode="numeric"
                    value={postForm.year}
                    onChange={(e) => setPostForm((p) => ({ ...p, year: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="p-km">{t('landing_kmLabel')}</label>
                  <input
                    className="input"
                    id="p-km"
                    inputMode="numeric"
                    value={postForm.km}
                    onChange={(e) => setPostForm((p) => ({ ...p, km: e.target.value }))}
                  />
                </div>
              </>
            )}

            <div className="field full">
              <label htmlFor="p-price">{t('landing_priceLabel')}</label>
              <input
                className="input"
                id="p-price"
                inputMode="numeric"
                value={postForm.price}
                onChange={(e) => setPostForm((p) => ({ ...p, price: e.target.value }))}
                required
              />
              {postForm.priceError && (
                <span className="hint is-error">{t('landing_priceError')}</span>
              )}
            </div>

            <div className="field full field-spacing-top">
              <span className="label">{t('landing_imagesLabel')}</span>
              <div className="drop">
                <SvgIcon name="image" />
                <Typography variant="body1" weight="bold">{t('landing_dropImages')}</Typography>
                <span className="hint">{t('landing_dropImagesHint')}</span>
              </div>
            </div>

            <div className="field full">
              <label htmlFor="p-desc">{t('landing_descLabel')}</label>
              <textarea
                className="textarea"
                id="p-desc"
                placeholder={t('landing_descPlaceholder')}
                value={postForm.desc}
                onChange={(e) => setPostForm((p) => ({ ...p, desc: e.target.value }))}
              />
            </div>

            <div className="field full">
              <label className="check">
                <input
                  type="checkbox"
                  checked={postForm.terms}
                  onChange={(e) => setPostForm((p) => ({ ...p, terms: e.target.checked }))}
                />
                {t('landing_acceptTerms')}
              </label>
            </div>
          </div>

          <div className="row">
            <Button
              type="submit"
              size="lg"
              className="btn btn--lg"
              disabled={!postForm.terms || postForm.loading}
            >
              {postForm.loading ? '...' : t('landing_publishAdBtn')}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="btn btn--ghost btn--lg"
              onClick={() => showToast(t('landing_comingSoon'))}
            >
              {t('landing_saveDraftBtn')}
            </Button>
          </div>
        </form>

        <aside className="side">
          <div className="label">{t('landing_previewLabel')}</div>
          <div id="preview">
            <LandingCard item={previewItem} preview />
          </div>
        </aside>
      </div>
    </div>
  );

  const renderDesignView = () => (
    <div className="container ds page-container-padded">
      <div className="page-head">
        <Typography variant="h1">Tavo Design Tokens</Typography>
        <Typography variant="body1" className="muted page-subtitle-muted">
          Design System & Ecosystem Components Showcase
        </Typography>
      </div>

      <section className="ds-section">
        <Typography variant="h2">Palette Tokens</Typography>
        <div className="ds-row">
          <div className="ds-swatch ds-swatch--teal">
            teal-600
          </div>
          <div className="ds-swatch ds-swatch--cobalt">
            cobalt-600
          </div>
          <div className="ds-swatch ds-swatch--saffron">
            saffron-400
          </div>
          <div className="ds-swatch ds-swatch--neutral">
            neutral-900
          </div>
        </div>
      </section>

      <section className="ds-section">
        <Typography variant="h2">Buttons</Typography>
        <div className="panel">
          <div className="row">
            <Button className="btn">Primary</Button>
            <Button variant="secondary" className="btn btn--secondary">Secondary</Button>
            <Button variant="ghost" className="btn btn--ghost">Ghost</Button>
            <Button variant="accent" className="btn btn--accent">Accent</Button>
            <Button className="btn btn--homes">Homes</Button>
            <Button className="btn btn--cars">Cars</Button>
            <Button variant="danger" className="btn btn--danger">Danger</Button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderActiveView = () => {
    switch (routePath) {
      case 'home':
        return renderHomeView();
      case 'apartments':
        return renderApartmentsView();
      case 'cars':
        return renderCarsView();
      case 'item':
        if (!currentDetailItem) {
          return null;
        }
        return (
          <LandingItemDetail
            item={currentDetailItem}
            aptViewMode={aptViewMode}
            setAptViewMode={setAptViewMode}
            selectedGalleryThumb={selectedGalleryThumb}
            setSelectedGalleryThumb={setSelectedGalleryThumb}
            view360Angle={view360Angle}
            setView360Angle={setView360Angle}
            autoRotate360={autoRotate360}
            toggleAutoRotate360={toggleAutoRotate360}
            rotate360Left={rotate360Left}
            rotate360Right={rotate360Right}
            phoneRevealed={phoneRevealed}
            setPhoneRevealed={setPhoneRevealed}
            setContactModalOpen={setContactModalOpen}
            onNavigate={goTo}
            showToast={showToast}
          />
        );
      case 'favorites':
        return renderFavoritesView();
      case 'generals':
        return renderGeneralsView();
      case 'post':
        return renderPostView();
      case 'design':
        return renderDesignView();
      default:
        return renderHomeView();
    }
  };

  const renderLoginModal = () => {
    if (!loginModalOpen) {
      return null;
    }

    return (
      <div className="modal-backdrop" onClick={() => setLoginModalOpen(false)}>
        <div
          className="dlg modal-dialog"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <div className="dlg__head">
            <Typography variant="h3">{t('landing_login')}</Typography>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="btn btn--ghost btn--icon btn--sm"
              onClick={() => setLoginModalOpen(false)}
              aria-label={t('close')}
            >
              <SvgIcon name="x" />
            </Button>
          </div>

          <div className="modal-form-grid">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="btn btn--secondary btn--lg btn--block"
              onClick={() => {
                setLoginModalOpen(false);
                navigate(ROUTE_AUTH);
              }}
            >
              <SvgIcon name="user" /> {t('landing_loginToSystem')} (Google / Gmail)
            </Button>
            <div className="divider-text">{t('landing_orSearchByDetails')}</div>
            <div className="field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className="input"
                type="email"
                placeholder="name@email.com"
                dir="ltr"
              />
            </div>
            <Button
              type="button"
              size="lg"
              className="btn btn--lg btn--block"
              onClick={() => {
                setLoginModalOpen(false);
                navigate(ROUTE_AUTH);
              }}
            >
              {t('landing_loginToSystem')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderContactModal = () => {
    if (!contactModalOpen) {
      return null;
    }

    return (
      <div className="modal-backdrop" onClick={() => setContactModalOpen(false)}>
        <div
          className="dlg modal-dialog"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <div className="dlg__head">
            <Typography variant="h3">{t('landing_msgToSeller')}</Typography>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="btn btn--ghost btn--icon btn--sm"
              onClick={() => setContactModalOpen(false)}
              aria-label={t('close')}
            >
              <SvgIcon name="x" />
            </Button>
          </div>
          <div className="modal-form-grid">
            <div className="field">
              <label htmlFor="msg-name">{t('landing_yourName')}</label>
              <input
                id="msg-name"
                className="input"
                defaultValue={user?.name || EMPTY_STRING}
                placeholder={t('landing_yourName')}
              />
            </div>
            <div className="field">
              <label htmlFor="msg-text">{t('landing_message')}</label>
              <textarea
                id="msg-text"
                className="textarea"
                defaultValue={t('landing_msgDefault')}
              />
            </div>
            <Button
              type="button"
              size="lg"
              className="btn btn--lg"
              onClick={() => {
                setContactModalOpen(false);
                showToast(t('landing_msgSent'));
              }}
            >
              {t('landing_send')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderToastContainer = () => (
    <div className="toasts" aria-live="polite">
      {toasts.map((msg, i) => (
        <div key={i} className="toast">
          <SvgIcon name="check" />
          <span>{msg}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="nuvo-app" data-theme={themeMode}>
      {renderTopAnnouncementStrip()}

      <LandingNavbar
        routePath={routePath}
        user={user}
        carsCount={cars.length}
        apartmentsCount={apartments.length}
        favoritesCount={favoritesList.length}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuRef={userMenuRef}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        themeMode={themeMode}
        cycleTheme={cycleTheme}
        setLoginModalOpen={setLoginModalOpen}
        showToast={showToast}
        goTo={goTo}
      />

      <main id="app">{renderActiveView()}</main>

      <LandingFooter
        onNavigate={goTo}
        onSetAptDealFilter={(deal) => setAptFilters((p) => ({ ...p, deal }))}
        onSetCarFuelFilter={(fuel) => setCarFilters((p) => ({ ...p, fuel }))}
        onShowToast={showToast}
      />

      {renderToastContainer()}
      {renderLoginModal()}
      {renderContactModal()}
    </div>
  );
}
