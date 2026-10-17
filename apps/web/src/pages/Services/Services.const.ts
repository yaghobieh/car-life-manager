import type { ServiceAnswer } from '@clm/shared';
import {
  SERVICE_ANSWER_NO,
  SERVICE_ANSWER_UNSURE,
  SERVICE_ANSWER_YES,
} from '@const';

export const CATEGORY_TOLL = 'toll';
export const CATEGORY_PARKING = 'parking';
export const CATEGORY_INSURANCE = 'insurance';

export const TONE_GOOD = 'good';
export const TONE_BAD = 'bad';
export const TONE_WARN = 'warn';

export const KEY_SERVICES = 'services';
export const KEY_PAGE_SUB_SERVICES = 'pageSubServices';
export const KEY_NO_SERVICES = 'noServices';
export const KEY_NO_SERVICES_BODY = 'noServicesBody';
export const KEY_OFFICIAL_AUTHORITIES = 'officialAuthorities';
export const KEY_TOLL_AND_PARKING = 'tollAndParking';
export const KEY_INSURANCE = 'insurance';
export const KEY_OFFICIAL_SITE = 'officialSite';
export const KEY_CONNECT = 'connect';
export const KEY_OFFICIAL = 'official';
export const KEY_ACTIVE = 'active';
export const KEY_MANUAL = 'manual';
export const KEY_NOT_SUPPORTED = 'notSupported';

export const KEY_ANSWER_YES = 'answerYes';
export const KEY_ANSWER_NO = 'answerNo';
export const KEY_ANSWER_UNSURE = 'answerUnsure';

export const SERVICE_ANSWERS: Array<{ value: ServiceAnswer; labelKey: string }> = [
  { value: SERVICE_ANSWER_YES, labelKey: KEY_ANSWER_YES },
  { value: SERVICE_ANSWER_NO, labelKey: KEY_ANSWER_NO },
  { value: SERVICE_ANSWER_UNSURE, labelKey: KEY_ANSWER_UNSURE },
];
