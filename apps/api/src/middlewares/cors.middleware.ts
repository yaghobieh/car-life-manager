import type { Request, Response, NextFunction } from "express";
import {
  CORS_ALLOW_CREDENTIALS,
  CORS_ALLOW_HEADERS,
  CORS_ALLOW_METHODS,
  HTTP_NO_CONTENT,
  OPTIONS_METHOD,
} from "../constants/http.const";

export function allowFrontend(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", CORS_ALLOW_CREDENTIALS);
    res.setHeader("Access-Control-Allow-Headers", CORS_ALLOW_HEADERS);
    res.setHeader("Access-Control-Allow-Methods", CORS_ALLOW_METHODS);
  }
  if (req.method === OPTIONS_METHOD) {
    res.status(HTTP_NO_CONTENT).end();
    return;
  }
  next();
}
