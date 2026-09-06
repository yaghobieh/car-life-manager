import {
  EXPENSE_CATEGORY_INSURANCE,
  EXPENSE_CATEGORY_PARKING,
  EXPENSE_CATEGORY_TOLLS,
  PROVIDER_STATUS_CONNECTED,
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

export const SERVICE_ANSWERS: Array<{ value: ServiceAnswer; labelKey: string }> = [
  { value: SERVICE_ANSWER_YES, labelKey: 'answerYes' },
  { value: SERVICE_ANSWER_NO, labelKey: 'answerNo' },
  { value: SERVICE_ANSWER_UNSURE, labelKey: 'answerUnsure' },
];
