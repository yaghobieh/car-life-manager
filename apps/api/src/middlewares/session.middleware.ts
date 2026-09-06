import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { isClerkReady } from "../config";
import { HTTP_UNAUTHORIZED } from "../constants/http.const";
import { HttpError } from "../errors/http-error";
import { SESSION_COOKIE } from "../modules/auth/auth.const";
import { userFromClerkId, userFromSessionToken } from "../modules/auth/service";
import { readCookie } from "../modules/auth/auth.utils";

export interface AuthedRequest extends Request {
  userId?: string;
}

export async function sessionMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    if (isClerkReady()) {
      try {
        const clerkId = getAuth(req).userId;
        if (clerkId) {
          const clerkUser = await userFromClerkId(clerkId);
          if (clerkUser) (req as AuthedRequest).userId = clerkUser.id;
        }
      } catch {
        // Cookie session still applies when Clerk is not on this request.
      }
    }
    const token = readCookie(req.headers.cookie ?? "", SESSION_COOKIE);
    if (!(req as AuthedRequest).userId && token) {
      const user = await userFromSessionToken(token);
      if (user) (req as AuthedRequest).userId = user.id;
    }
    next();
  } catch (error) {
    next(error);
  }
}

export function getUserId(req: Request): string {
  const userId = (req as AuthedRequest).userId;
  if (!userId) throw new HttpError("Authentication required", HTTP_UNAUTHORIZED, "auth_required");
  return userId;
}
