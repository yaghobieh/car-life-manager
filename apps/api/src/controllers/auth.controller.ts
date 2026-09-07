import type { Request, Response } from "express";
import { isAuth0Ready, isEmailNotifyReady, isGoogleAuthReady, isSmsAccountReady, isSmsNotifyReady } from "../config";
import { HTTP_CREATED, HTTP_OK } from "../constants/http.const";
import { getUserId, type AuthedRequest } from "../middlewares";
import {
  auth0AuthorizeUrl,
  clearSession,
  createSession,
  googleAuthorizeUrl,
  loginUser,
  loginWithAuth0Code,
  loginWithGoogleCode,
  registerUser,
  updateProfile,
  userById,
} from "../modules/auth/service";
import {
  AUTH_NEXT_COOKIE,
  AUTH_NEXT_QUERY,
  AUTH0_FAILED_CODE,
  AUTH0_MODE_REGISTER,
  AUTH0_QUERY_MODE,
  AUTH0_SCREEN_HINT_SIGNUP,
  AUTH0_UNAVAILABLE_CODE,
  GOOGLE_FAILED_CODE,
  GOOGLE_UNAVAILABLE_CODE,
  OAUTH_STATE_COOKIE,
  SESSION_COOKIE,
} from "../modules/auth/auth.const";
import { appHomeUrl, authErrorUrl, isSafeAppPath, randomToken, readAuthNext, readCookie, sessionCookieOptions } from "../modules/auth/auth.utils";

function attachSession(res: Response, token: string): void {
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions());
}

function rememberAuthNext(req: Request, res: Response): void {
  const next = String(req.query[AUTH_NEXT_QUERY] ?? "");
  if (isSafeAppPath(next)) {
    res.cookie(AUTH_NEXT_COOKIE, next, sessionCookieOptions());
    return;
  }
  res.clearCookie(AUTH_NEXT_COOKIE, { path: "/" });
}

function redirectAfterAuth(req: Request, res: Response): void {
  const next = readAuthNext(req.headers.cookie ?? "");
  res.clearCookie(AUTH_NEXT_COOKIE, { path: "/" });
  res.redirect(appHomeUrl(next));
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
  const userId = (req as AuthedRequest).userId;
  const user = userId ? await userById(userId) : null;
  res.status(HTTP_OK).json({
    user,
    googleEnabled: isGoogleAuthReady(),
    auth0Enabled: isAuth0Ready(),
    notificationChannels: {
      email: isEmailNotifyReady(),
      sms: isSmsNotifyReady(),
      smsAccount: isSmsAccountReady(),
    },
  });
}

export async function updateProfileController(req: Request, res: Response): Promise<void> {
  const user = await updateProfile(getUserId(req), {
    name: req.body?.name,
    phone: req.body?.phone,
    notifyEmail: typeof req.body?.notifyEmail === "boolean" ? req.body.notifyEmail : undefined,
    notifySms: typeof req.body?.notifySms === "boolean" ? req.body.notifySms : undefined,
  });
  res.status(HTTP_OK).json({ user });
}

export async function googleStartController(req: Request, res: Response): Promise<void> {
  if (!isGoogleAuthReady()) {
    res.redirect(authErrorUrl(GOOGLE_UNAVAILABLE_CODE));
    return;
  }
  rememberAuthNext(req, res);
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
    redirectAfterAuth(req, res);
  } catch {
    res.redirect(authErrorUrl(GOOGLE_FAILED_CODE));
  }
}

export async function auth0StartController(req: Request, res: Response): Promise<void> {
  if (!isAuth0Ready()) {
    res.redirect(authErrorUrl(AUTH0_UNAVAILABLE_CODE));
    return;
  }
  rememberAuthNext(req, res);
  const state = randomToken();
  const screenHint =
    String(req.query[AUTH0_QUERY_MODE] ?? "") === AUTH0_MODE_REGISTER ? AUTH0_SCREEN_HINT_SIGNUP : undefined;
  res.cookie(OAUTH_STATE_COOKIE, state, sessionCookieOptions());
  res.redirect(auth0AuthorizeUrl(state, screenHint));
}

export async function auth0CallbackController(req: Request, res: Response): Promise<void> {
  const expected = readCookie(req.headers.cookie ?? "", OAUTH_STATE_COOKIE);
  const state = String(req.query.state ?? "");
  const code = String(req.query.code ?? "");
  if (!expected || !state || expected !== state || !code) {
    res.redirect(authErrorUrl(AUTH0_FAILED_CODE));
    return;
  }
  try {
    const user = await loginWithAuth0Code(code);
    attachSession(res, await createSession(user.id));
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/" });
    redirectAfterAuth(req, res);
  } catch {
    res.redirect(authErrorUrl(AUTH0_FAILED_CODE));
  }
}
