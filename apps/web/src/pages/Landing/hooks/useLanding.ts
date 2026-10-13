import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslate } from '@forgedevstack/lingo/react';
import { useAppState } from '@hooks';
import { useBearMode } from '@forgedevstack/bear';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  EMPTY_STRING,
  ZERO,
} from '@const';
import { updateSocialMetaTags } from '../Landing.utils';
import {
  ADDRESS_SUGGESTION_LIMIT,
  AUTO_ROTATE_INTERVAL_MS,
  AUTO_ROTATE_STEP_DEG,
  CAR_QUERY_KEYWORDS,
  DEAL_TYPE_ALL,
  DEAL_TYPE_SALE,
  DEBOUNCE_SEARCH_MS,
  DEFAULT_APT_FILTERS,
  DEFAULT_CAR_FILTERS,
  DEFAULT_CITIES,
  DEFAULT_HERO_ROOMS_VALUE,
  DEFAULT_MAKERS,
  DEFAULT_POST_FUEL,
  DEFAULT_POST_KM,
  DEFAULT_POST_MODEL,
  DEFAULT_POST_ROOMS,
  DEFAULT_POST_SIZE,
  DEFAULT_POST_YEAR,
  FULL_ROTATION_DEG,
  HERO_CAR_CYCLE_COUNT,
  HERO_CAR_CYCLE_INTERVAL_MS,
  LANDING_ROUTE_APARTMENTS,
  LANDING_ROUTE_CARS,
  LANDING_ROUTE_DESIGN,
  LANDING_ROUTE_HOME,
  LANDING_ROUTE_POST,
  MIN_SEARCH_LENGTH,
  NUMBER_ZERO,
  POST_KIND_APT,
  POST_KIND_CAR,
  ROTATION_STEP_DEG,
  SORT_OPTION_ASC,
  SORT_OPTION_DESC,
  SORT_OPTION_NEW,
  TOAST_DURATION_MS,
} from '../Landing.const';
import type {
  AptFilterState,
  CarFilterState,
  LandingRoutePath,
  LandingPostKind,
  ThemeChoice,
  ViewMode,
  WebApartmentItem,
  WebCarItem,
  WebListingItem,
  AddressSuggestion,
  PostFormData,
} from '../Landing.types';

export function useLanding() {
  const t = useTranslate();
  const { user } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  // Route state
  const [routePath, setRoutePath] = useState<LandingRoutePath>('home');
  const [routeArg, setRouteArg] = useState<string>(EMPTY_STRING);

  // Listings data
  const [apartments, setApartments] = useState<WebApartmentItem[]>([]);
  const [cars, setCars] = useState<WebCarItem[]>([]);
  const [cities, setCities] = useState<string[]>(DEFAULT_CITIES);
  const [makers, setMakers] = useState<string[]>(DEFAULT_MAKERS);

  // Filters
  const [aptFilters, setAptFilters] = useState<AptFilterState>(DEFAULT_APT_FILTERS);
  const [carFilters, setCarFilters] = useState<CarFilterState>(DEFAULT_CAR_FILTERS);

  // Favorites
  const [favs, setFavs] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('nuvo-favs') || '[]'));
    } catch {
      return new Set();
    }
  });

  // UI state
  const [stripVisible, setStripVisible] = useState(BOOLEAN_TRUE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(BOOLEAN_FALSE);
  const [loginModalOpen, setLoginModalOpen] = useState(BOOLEAN_FALSE);
  const [contactModalOpen, setContactModalOpen] = useState(BOOLEAN_FALSE);
  const [toasts, setToasts] = useState<string[]>([]);
  const [selectedGalleryThumb, setSelectedGalleryThumb] = useState<number>(NUMBER_ZERO);
  const [phoneRevealed, setPhoneRevealed] = useState(BOOLEAN_FALSE);
  const [searchFocused, setSearchFocused] = useState(BOOLEAN_FALSE);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [aptViewMode, setAptViewMode] = useState<ViewMode>('gallery');
  const [view360Angle, setView360Angle] = useState(NUMBER_ZERO);
  const [autoRotate360, setAutoRotate360] = useState(BOOLEAN_FALSE);
  const [heroCarIndex, setHeroCarIndex] = useState(NUMBER_ZERO);

  // Menus & refs
  const [userMenuOpen, setUserMenuOpen] = useState(BOOLEAN_FALSE);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Bear mode & theme choice
  let bearModeCtx: { mode?: string; setMode?: (m: 'light' | 'dark') => void } = {};
  try {
    bearModeCtx = useBearMode();
  } catch {
    // Graceful fallback outside BearProvider
  }

  const [themeMode, setThemeMode] = useState<ThemeChoice>(() => {
    try {
      const saved = localStorage.getItem('clm-theme-choice');
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved as ThemeChoice;
    } catch {
      // Ignore
    }
    return 'light';
  });

  // Hero search form
  const [heroTab, setHeroTab] = useState<LandingPostKind>(POST_KIND_APT);
  const [smartQuery, setSmartQuery] = useState(EMPTY_STRING);
  const [heroDeal, setHeroDeal] = useState<string>(DEAL_TYPE_ALL);
  const [heroCity, setHeroCity] = useState(EMPTY_STRING);
  const [heroRooms, setHeroRooms] = useState(DEFAULT_HERO_ROOMS_VALUE);
  const [heroMaxPrice, setHeroMaxPrice] = useState(EMPTY_STRING);
  const [heroMaker, setHeroMaker] = useState(EMPTY_STRING);
  const [heroYear, setHeroYear] = useState(EMPTY_STRING);
  const [heroFuel, setHeroFuel] = useState(EMPTY_STRING);

  // Post form
  const [postForm, setPostForm] = useState<PostFormData>({
    kind: POST_KIND_APT,
    street: EMPTY_STRING,
    city: DEFAULT_CITIES[ZERO],
    deal: DEAL_TYPE_SALE,
    price: EMPTY_STRING,
    rooms: DEFAULT_POST_ROOMS,
    size: DEFAULT_POST_SIZE,
    maker: DEFAULT_MAKERS[ZERO],
    model: DEFAULT_POST_MODEL,
    year: DEFAULT_POST_YEAR,
    km: DEFAULT_POST_KM,
    fuel: DEFAULT_POST_FUEL,
    desc: EMPTY_STRING,
    terms: BOOLEAN_FALSE,
    loading: BOOLEAN_FALSE,
    priceError: BOOLEAN_FALSE,
  });

  const showToast = useCallback((msg: string) => {
    setToasts((prev) => [...prev, msg]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== msg));
    }, TOAST_DURATION_MS);
  }, []);

  const goTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const handleNavigateToHome = useCallback(() => goTo(LANDING_ROUTE_HOME), [goTo]);
  const handleNavigateToApartments = useCallback(() => goTo(LANDING_ROUTE_APARTMENTS), [goTo]);
  const handleNavigateToCars = useCallback(() => goTo(LANDING_ROUTE_CARS), [goTo]);
  const handleNavigateToPost = useCallback(() => goTo(LANDING_ROUTE_POST), [goTo]);
  const handleNavigateToDesign = useCallback(() => goTo(LANDING_ROUTE_DESIGN), [goTo]);

  const applyThemeMode = useCallback(
    (choice: ThemeChoice) => {
      let effective: 'light' | 'dark' = 'light';
      if (choice === 'system') {
        const prefersDark =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        effective = prefersDark ? 'dark' : 'light';
      } else {
        effective = choice;
      }
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = effective;
        document.documentElement.dataset.themeChoice = choice;
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(effective);
      }
      if (bearModeCtx && bearModeCtx.setMode) {
        try {
          bearModeCtx.setMode(effective);
        } catch {
          // Ignore
        }
      }
    },
    [bearModeCtx]
  );

  const cycleTheme = useCallback(() => {
    const next: ThemeChoice =
      themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'system' : 'light';
    setThemeMode(next);
    try {
      localStorage.setItem('clm-theme-choice', next);
    } catch {
      // Ignore
    }
    applyThemeMode(next);
    showToast(
      `${t('landing_themeLabel')} ${next === 'light' ? t('landing_themeLight') : next === 'dark' ? t('landing_themeDark') : t('landing_themeSystem')}`
    );
  }, [themeMode, applyThemeMode, showToast, t]);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavs((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          showToast(t('landing_removedFromFavs'));
        } else {
          next.add(id);
          showToast(t('landing_savedToFavs'));
        }
        try {
          localStorage.setItem('nuvo-favs', JSON.stringify([...next]));
        } catch {
          // Ignore
        }
        return next;
      });
    },
    [showToast, t]
  );

  // Rotation controls
  const rotate360Left = useCallback(() => {
    setView360Angle((a: number) => (a - ROTATION_STEP_DEG + FULL_ROTATION_DEG) % FULL_ROTATION_DEG);
  }, []);

  const rotate360Right = useCallback(() => {
    setView360Angle((a: number) => (a + ROTATION_STEP_DEG) % FULL_ROTATION_DEG);
  }, []);

  const toggleAutoRotate360 = useCallback(() => {
    setAutoRotate360((prev) => !prev);
  }, []);

  // Continuous auto-rotate effect
  useEffect(() => {
    if (!autoRotate360) return;
    const interval = setInterval(() => {
      setView360Angle((a: number) => (a + AUTO_ROTATE_STEP_DEG) % FULL_ROTATION_DEG);
    }, AUTO_ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [autoRotate360]);

  // Car banner model cycle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroCarIndex((i: number) => (i + 1) % HERO_CAR_CYCLE_COUNT);
    }, HERO_CAR_CYCLE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  // Outside click listener for menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced address search
  useEffect(() => {
    const q = smartQuery.trim();
    if (!searchFocused || q.length < MIN_SEARCH_LENGTH) {
      setAddressSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/property/addresses?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = await res.json();
          const list: AddressSuggestion[] = Array.isArray(data)
            ? data
            : Array.isArray(data.addresses)
            ? data.addresses
            : [];
          setAddressSuggestions(list.slice(NUMBER_ZERO, ADDRESS_SUGGESTION_LIMIT));
        }
      } catch {
        // Ignore
      }
    }, DEBOUNCE_SEARCH_MS);
    return () => clearTimeout(timer);
  }, [smartQuery, searchFocused]);

  // Load listings from mock/live backend
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/listings');
        if (res.ok) {
          const data = await res.json();
          if (data.apartments) setApartments(data.apartments);
          if (data.cars) setCars(data.cars);
          if (data.cities) setCities(data.cities);
          if (data.makers) setMakers(data.makers);
        }
      } catch {
        // Use in-memory fallbacks
      }
    }
    void loadData();
  }, []);

  // Legacy hash migration to clean HTML5 paths
  useEffect(() => {
    if (window.location.hash) {
      const cleanPath = window.location.hash.replace(/^#\/?/, '/');
      window.history.replaceState(null, EMPTY_STRING, cleanPath);
      navigate(cleanPath, { replace: BOOLEAN_TRUE });
    }
  }, [navigate]);

  // Sync routePath and routeArg from location.pathname
  useEffect(() => {
    const raw = location.pathname.replace(/^\//, EMPTY_STRING);
    const parts = raw.split('/').filter(Boolean);
    const primary = parts[ZERO] || EMPTY_STRING;
    const arg = parts[1] || EMPTY_STRING;

    if (!primary) {
      setRoutePath('home');
      setRouteArg(EMPTY_STRING);
    } else if (primary === 'item') {
      setRoutePath('item');
      setRouteArg(arg);
    } else if (
      primary === 'apartments' ||
      primary === 'cars' ||
      primary === 'favorites' ||
      primary === 'generals' ||
      primary === 'post' ||
      primary === 'design'
    ) {
      setRoutePath(primary as LandingRoutePath);
      setRouteArg(arg);
    } else {
      setRoutePath('home');
      setRouteArg(EMPTY_STRING);
    }

    window.scrollTo({ top: NUMBER_ZERO, behavior: 'smooth' });
    setSelectedGalleryThumb(NUMBER_ZERO);
    setPhoneRevealed(BOOLEAN_FALSE);
  }, [location.pathname]);

  // Find currently viewed item
  const currentDetailItem = useMemo<WebListingItem | null>(() => {
    if (routePath !== 'item' || !routeArg) return null;
    return (
      apartments.find((a) => a.id === routeArg) ||
      cars.find((c) => c.id === routeArg) ||
      null
    );
  }, [routePath, routeArg, apartments, cars]);

  // Dynamic social & SEO meta tag updates
  useEffect(() => {
    if (!currentDetailItem) {
      updateSocialMetaTags();
      return;
    }
    const itemTitle =
      currentDetailItem.cat === POST_KIND_CAR
        ? `${currentDetailItem.maker} ${currentDetailItem.model} (${currentDetailItem.year})`
        : `${currentDetailItem.rooms} חדרים, ${currentDetailItem.street}, ${currentDetailItem.city}`;

    updateSocialMetaTags({
      title: itemTitle,
      desc: currentDetailItem.desc,
      imageUrl: currentDetailItem.imageUrl,
      url: typeof window !== 'undefined' ? window.location.href : EMPTY_STRING,
      price: currentDetailItem.price,
      type: currentDetailItem.cat === POST_KIND_CAR ? 'Product' : 'SingleFamilyResidence',
    });
  }, [currentDetailItem]);

  // Smart search submit handler
  const handleSmartSearch = useCallback(
    async (q: string) => {
      const query = q.trim();
      if (!query) {
        goTo('/apartments');
        return;
      }
      try {
        const res = await fetch('/api/listings/ai-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        if (res.ok) {
          const matched = await res.json();
          if (matched.category === POST_KIND_CAR) {
            if (matched.maker) setCarFilters((p) => ({ ...p, maker: matched.maker }));
            if (matched.maxPrice) setCarFilters((p) => ({ ...p, max: String(matched.maxPrice) }));
            goTo('/cars');
          } else {
            if (matched.city) setAptFilters((p) => ({ ...p, city: matched.city }));
            if (matched.rooms) setAptFilters((p) => ({ ...p, rooms: matched.rooms }));
            if (matched.deal) setAptFilters((p) => ({ ...p, deal: matched.deal }));
            goTo('/apartments');
          }
          showToast(`${t('landing_smartSearchPrefix')} "${query}"`);
          return;
        }
      } catch {
        // Fallback
      }

      // Local keyword matching
      const isCarQuery =
        makers.some((m) => query.includes(m)) ||
        CAR_QUERY_KEYWORDS.some((w) => query.includes(w));

      if (isCarQuery) {
        const foundMaker = makers.find((m) => query.includes(m));
        if (foundMaker) setCarFilters((p) => ({ ...p, maker: foundMaker }));
        goTo('/cars');
      } else {
        const foundCity = cities.find((c) => query.includes(c));
        if (foundCity) setAptFilters((p) => ({ ...p, city: foundCity }));
        goTo('/apartments');
      }
      showToast(`${t('landing_searchPrefix')} ${query}`);
    },
    [makers, cities, goTo, showToast, t]
  );

  const onSmartSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearchFocused(BOOLEAN_FALSE);
      void handleSmartSearch(smartQuery);
    },
    [handleSmartSearch, smartQuery]
  );

  const handleHeroSearch = useCallback(() => {
    if (heroTab === POST_KIND_APT) {
      setAptFilters({
        deal: heroDeal as AptFilterState['deal'],
        city: heroCity,
        rooms: Number(heroRooms) || NUMBER_ZERO,
        max: heroMaxPrice,
        feats: [],
        sort: SORT_OPTION_NEW,
      });
      goTo('/apartments');
    } else {
      setCarFilters({
        maker: heroMaker,
        year: heroYear,
        max: heroMaxPrice,
        fuel: heroFuel,
        gear: EMPTY_STRING,
        sort: SORT_OPTION_NEW,
      });
      goTo('/cars');
    }
  }, [heroTab, heroDeal, heroCity, heroRooms, heroMaxPrice, heroMaker, heroYear, heroFuel, goTo]);

  const handleSetPostKindApt = useCallback(() => {
    setPostForm((p) => ({ ...p, kind: POST_KIND_APT }));
  }, []);

  const handleSetPostKindCar = useCallback(() => {
    setPostForm((p) => ({ ...p, kind: POST_KIND_CAR }));
  }, []);

  const onSelectAddress = useCallback(
    (item: AddressSuggestion) => {
      setSmartQuery(item.street ? `${item.street}, ${item.city}` : item.city);
      setSearchFocused(BOOLEAN_FALSE);
      setAptFilters((p) => ({ ...p, city: item.city }));
      goTo('/apartments');
    },
    [goTo]
  );

  // Filtered lists
  const filteredApartments = useMemo(() => {
    return apartments
      .filter((a) => {
        if (aptFilters.deal !== DEAL_TYPE_ALL && a.deal !== aptFilters.deal) return BOOLEAN_FALSE;
        if (aptFilters.city && a.city !== aptFilters.city) return BOOLEAN_FALSE;
        if (aptFilters.rooms > NUMBER_ZERO && a.rooms !== aptFilters.rooms) return BOOLEAN_FALSE;
        if (aptFilters.max && a.price > Number(aptFilters.max)) return BOOLEAN_FALSE;
        if (aptFilters.feats.length > NUMBER_ZERO && !aptFilters.feats.every((f) => a.feats.includes(f)))
          return BOOLEAN_FALSE;
        return BOOLEAN_TRUE;
      })
      .sort((a, b) => {
        if (aptFilters.sort === SORT_OPTION_ASC) return a.price - b.price;
        if (aptFilters.sort === SORT_OPTION_DESC) return b.price - a.price;
        return NUMBER_ZERO;
      });
  }, [apartments, aptFilters]);

  const filteredCars = useMemo(() => {
    return cars
      .filter((c) => {
        if (carFilters.maker && c.maker !== carFilters.maker) return BOOLEAN_FALSE;
        if (carFilters.year && c.year !== Number(carFilters.year)) return BOOLEAN_FALSE;
        if (carFilters.max && c.price > Number(carFilters.max)) return BOOLEAN_FALSE;
        if (carFilters.fuel && c.fuel !== carFilters.fuel) return BOOLEAN_FALSE;
        if (carFilters.gear && c.gear !== carFilters.gear) return BOOLEAN_FALSE;
        return BOOLEAN_TRUE;
      })
      .sort((a, b) => {
        if (carFilters.sort === SORT_OPTION_ASC) return a.price - b.price;
        if (carFilters.sort === SORT_OPTION_DESC) return b.price - a.price;
        return NUMBER_ZERO;
      });
  }, [cars, carFilters]);

  const favoritesList = useMemo(() => {
    const allItems: WebListingItem[] = [...apartments, ...cars];
    return allItems.filter((i) => favs.has(i.id));
  }, [apartments, cars, favs]);

  return {
    user,
    navigate,
    location,
    routePath,
    routeArg,
    apartments,
    cars,
    cities,
    makers,
    aptFilters,
    setAptFilters,
    carFilters,
    setCarFilters,
    favs,
    toggleFavorite,
    favoritesList,
    stripVisible,
    setStripVisible,
    mobileMenuOpen,
    setMobileMenuOpen,
    loginModalOpen,
    setLoginModalOpen,
    contactModalOpen,
    setContactModalOpen,
    toasts,
    showToast,
    selectedGalleryThumb,
    setSelectedGalleryThumb,
    phoneRevealed,
    setPhoneRevealed,
    searchFocused,
    setSearchFocused,
    addressSuggestions,
    aptViewMode,
    setAptViewMode,
    view360Angle,
    setView360Angle,
    autoRotate360,
    toggleAutoRotate360,
    rotate360Left,
    rotate360Right,
    heroCarIndex,
    userMenuOpen,
    setUserMenuOpen,
    userMenuRef,
    searchBoxRef,
    themeMode,
    cycleTheme,
    heroTab,
    setHeroTab,
    smartQuery,
    setSmartQuery,
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
    postForm,
    setPostForm,
    handleSmartSearch,
    onSmartSearchSubmit,
    handleHeroSearch,
    handleSetPostKindApt,
    handleSetPostKindCar,
    onSelectAddress,
    goTo,
    handleNavigateToHome,
    handleNavigateToApartments,
    handleNavigateToCars,
    handleNavigateToPost,
    handleNavigateToDesign,
    currentDetailItem,
    filteredApartments,
    filteredCars,
  };
}
