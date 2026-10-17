import {
  COLOR_DANGER,
  COLOR_GREEN,
  COLOR_MUTED,
  COLOR_WARNING,
  STATUS_KIND_ACTION,
  STATUS_KIND_ATTENTION,
  STATUS_KIND_EXPIRED,
  STATUS_KIND_HEALTHY,
  STATUS_KIND_UNKNOWN,
} from '@const';

export const OVERVIEW_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const OVERVIEW_VIEW_LOADING = 'loading';
export const OVERVIEW_VIEW_EMPTY = 'empty';
export const OVERVIEW_VIEW_READY = 'ready';

export const COMPARE_FIELD_KEYS = [
  'plate',
  'make',
  'model',
  'year',
  'color',
  'fuel',
  'hand',
  'ownershipType',
  'licenseExpiry',
  'test',
] as const;

export const STATUS_KIND_COLOR = {
  [STATUS_KIND_HEALTHY]: COLOR_GREEN,
  [STATUS_KIND_ATTENTION]: COLOR_WARNING,
  [STATUS_KIND_ACTION]: COLOR_DANGER,
  [STATUS_KIND_EXPIRED]: COLOR_DANGER,
  [STATUS_KIND_UNKNOWN]: COLOR_MUTED,
} as const;

export const OVERVIEW_TONE_GOOD = 'good';
export const OVERVIEW_TONE_BAD = 'bad';
export const OVERVIEW_TONE_WARN = 'warn';

export const KEY_LICENSE_VALID_SHORT = 'licenseValidShort';
export const KEY_TEST_VALID_SHORT = 'testValidShort';
export const KEY_INSURANCE_DISCONNECTED = 'insuranceDisconnected';

export const KEY_HAND = 'hand';
export const KEY_COLOR = 'color';
export const KEY_ROAD_ENTRY = 'roadEntry';
export const KEY_UNKNOWN = 'unknown';

export const KEY_LICENSE = 'license';
export const KEY_TEST = 'test';
export const KEY_INSURANCE = 'insurance';
export const KEY_THIS_MONTH = 'thisMonth';
export const KEY_VALID_UNTIL = 'validUntil';
export const KEY_LAST_TEST_ON = 'lastTestOn';
export const KEY_NO_INSURANCE_OFFICIAL = 'noInsuranceOfficial';
export const KEY_INSURANCE_HELP_NOTE = 'insuranceHelpNote';
export const KEY_OFFICIAL_SITE = 'officialSite';
export const KEY_SERVICES = 'services';
export const KEY_LEFTOVER = 'leftover';
export const KEY_NO_TASKS = 'noTasks';
export const KEY_LEFTOVER_HELP = 'leftoverHelp';
export const KEY_VIEW_ALL = 'viewAll';
export const KEY_ACTIVE_VEHICLE = 'activeVehicle';
export const KEY_OVERVIEW = 'overview';
export const KEY_PAGE_SUB_OVERVIEW = 'pageSubOverview';
export const KEY_NO_VEHICLES = 'noVehicles';
export const KEY_NO_VEHICLES_BODY = 'noVehiclesBody';
export const KEY_ADD_VEHICLE = 'addVehicle';
export const KEY_LOADING = 'loading';
export const KEY_PROVIDER_NOTE_INSURANCE = 'providerNote_mandatory_insurance';
export const KEY_PAYMENTS_COUNT = 'paymentsCount';
export const KEY_EXPENSE_NOTE_DEFAULT = 'expenseNoteDefault';
export const KEY_STATUS_PREFIX = 'status_';
export const KEY_EXPENSE_PREFIX = 'expense_';
