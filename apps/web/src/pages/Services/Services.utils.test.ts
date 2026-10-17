import { describe, expect, it } from 'vitest';
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
import { receiptCategory, serviceTone, serviceToneLabelKey } from './Services.utils';

describe('Services.utils', () => {
  it('maps categories to expense categories correctly', () => {
    expect(receiptCategory(CATEGORY_TOLL)).toBe(EXPENSE_CATEGORY_TOLLS);
    expect(receiptCategory(CATEGORY_INSURANCE)).toBe(EXPENSE_CATEGORY_INSURANCE);
    expect(receiptCategory(CATEGORY_PARKING)).toBe(EXPENSE_CATEGORY_PARKING);
    expect(receiptCategory('other')).toBe(EXPENSE_CATEGORY_PARKING);
  });

  it('determines service tones accurately', () => {
    expect(serviceTone(PROVIDER_STATUS_OFFICIAL, CATEGORY_TOLL)).toBe(TONE_GOOD);
    expect(serviceTone(PROVIDER_STATUS_CONNECTED, CATEGORY_PARKING)).toBe(TONE_GOOD);
    expect(serviceTone('not_supported', CATEGORY_PARKING)).toBe(TONE_WARN);
    expect(serviceTone('not_supported', CATEGORY_TOLL)).toBe(TONE_BAD);
    expect(serviceTone('not_supported', CATEGORY_INSURANCE)).toBe(TONE_BAD);
  });

  it('resolves correct translation keys for service tones', () => {
    expect(serviceToneLabelKey(PROVIDER_STATUS_OFFICIAL, CATEGORY_TOLL)).toBe(KEY_OFFICIAL);
    expect(serviceToneLabelKey(PROVIDER_STATUS_CONNECTED, CATEGORY_PARKING)).toBe(KEY_ACTIVE);
    expect(serviceToneLabelKey('not_supported', CATEGORY_PARKING)).toBe(KEY_MANUAL);
    expect(serviceToneLabelKey('not_supported', CATEGORY_TOLL)).toBe(KEY_NOT_SUPPORTED);
  });
});
