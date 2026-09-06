import type { Express, NextFunction, Request, Response } from "express";
import express from "express";
import path from "node:path";
import { API_MOUNT, GET_METHOD, HEAD_METHOD, HEALTH_PATH } from "../constants/http.const";
import { WEB_INDEX_FILE } from "../constants/web-app.const";
import { resolveWebRoot } from "./web-app.utils";

function isPageRequest(req: Request): boolean {
  return req.method === GET_METHOD || req.method === HEAD_METHOD;
}

function isApiPath(req: Request): boolean {
  return req.path === HEALTH_PATH || req.path === API_MOUNT || req.path.startsWith(`${API_MOUNT}/`);
}

export function mountWebApp(app: Express): boolean {
  const webRoot = resolveWebRoot();
  if (!webRoot) return false;

  const indexFile = path.join(webRoot, WEB_INDEX_FILE);
  app.use(express.static(webRoot));
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (!isPageRequest(req) || isApiPath(req)) {
      next();
      return;
    }
    res.sendFile(indexFile);
  });
  return true;
}
