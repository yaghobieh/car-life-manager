import { config, isAuth0Ready, isGoogleAuthReady } from "../../config";
import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_UNAUTHORIZED,
  HTTP_UNAVAILABLE,
} from "../../constants/http.const";
import { prisma } from "../../db";
import { HttpError } from "../../errors/http-error";
import { logger } from "../../logger";
import {
  AUTH0_AUDIENCE_PARAM,
  AUTH0_AUTHORIZE_PATH,
  AUTH0_FAILED_CODE,
  AUTH0_SCOPE,
  AUTH0_SCREEN_HINT,
  AUTH0_TOKEN_PATH,
  AUTH0_UNAVAILABLE_CODE,
  AUTH0_USERINFO_PATH,
  JWT_PARTS_MIN,
  GOOGLE_AUTH_URL,
  GOOGLE_SCOPE,
  GOOGLE_TOKEN_URL,
  GOOGLE_USERINFO_URL,
  GRANT_AUTHORIZATION_CODE,
  NAME_MAX_LENGTH,
  OAUTH_RESPONSE_TYPE,
  PASSWORD_MIN_LENGTH,
  PROVIDER_AUTH0,
  PROVIDER_EMAIL,
  PROVIDER_GOOGLE,
  AUTH_ROLES,
  ROLE_LAWYER,
  ROLE_OWNER,
  SESSION_MAX_AGE_MS,
} from "./auth.const";
import type {
  Auth0TokenResponse,
  Auth0UserInfo,
  AuthUserPayload,
  GoogleTokenResponse,
  GoogleUserInfo,
  ProfileUpdateInput,
} from "./auth.types";
import {
  hashPassword,
  isValidEmail,
  isValidPhone,
  normalizeEmail,
  normalizePhone,
  randomToken,
  serializeAuthUser,
  verifyPassword,
} from "./auth.utils";

export async function registerUser(email: string, password: string, name?: string, role?: string): Promise<AuthUserPayload> {
  const normalized = normalizeEmail(email);
  if (!isValidEmail(normalized)) {
    throw new HttpError("Invalid email", HTTP_BAD_REQUEST, "invalid_email");
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new HttpError("Password is too short", HTTP_BAD_REQUEST, "password_short");
  }
  const nextRole = AUTH_ROLES.includes(role as (typeof AUTH_ROLES)[number]) ? role as string : ROLE_OWNER;
  const existing = await prisma.user.findUnique({ where: { email: normalized } });
  if (existing) {
    throw new HttpError("Email already registered", HTTP_CONFLICT, "email_taken");
  }
  const displayName = name?.trim() || null;
  const user = await prisma.user.create({
    data: {
      email: normalized,
      name: displayName,
      role: nextRole,
      passwordHash: hashPassword(password),
      identities: {
        create: { provider: PROVIDER_EMAIL, providerAccountId: normalized },
      },
    },
  });
  if (nextRole === ROLE_LAWYER && displayName) {
    await prisma.lawyer.create({
      data: { userId: user.id, name: displayName },
    });
  }
  logger.info("registered user", user.id);
  return serializeAuthUser(user);
}

export async function loginUser(email: string, password: string): Promise<AuthUserPayload> {
  const user = await prisma.user.findUnique({ where: { email: normalizeEmail(email) } });
  if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) {
    throw new HttpError("Invalid credentials", HTTP_UNAUTHORIZED, "invalid_credentials");
  }
  logger.info("login user", user.id);
  return serializeAuthUser(user);
}

export async function createSession(userId: string): Promise<string> {
  const token = randomToken();
  await prisma.authSession.create({
    data: {
      userId,
      token,
      expiresAt: new Date(Date.now() + SESSION_MAX_AGE_MS),
    },
  });
  return token;
}

export async function userById(userId: string): Promise<AuthUserPayload | null> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user ? serializeAuthUser(user) : null;
}

export async function userFromSessionToken(token: string): Promise<AuthUserPayload | null> {
  const session = await prisma.authSession.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  return serializeAuthUser(session.user);
}

export async function clearSession(token: string): Promise<void> {
  await prisma.authSession.deleteMany({ where: { token } });
}

export function googleAuthorizeUrl(state: string): string {
  if (!isGoogleAuthReady()) {
    throw new HttpError("Google sign-in is not configured", HTTP_UNAVAILABLE, "google_unavailable");
  }
  const params = new URLSearchParams({
    client_id: config.googleClientId,
    redirect_uri: config.googleRedirectUri,
    response_type: OAUTH_RESPONSE_TYPE,
    scope: GOOGLE_SCOPE,
    state,
    prompt: "select_account",
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export async function loginWithGoogleCode(code: string): Promise<AuthUserPayload> {
  if (!isGoogleAuthReady()) {
    throw new HttpError("Google sign-in is not configured", HTTP_UNAVAILABLE, "google_unavailable");
  }
  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: config.googleClientId,
      client_secret: config.googleClientSecret,
      redirect_uri: config.googleRedirectUri,
      grant_type: GRANT_AUTHORIZATION_CODE,
    }),
  });
  const tokens = (await tokenResponse.json()) as GoogleTokenResponse;
  if (!tokenResponse.ok || !tokens.access_token) {
    logger.warn("google token exchange failed", tokenResponse.status);
    throw new HttpError("Google sign-in failed", HTTP_UNAUTHORIZED, "google_failed");
  }
  const profileResponse = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const profile = (await profileResponse.json()) as GoogleUserInfo;
  if (!profileResponse.ok || !profile.sub || !profile.email) {
    throw new HttpError("Google profile is incomplete", HTTP_UNAUTHORIZED, "google_failed");
  }
  const email = normalizeEmail(profile.email);
  const identity = await prisma.authIdentity.findUnique({
    where: { provider_providerAccountId: { provider: PROVIDER_GOOGLE, providerAccountId: profile.sub } },
    include: { user: true },
  });
  if (identity) return serializeAuthUser(identity.user);

  const existing = await prisma.user.findUnique({ where: { email } });
  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: {
          name: existing.name ?? profile.name ?? null,
          imageUrl: existing.imageUrl ?? profile.picture ?? null,
          emailVerifiedAt: profile.email_verified ? new Date() : existing.emailVerifiedAt,
          identities: { create: { provider: PROVIDER_GOOGLE, providerAccountId: profile.sub } },
        },
      })
    : await prisma.user.create({
        data: {
          email,
          name: profile.name ?? null,
          imageUrl: profile.picture ?? null,
          emailVerifiedAt: profile.email_verified ? new Date() : null,
          identities: { create: { provider: PROVIDER_GOOGLE, providerAccountId: profile.sub } },
        },
      });
  logger.info("google login user", user.id);
  return serializeAuthUser(user);
}

function auth0Origin(): string {
  return `https://${config.auth0Domain}`;
}

function readAuth0IdToken(idToken: string): Auth0UserInfo | null {
  const parts = idToken.split(".");
  if (parts.length < JWT_PARTS_MIN) return null;
  try {
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as Auth0UserInfo;
  } catch {
    return null;
  }
}

async function fetchAuth0UserInfo(accessToken: string): Promise<Auth0UserInfo | null> {
  const profileResponse = await fetch(`${auth0Origin()}${AUTH0_USERINFO_PATH}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!profileResponse.ok) return null;
  return (await profileResponse.json()) as Auth0UserInfo;
}

export function auth0AuthorizeUrl(state: string, screenHint?: string): string {
  if (!isAuth0Ready()) {
    throw new HttpError("Auth0 sign-in is not configured", HTTP_UNAVAILABLE, AUTH0_UNAVAILABLE_CODE);
  }
  const params = new URLSearchParams({
    client_id: config.auth0ClientId,
    redirect_uri: config.auth0RedirectUri,
    response_type: OAUTH_RESPONSE_TYPE,
    scope: AUTH0_SCOPE,
    state,
  });
  if (config.auth0Audience) params.set(AUTH0_AUDIENCE_PARAM, config.auth0Audience);
  if (screenHint) params.set(AUTH0_SCREEN_HINT, screenHint);
  return `${auth0Origin()}${AUTH0_AUTHORIZE_PATH}?${params.toString()}`;
}

export async function loginWithAuth0Code(code: string): Promise<AuthUserPayload> {
  if (!isAuth0Ready()) {
    throw new HttpError("Auth0 sign-in is not configured", HTTP_UNAVAILABLE, AUTH0_UNAVAILABLE_CODE);
  }
  const tokenResponse = await fetch(`${auth0Origin()}${AUTH0_TOKEN_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: config.auth0ClientId,
      client_secret: config.auth0ClientSecret,
      redirect_uri: config.auth0RedirectUri,
      grant_type: GRANT_AUTHORIZATION_CODE,
    }),
  });
  const tokens = (await tokenResponse.json()) as Auth0TokenResponse;
  if (!tokenResponse.ok || !tokens.access_token) {
    logger.warn("auth0 token exchange failed", tokenResponse.status);
    throw new HttpError("Auth0 sign-in failed", HTTP_UNAUTHORIZED, AUTH0_FAILED_CODE);
  }
  const profile = tokens.id_token
    ? readAuth0IdToken(tokens.id_token)
    : await fetchAuth0UserInfo(tokens.access_token);
  if (!profile?.sub || !profile.email) {
    throw new HttpError("Auth0 profile is incomplete", HTTP_UNAUTHORIZED, AUTH0_FAILED_CODE);
  }
  const email = normalizeEmail(profile.email);
  const identity = await prisma.authIdentity.findUnique({
    where: { provider_providerAccountId: { provider: PROVIDER_AUTH0, providerAccountId: profile.sub } },
    include: { user: true },
  });
  if (identity) return serializeAuthUser(identity.user);

  const existing = await prisma.user.findUnique({ where: { email } });
  const displayName = profile.name ?? profile.nickname ?? null;
  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: {
          name: existing.name ?? displayName,
          imageUrl: existing.imageUrl ?? profile.picture ?? null,
          emailVerifiedAt: profile.email_verified ? new Date() : existing.emailVerifiedAt,
          identities: { create: { provider: PROVIDER_AUTH0, providerAccountId: profile.sub } },
        },
      })
    : await prisma.user.create({
        data: {
          email,
          name: displayName,
          imageUrl: profile.picture ?? null,
          emailVerifiedAt: profile.email_verified ? new Date() : null,
          identities: { create: { provider: PROVIDER_AUTH0, providerAccountId: profile.sub } },
        },
      });
  logger.info("auth0 login user", user.id);
  return serializeAuthUser(user);
}

export async function updateProfile(userId: string, input: ProfileUpdateInput): Promise<AuthUserPayload> {
  if (input.phone !== undefined && !isValidPhone(input.phone)) {
    throw new HttpError("Invalid phone", HTTP_BAD_REQUEST, "invalid_phone");
  }
  const name = input.name === undefined ? undefined : input.name.trim() || null;
  if (name && name.length > NAME_MAX_LENGTH) {
    throw new HttpError("Name is too long", HTTP_BAD_REQUEST, "invalid_name");
  }
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(input.phone !== undefined ? { phone: normalizePhone(input.phone) } : {}),
      ...(input.notifyEmail !== undefined ? { notifyEmail: input.notifyEmail } : {}),
      ...(input.notifySms !== undefined ? { notifySms: input.notifySms } : {}),
    },
  });
  logger.info("updated profile", user.id);
  return serializeAuthUser(user);
}
