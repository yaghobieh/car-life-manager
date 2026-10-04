import type { Request, Response, NextFunction } from "express";
import { HTTP_UNAUTHORIZED } from "../constants/http.const";
import { HttpError } from "../errors/http-error";
import { BEARER_PREFIX, EMPTY_STRING, SESSION_COOKIE } from "../modules/auth/auth.const";
import { userFromSessionToken } from "../modules/auth/service";
import { readCookie } from "../modules/auth/auth.utils";
import type { AuthedRequest } from "./session.types";

function sessionToken(req: Request): string | undefined {
  const header = req.headers.authorization;
  if (typeof header === "string" && header.startsWith(BEARER_PREFIX)) {
    const bearer = header.slice(BEARER_PREFIX.length).trim();
    if (bearer) return bearer;
  }
  return readCookie(req.headers.cookie ?? EMPTY_STRING, SESSION_COOKIE);
}

export async function sessionMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token = sessionToken(req);
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
