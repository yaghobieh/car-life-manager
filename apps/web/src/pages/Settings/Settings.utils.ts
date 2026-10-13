import { NOTIFY_TEST_FAILED, NOTIFY_TEST_SENT } from './Settings.const';

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
  return 'notifySmsMissing';
}

export function emailHelpKey(emailNotifyReady: boolean, hasEmail = true): string {
  if (emailNotifyReady && !hasEmail) return 'emailNeedAddress';
  if (emailNotifyReady) return 'notifyEmailReady';
  return 'notifyEmailMissing';
}

export function smsTestResultKey(status: string): string {
  if (status === NOTIFY_TEST_SENT) return 'smsTestSent';
  if (status === NOTIFY_TEST_FAILED) return 'smsTestFailed';
  return 'smsTestSkipped';
}

export function emailTestResultKey(status: string): string {
  if (status === NOTIFY_TEST_SENT) return 'emailTestSent';
  if (status === NOTIFY_TEST_FAILED) return 'emailTestFailed';
  return 'emailTestSkipped';
}
