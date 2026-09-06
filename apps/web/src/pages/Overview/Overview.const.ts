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
