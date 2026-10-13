import type { Express, Request, Response } from "express";
import express from "express";
import { API_HEALTH_PATH, API_MOUNT, HEALTH_PATH, HTTP_OK, JSON_BODY_LIMIT } from "../constants/http.const";
import { allowFrontend, errorHandler, mountWebApp, sessionMiddleware } from "../middlewares";
import { apiRouter } from "./index";

function healthHandler(_req: Request, res: Response): void {
  res.status(HTTP_OK).json({ status: "healthy" });
}

export function registerExpressApp(app: Express): void {
  app.use(express.json({ limit: JSON_BODY_LIMIT }));
  app.use(allowFrontend);
  app.get(HEALTH_PATH, healthHandler);
  app.get(API_HEALTH_PATH, healthHandler);
  const servingWeb = mountWebApp(app);
  app.use(sessionMiddleware);
  app.use(API_MOUNT, apiRouter);
  if (!servingWeb) {
    app.get("/", (_req, res) => {
      res.status(HTTP_OK).json({ status: "ok", service: "clm-api" });
    });
  }
  app.use(errorHandler);
}
