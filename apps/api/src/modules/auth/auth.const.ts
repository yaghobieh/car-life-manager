export const SESSION_COOKIE = "clm_session";
export const OAUTH_STATE_COOKIE = "clm_oauth_state";
export const AUTH_NEXT_COOKIE = "clm_auth_next";
export const AUTH_NEXT_QUERY = "next";
export const SAFE_PATH_CAR = "/car";
export const SAFE_PATH_PROPERTY = "/property";
export const SAFE_PATH_CARLIFE = "/carlife";
export const SAFE_PATH_APARTMENT = "/apartment";
export const SESSION_DAYS = 30;
export const SESSION_MAX_AGE_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;
export const PASSWORD_MIN_LENGTH = 8;
export const TOKEN_BYTES = 32;
export const SCRYPT_KEYLEN = 64;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const EMAIL_AT = "@";
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 32;
export const USERNAME_PATTERN = /^[a-z0-9_]{3,32}$/;
export const USERNAME_TAKEN_CODE = "username_taken";
export const INVALID_USERNAME_CODE = "invalid_username";
export const EMAIL_TAKEN_CODE = "email_taken";
export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";
export const GOOGLE_SCOPE = "openid email profile";
export const OAUTH_RESPONSE_TYPE = "code";
export const GRANT_AUTHORIZATION_CODE = "authorization_code";
export const PROVIDER_EMAIL = "email";
export const PROVIDER_GOOGLE = "google";
export const PROVIDER_AUTH0 = "auth0";
export const AUTH0_SCOPE = "openid email profile";
export const AUTH0_AUTHORIZE_PATH = "/authorize";
export const AUTH0_TOKEN_PATH = "/oauth/token";
export const AUTH0_USERINFO_PATH = "/userinfo";
export const AUTH0_SCREEN_HINT = "screen_hint";
export const AUTH0_AUDIENCE_PARAM = "audience";
export const AUTH0_SCREEN_HINT_SIGNUP = "signup";
export const AUTH0_QUERY_MODE = "mode";
export const AUTH0_MODE_REGISTER = "register";
export const AUTH0_FAILED_CODE = "auth0_failed";
export const AUTH0_UNAVAILABLE_CODE = "auth0_unavailable";
export const JWT_PARTS_MIN = 2;
export const HASH_SEPARATOR = ":";
export const AUTH_ERROR_QUERY = "error";
export const AUTH_PATH = "/auth";
export const GOOGLE_FAILED_CODE = "google_failed";
export const GOOGLE_UNAVAILABLE_CODE = "google_unavailable";
export const PHONE_MIN_DIGITS = 9;
export const PHONE_MAX_DIGITS = 15;
export const PHONE_PLUS = "+";
export const IL_COUNTRY_DIGITS = "972";
export const IL_TRUNK_PREFIX = "0";
export const IL_MOBILE_LOCAL_LENGTH = 10;
export const IL_MOBILE_NATIONAL_LENGTH = 9;
export const NAME_MAX_LENGTH = 80;
export const ROLE_OWNER = "owner";
export const ROLE_LAWYER = "lawyer";
export const ROLE_SELLER = "seller";
export const ROLE_RENTER = "renter";
export const ROLE_BROKER = "broker";
export const ROLE_CAR_SELLER = "car_seller";
export const AUTH_ROLES = [
  ROLE_OWNER,
  ROLE_SELLER,
  ROLE_RENTER,
  ROLE_BROKER,
  ROLE_LAWYER,
  ROLE_CAR_SELLER,
] as const;
