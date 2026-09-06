import type { Request, Response } from "express";
import { isGoogleAuthReady } from "../config";
import { HTTP_CREATED, HTTP_OK } from "../constants/http.const";
import { getUserId } from "../middlewares";
import {
  clearSession,
  createSession,
  googleAuthorizeUrl,
  loginUser,
  loginWithGoogleCode,
  registerUser,
  updateProfile,
  userFromSessionToken,
} from "../modules/auth/service";
import {
  GOOGLE_FAILED_CODE,
  GOOGLE_UNAVAILABLE_CODE,
  OAUTH_STATE_COOKIE,
  SESSION_COOKIE,
} from "../modules/auth/auth.const";
import { appHomeUrl, authErrorUrl, randomToken, readCookie, sessionCookieOptions } from "../modules/auth/auth.utils";

function attachSession(res: Response, token: string): void {
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions());
}

export async function registerController(req: Request, res: Response): Promise<void> {
  const user = await registerUser(String(req.body?.email ?? ""), String(req.body?.password ?? ""), req.body?.name);
  attachSession(res, await createSession(user.id));
  res.status(HTTP_CREATED).json({ user });
}

export async function loginController(req: Request, res: Response): Promise<void> {
  const user = await loginUser(String(req.body?.email ?? ""), String(req.body?.password ?? ""));
  attachSession(res, await createSession(user.id));
  res.status(HTTP_OK).json({ user });
}

export async function logoutController(req: Request, res: Response): Promise<void> {
  const token = readCookie(req.headers.cookie ?? "", SESSION_COOKIE);
  if (token) await clearSession(token);
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.status(HTTP_OK).json({ user: null });
}

export async function meController(req: Request, res: Response): Promise<void> {
  const token = readCookie(req.headers.cookie ?? "", SESSION_COOKIE);
  const user = token ? await userFromSessionToken(token) : null;
  res.status(HTTP_OK).json({ user, googleEnabled: isGoogleAuthReady() });
}

export async function updateProfileController(req: Request, res: Response): Promise<void> {
  const user = await updateProfile(getUserId(req), {
    name: req.body?.name,
    phone: req.body?.phone,
  });
  res.status(HTTP_OK).json({ user });
}

export async function googleStartController(_req: Request, res: Response): Promise<void> {
  if (!isGoogleAuthReady()) {
    res.redirect(authErrorUrl(GOOGLE_UNAVAILABLE_CODE));
    return;
  }
  const state = randomToken();
  res.cookie(OAUTH_STATE_COOKIE, state, sessionCookieOptions());
  res.redirect(googleAuthorizeUrl(state));
}

export async function googleCallbackController(req: Request, res: Response): Promise<void> {
  const expected = readCookie(req.headers.cookie ?? "", OAUTH_STATE_COOKIE);
  const state = String(req.query.state ?? "");
  const code = String(req.query.code ?? "");
  if (!expected || !state || expected !== state || !code) {
    res.redirect(authErrorUrl(GOOGLE_FAILED_CODE));
    return;
  }
  try {
    const user = await loginWithGoogleCode(code);
    attachSession(res, await createSession(user.id));
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/" });
    res.redirect(appHomeUrl());
  } catch {
    res.redirect(authErrorUrl(GOOGLE_FAILED_CODE));
  }
}
