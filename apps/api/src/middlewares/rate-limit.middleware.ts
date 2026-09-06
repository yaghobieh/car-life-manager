import type { NextFunction, Request, Response } from "express";
import { HTTP_TOO_MANY_REQUESTS } from "../constants/http.const";

type WindowCount = {
  count: number;
  resetAt: number;
};

const UNKNOWN_CLIENT = "unknown";

export function rateLimit(windowMs: number, max: number) {
  const hits = new Map<string, WindowCount>();

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip ?? UNKNOWN_CLIENT;
    const now = Date.now();
    const existing = hits.get(key);
    const bucket =
      existing && existing.resetAt > now ? existing : { count: 0, resetAt: now + windowMs };

    bucket.count += 1;
    hits.set(key, bucket);

    if (bucket.count > max) {
      res.status(HTTP_TOO_MANY_REQUESTS).json({ error: "Too many requests" });
      return;
    }

    next();
  };
}
