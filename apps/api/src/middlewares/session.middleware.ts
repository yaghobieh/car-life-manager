import type { Request, Response, NextFunction } from "express";
import { HTTP_UNAUTHORIZED } from "../constants/http.const";
import { HttpError } from "../errors/http-error";
import { SESSION_COOKIE } from "../modules/auth/auth.const";
import { userFromSessionToken } from "../modules/auth/service";
import { readCookie } from "../modules/auth/auth.utils";

export interface AuthedRequest extends Request {
  userId?: string;
}

export async function sessionMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token = readCookie(req.headers.cookie ?? "", SESSION_COOKIE);
    if (token) {
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
