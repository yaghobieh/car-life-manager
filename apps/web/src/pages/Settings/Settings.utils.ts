import { TWILIO_NUMBERS_URL, TWILIO_SIGNUP_URL } from '@const';

export const PROFILE_ERROR_KEYS: Record<string, string> = {
  invalid_phone: 'invalidPhone',
  username_taken: 'authUsernameTaken',
  invalid_username: 'authInvalidUsername',
};

export function profileErrorKey(code?: string): string {
  if (!code) return 'invalidPhone';
  return PROFILE_ERROR_KEYS[code] ?? 'invalidPhone';
}

export function smsHelpKey(smsNotifyReady: boolean, smsAccountReady: boolean, hasPhone = true): string {
  if (smsNotifyReady && !hasPhone) return 'smsNeedPhone';
  if (smsNotifyReady) return 'notifySmsReady';
  if (smsAccountReady) return 'smsFromNumberMissing';
  return 'smsSignupHelp';
}

export function smsTestResultKey(status: string): string {
  if (status === 'sent') return 'smsTestSent';
  if (status === 'failed') return 'smsTestFailed';
  return 'smsTestSkipped';
}

export function smsActionLabelKey(smsNotifyReady: boolean, smsAccountReady: boolean): string | null {
  if (smsNotifyReady) return null;
  if (smsAccountReady) return 'smsBuyNumberCta';
  return 'smsSignupCta';
}

export function smsActionHref(smsNotifyReady: boolean, smsAccountReady: boolean): string | null {
  if (smsNotifyReady) return null;
  if (smsAccountReady) return TWILIO_NUMBERS_URL;
  return TWILIO_SIGNUP_URL;
}
