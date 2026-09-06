import type { Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { isClerkReady, isEmailNotifyReady, isGoogleAuthReady, isSmsNotifyReady } from "../config";
import { HTTP_CREATED, HTTP_OK, HTTP_UNAUTHORIZED, HTTP_UNAVAILABLE } from "../constants/http.const";
import { getUserId, type AuthedRequest } from "../middlewares";
import {
  clearSession,
  createSession,
  googleAuthorizeUrl,
  loginUser,
  loginWithClerk,
  loginWithGoogleCode,
  registerUser,
  updateProfile,
  userById,
} from "../modules/auth/service";
import { HttpError } from "../errors/http-error";
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
  const userId = (req as AuthedRequest).userId;
  const user = userId ? await userById(userId) : null;
  res.status(HTTP_OK).json({
    user,
    googleEnabled: isGoogleAuthReady(),
    clerkEnabled: isClerkReady(),
    notificationChannels: {
      email: isEmailNotifyReady(),
      sms: isSmsNotifyReady(),
    },
  });
}

export async function clerkSyncController(req: Request, res: Response): Promise<void> {
  if (!isClerkReady()) {
    throw new HttpError("Clerk is not configured", HTTP_UNAVAILABLE, "clerk_unavailable");
  }
  const clerkId = getAuth(req).userId;
  if (!clerkId) {
    throw new HttpError("Authentication required", HTTP_UNAUTHORIZED, "auth_required");
  }
  const profile = await clerkClient.users.getUser(clerkId);
  const email = profile.primaryEmailAddress?.emailAddress ?? profile.emailAddresses[0]?.emailAddress ?? null;
  const user = await loginWithClerk({
    clerkUserId: profile.id,
    email,
    name: [profile.firstName, profile.lastName].filter(Boolean).join(" ") || profile.username || null,
    imageUrl: profile.imageUrl ?? null,
  });
  attachSession(res, await createSession(user.id));
  res.status(HTTP_OK).json({ user });
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
