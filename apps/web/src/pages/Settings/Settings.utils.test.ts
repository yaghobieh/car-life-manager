import { describe, expect, it } from 'vitest';
import { TWILIO_NUMBERS_URL, TWILIO_SIGNUP_URL } from '@const';
import { smsActionHref, smsActionLabelKey, smsHelpKey } from './Settings.utils';

describe('smsHelpKey', () => {
  it('prefers ready, then account without a from number', () => {
    expect(smsHelpKey(true, true)).toBe('notifySmsReady');
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

describe('smsActionLabelKey', () => {
  it('uses the buy-number label when only the from number is missing', () => {
    expect(smsActionLabelKey(false, true)).toBe('smsBuyNumberCta');
  });
});
