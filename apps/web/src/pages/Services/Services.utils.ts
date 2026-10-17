export { connectedServiceCount } from '@tavo/sdk';
import {
  EXPENSE_CATEGORY_INSURANCE,
  EXPENSE_CATEGORY_PARKING,
  EXPENSE_CATEGORY_TOLLS,
  PROVIDER_STATUS_CONNECTED,
  PROVIDER_STATUS_OFFICIAL,
} from '@const';
import {
  CATEGORY_INSURANCE,
  CATEGORY_PARKING,
  CATEGORY_TOLL,
  KEY_ACTIVE,
  KEY_MANUAL,
  KEY_NOT_SUPPORTED,
  KEY_OFFICIAL,
  TONE_BAD,
  TONE_GOOD,
  TONE_WARN,
} from './Services.const';
import type { ServiceTone } from './Services.types';

export { SERVICE_ANSWERS } from './Services.const';

export function receiptCategory(category: string): string {
  if (category === CATEGORY_TOLL) {
    return EXPENSE_CATEGORY_TOLLS;
  }
  if (category === CATEGORY_INSURANCE) {
    return EXPENSE_CATEGORY_INSURANCE;
  }
  return EXPENSE_CATEGORY_PARKING;
}

export function serviceTone(status: string, category: string): ServiceTone {
  if (status === PROVIDER_STATUS_OFFICIAL || status === PROVIDER_STATUS_CONNECTED) {
    return TONE_GOOD;
  }
  if (category === CATEGORY_PARKING) {
    return TONE_WARN;
  }
  return TONE_BAD;
}

export function serviceToneLabelKey(status: string, category: string): string {
  if (status === PROVIDER_STATUS_OFFICIAL) {
    return KEY_OFFICIAL;
  }
  if (status === PROVIDER_STATUS_CONNECTED) {
    return KEY_ACTIVE;
  }
  if (category === CATEGORY_PARKING) {
    return KEY_MANUAL;
  }
  return KEY_NOT_SUPPORTED;
}
