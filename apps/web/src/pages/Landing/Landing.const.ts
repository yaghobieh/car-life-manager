import {
  BOOLEAN_TRUE,
  PRODUCT_ID_CAR,
  PRODUCT_ID_PROPERTY,
  PROPERTY_PRODUCT_ENABLED,
  ROUTE_CAR,
  ROUTE_PROPERTY,
  SVG_PRODUCT_CAR,
  SVG_PRODUCT_PROPERTY,
} from '@const';

export const LANDING_CATEGORY_CAR = 'car';
export const LANDING_CATEGORY_EXISTING = 'existing';
export const LANDING_CATEGORY_INTEREST = 'interest';

export const LANDING_CATEGORIES = [
  { id: LANDING_CATEGORY_CAR, labelKey: 'productCarTitle' },
  { id: LANDING_CATEGORY_EXISTING, labelKey: 'homeIntentExisting' },
  { id: LANDING_CATEGORY_INTEREST, labelKey: 'homeIntentInterest' },
] as const;

export const LANDING_STEPS = [
  { step: '1', labelKey: 'howStep1' },
  { step: '2', labelKey: 'howStep2' },
  { step: '3', labelKey: 'howStep3' },
] as const;

export const LANDING_FEATURES = [
  'tasks',
  'documents',
  'services',
  'expenses',
  'maintenance',
  'reminders',
] as const;

export const LANDING_PRODUCTS = [
  {
    id: PRODUCT_ID_CAR,
    to: ROUTE_CAR,
    iconSrc: SVG_PRODUCT_CAR,
    titleKey: 'productCarTitle',
    bodyKey: 'productCarBody',
    ctaKey: 'productCarCta',
    enabled: BOOLEAN_TRUE,
  },
  {
    id: PRODUCT_ID_PROPERTY,
    to: ROUTE_PROPERTY,
    iconSrc: SVG_PRODUCT_PROPERTY,
    titleKey: 'productPropertyTitle',
    bodyKey: 'productPropertyBody',
    ctaKey: PROPERTY_PRODUCT_ENABLED ? 'productPropertyCta' : 'productPropertySoon',
    enabled: PROPERTY_PRODUCT_ENABLED,
  },
];

export const FEATS: Record<string, [string, string]> = {
  parking: ['landing_featParking', 'parking'],
  elevator: ['landing_featElevator', 'elevator'],
  balcony: ['landing_featBalcony', 'sun'],
  safe: ['landing_featSafe', 'shield'],
};

export const EMPTY_STRING = '';
export const NUMBER_ZERO = 0;
export const EMPTY_COUNT = 0;
export const POST_MOCK_TIMEOUT_MS = 900;

export const DEAL_TYPE_ALL = 'all';
export const DEAL_TYPE_SALE = 'sale';
export const DEAL_TYPE_RENT = 'rent';

export const SORT_OPTION_NEW = 'new';
export const SORT_OPTION_ASC = 'asc';
export const SORT_OPTION_DESC = 'desc';

export const POST_KIND_APT = 'apt';
export const POST_KIND_CAR = 'car';

export const PREVIEW_ID_APT = 'preview';
export const PREVIEW_ID_CAR = 'previewc';
export const DEFAULT_PREVIEW_COLOR = '#4766DB';

export const DEFAULT_PREVIEW_ROOMS = 3;
export const DEFAULT_PREVIEW_SIZE = 80;
export const DEFAULT_PREVIEW_FLOOR = 2;
export const DEFAULT_PREVIEW_FLOORS = 5;
export const DEFAULT_PREVIEW_YEAR = 2022;
export const DEFAULT_PREVIEW_KM = 45000;
export const DEFAULT_PREVIEW_HAND = 1;
export const DEFAULT_PREVIEW_PRICE = 0;

export const DEFAULT_POST_ROOMS = '3';
export const DEFAULT_POST_SIZE = '80';
export const DEFAULT_POST_MODEL = 'קורולה';
export const DEFAULT_POST_YEAR = '2021';
export const DEFAULT_POST_KM = '50000';
export const DEFAULT_POST_FUEL = 'בנזין';

export const TOAST_DURATION_MS = 3200;
export const ROTATION_STEP_DEG = 15;
export const FULL_ROTATION_DEG = 360;
export const AUTO_ROTATE_STEP_DEG = 3;
export const AUTO_ROTATE_INTERVAL_MS = 60;
export const HERO_CAR_CYCLE_COUNT = 5;
export const HERO_CAR_CYCLE_INTERVAL_MS = 4000;
export const ADDRESS_SUGGESTION_LIMIT = 10;
export const DEBOUNCE_SEARCH_MS = 120;
export const MIN_SEARCH_LENGTH = 1;
export const CAR_QUERY_KEYWORDS = ['רכב', 'ק״מ', 'אוטו', 'מנוע', 'יד', 'היברידי', 'בנזין'] as const;
export const DEFAULT_HERO_ROOMS_VALUE = '0';

export const LANDING_ROUTE_HOME = '/';
export const LANDING_ROUTE_APARTMENTS = '/apartments';
export const LANDING_ROUTE_CARS = '/cars';
export const LANDING_ROUTE_POST = '/post';
export const LANDING_ROUTE_DESIGN = '/design';

export const DEFAULT_APT_FILTERS = {
  deal: DEAL_TYPE_ALL as 'all',
  city: EMPTY_STRING,
  rooms: NUMBER_ZERO,
  max: EMPTY_STRING,
  feats: [] as string[],
  sort: SORT_OPTION_NEW as 'new',
};

export const DEFAULT_CAR_FILTERS = {
  maker: EMPTY_STRING,
  year: EMPTY_STRING,
  max: EMPTY_STRING,
  fuel: EMPTY_STRING,
  gear: EMPTY_STRING,
  sort: SORT_OPTION_NEW as 'new',
};

export const DEFAULT_CITIES = [
  'תל אביב',
  'ירושלים',
  'חיפה',
  'ראשון לציון',
  'פתח תקווה',
  'נתניה',
  'באר שבע',
  'רמת גן',
  'הרצליה',
  'חולון',
  'צפת',
  'אשדוד',
  'בת ים',
];

export const DEFAULT_MAKERS = [
  'טויוטה',
  'מאזדה',
  'יונדאי',
  'קיה',
  'סקודה',
  'טסלה',
  'הונדה',
  'סוזוקי',
  'פיג׳ו',
  'מרצדס',
  'סיאט',
  'BYD',
];

export const FUELS = ['בנזין', 'חשמלי', 'היברידי'];

export const HOME_SECTION_ITEMS_LIMIT = 4;
export const GEAR_AUTO = 'אוטומט';
export const GEAR_MANUAL = 'ידני';

export const ROOM_FILTER_OPTIONS = [0, 2, 3, 4, 5] as const;
export const YEAR_FILTER_OPTIONS = [2024, 2023, 2022, 2021, 2020, 2018, 2016] as const;
export const POST_ROOMS_OPTIONS = [1, 2, 3, 3.5, 4, 5, 6] as const;
export const DEAL_TYPE_OPTIONS = [DEAL_TYPE_ALL, DEAL_TYPE_SALE, DEAL_TYPE_RENT] as const;
export const SORT_OPTIONS = [SORT_OPTION_NEW, SORT_OPTION_ASC, SORT_OPTION_DESC] as const;

