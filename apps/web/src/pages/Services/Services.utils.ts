import {
  EXPENSE_CATEGORY_INSURANCE,
  EXPENSE_CATEGORY_PARKING,
  EXPENSE_CATEGORY_TOLLS,
  PROVIDER_STATUS_CONNECTED,
  PROVIDER_STATUS_OFFICIAL,
  SERVICE_ANSWER_NO,
  SERVICE_ANSWER_UNSURE,
  SERVICE_ANSWER_YES,
} from '@const';
import type { ServiceAnswer } from '@clm/shared';

export function receiptCategory(category: string): string {
  if (category === 'toll') return EXPENSE_CATEGORY_TOLLS;
  if (category === 'insurance') return EXPENSE_CATEGORY_INSURANCE;
  return EXPENSE_CATEGORY_PARKING;
}

export function connectedServiceCount(services: Array<{ status: string }>): number {
  return services.filter((service) => service.status === PROVIDER_STATUS_CONNECTED).length;
}

export function serviceTone(status: string, category: string): 'good' | 'bad' | 'warn' {
  if (status === PROVIDER_STATUS_OFFICIAL || status === PROVIDER_STATUS_CONNECTED) return 'good';
  if (category === 'parking') return 'warn';
  return 'bad';
}

export function serviceToneLabelKey(status: string, category: string): string {
  if (status === PROVIDER_STATUS_OFFICIAL) return 'official';
  if (status === PROVIDER_STATUS_CONNECTED) return 'active';
  if (category === 'parking') return 'manual';
  return 'notSupported';
}

export const SERVICE_ANSWERS: Array<{ value: ServiceAnswer; labelKey: string }> = [
  { value: SERVICE_ANSWER_YES, labelKey: 'answerYes' },
  { value: SERVICE_ANSWER_NO, labelKey: 'answerNo' },
  { value: SERVICE_ANSWER_UNSURE, labelKey: 'answerUnsure' },
];
