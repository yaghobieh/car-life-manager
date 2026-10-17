import {
  PROPERTY_PRODUCT_ENABLED,
  ROLE_BROKER,
  ROLE_CAR_SELLER,
  ROLE_LAWYER,
  ROLE_OWNER,
  ROLE_RENTER,
  ROLE_SELLER,
} from '@const';

export const AUTH_MODE_LOGIN = 'login';
export const AUTH_MODE_REGISTER = 'register';
export const AUTH_ROLE_OPTIONS_PROPERTY = [
  ROLE_OWNER,
  ROLE_SELLER,
  ROLE_RENTER,
  ROLE_BROKER,
  ROLE_LAWYER,
  ROLE_CAR_SELLER,
] as const;
export const AUTH_ROLE_OPTIONS_CAR = [ROLE_OWNER, ROLE_CAR_SELLER] as const;
export const AUTH_ROLE_OPTIONS = PROPERTY_PRODUCT_ENABLED ? AUTH_ROLE_OPTIONS_PROPERTY : AUTH_ROLE_OPTIONS_CAR;
export const AUTH_DEFAULT_ROLE = ROLE_OWNER;
export const PROPERTY_AUTH_ROLES = [
  ROLE_OWNER,
  ROLE_SELLER,
  ROLE_RENTER,
  ROLE_BROKER,
  ROLE_LAWYER,
] as const;

export const ROLE_LABEL_KEYS: Record<string, string> = {
  [ROLE_OWNER]: PROPERTY_PRODUCT_ENABLED ? 'roleOwner' : 'roleCarOwner',
  [ROLE_SELLER]: 'roleSeller',
  [ROLE_RENTER]: 'roleRenter',
  [ROLE_BROKER]: 'roleBroker',
  [ROLE_LAWYER]: 'roleLawyer',
  [ROLE_CAR_SELLER]: 'roleCarSeller',
};
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
