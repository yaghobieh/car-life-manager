export interface AuthUserPayload {
  id: string;
  email: string | null;
  name: string | null;
  imageUrl: string | null;
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

export interface SessionCookieOptions {
  httpOnly: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
  secure: boolean;
}
