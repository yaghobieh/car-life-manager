import { describe, expect, it } from 'vitest';
import { emailHelpKey, emailTestResultKey, profileErrorKey, smsHelpKey, smsTestResultKey } from './Settings.utils';

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
    expect(smsHelpKey(false, false)).toBe('notifySmsMissing');
  });
});

describe('emailHelpKey', () => {
  it('prefers ready, then a missing account email', () => {
    expect(emailHelpKey(true)).toBe('notifyEmailReady');
    expect(emailHelpKey(true, false)).toBe('emailNeedAddress');
    expect(emailHelpKey(false)).toBe('notifyEmailMissing');
  });
});

describe('smsTestResultKey', () => {
  it('maps SMS outcomes without inventing a send', () => {
    expect(smsTestResultKey('sent')).toBe('smsTestSent');
    expect(smsTestResultKey('failed')).toBe('smsTestFailed');
    expect(smsTestResultKey('skipped')).toBe('smsTestSkipped');
  });
});

describe('emailTestResultKey', () => {
  it('maps email outcomes without inventing a send', () => {
    expect(emailTestResultKey('sent')).toBe('emailTestSent');
    expect(emailTestResultKey('failed')).toBe('emailTestFailed');
    expect(emailTestResultKey('skipped')).toBe('emailTestSkipped');
  });
});
