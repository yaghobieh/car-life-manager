import { describe, expect, it } from 'vitest';
import { TWILIO_NUMBERS_URL, TWILIO_SIGNUP_URL } from '@const';
import { profileErrorKey, smsActionHref, smsActionLabelKey, smsHelpKey, smsTestResultKey } from './Settings.utils';

describe('profileErrorKey', () => {
  it('maps username and phone codes', () => {
    expect(profileErrorKey('username_taken')).toBe('authUsernameTaken');
    expect(profileErrorKey('invalid_username')).toBe('authInvalidUsername');
    expect(profileErrorKey('invalid_phone')).toBe('invalidPhone');
  });
});

describe('smsHelpKey', () => {
  it('prefers ready, then account without a from number', () => {
    expect(smsHelpKey(true, true)).toBe('notifySmsReady');
    expect(smsHelpKey(true, true, false)).toBe('smsNeedPhone');
    expect(smsHelpKey(false, true)).toBe('smsFromNumberMissing');
    expect(smsHelpKey(false, false)).toBe('smsSignupHelp');
  });
});

describe('smsActionHref', () => {
  it('hides the link when SMS can send', () => {
    expect(smsActionHref(true, true)).toBeNull();
    expect(smsActionHref(false, true)).toBe(TWILIO_NUMBERS_URL);
    expect(smsActionHref(false, false)).toBe(TWILIO_SIGNUP_URL);
  });
});

describe('smsTestResultKey', () => {
  it('maps Twilio outcomes without inventing a send', () => {
    expect(smsTestResultKey('sent')).toBe('smsTestSent');
    expect(smsTestResultKey('failed')).toBe('smsTestFailed');
    expect(smsTestResultKey('skipped')).toBe('smsTestSkipped');
  });
});

describe('smsActionLabelKey', () => {
  it('uses the buy-number label when only the from number is missing', () => {
    expect(smsActionLabelKey(false, true)).toBe('smsBuyNumberCta');
  });
});
