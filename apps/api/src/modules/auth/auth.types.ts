export interface AuthUserPayload {
  id: string;
  email: string | null;
  username: string | null;
  name: string | null;
  phone: string | null;
  imageUrl: string | null;
  notifyEmail: boolean;
  notifySms: boolean;
  role: string;
}

export interface ProfileUpdateInput {
  name?: string;
  username?: string;
  phone?: string;
  notifyEmail?: boolean;
  notifySms?: boolean;
}

export interface GoogleTokenResponse {
  access_token?: string;
}

export interface GoogleUserInfo {
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
  email_verified?: boolean;
}

export interface Auth0TokenResponse {
  access_token?: string;
  id_token?: string;
}

export interface Auth0UserInfo {
  sub?: string;
  email?: string;
  name?: string;
  nickname?: string;
  picture?: string;
  email_verified?: boolean;
}

export interface SessionCookieOptions {
  httpOnly: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
  secure: boolean;
}
