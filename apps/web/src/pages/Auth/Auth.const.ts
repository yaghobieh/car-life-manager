export const AUTH_MODE_LOGIN = 'login';
export const AUTH_MODE_REGISTER = 'register';
export const AUTH_ERROR_QUERY = 'error';
export const AUTH_ERROR_KEYS: Record<string, string> = {
  email_taken: 'authEmailTaken',
  password_short: 'authPasswordShort',
  invalid_email: 'authInvalidEmail',
  google_unavailable: 'authGoogleUnavailable',
  google_failed: 'authGoogleFailed',
  auth0_unavailable: 'authAuth0Unavailable',
  auth0_failed: 'authAuth0Failed',
};
