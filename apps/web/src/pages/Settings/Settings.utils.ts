import { TWILIO_NUMBERS_URL, TWILIO_SIGNUP_URL } from '@const';

export function smsHelpKey(smsNotifyReady: boolean, smsAccountReady: boolean): string {
  if (smsNotifyReady) return 'notifySmsReady';
  if (smsAccountReady) return 'smsFromNumberMissing';
  return 'smsSignupHelp';
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
