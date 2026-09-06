import type { Express, Request, Response } from "express";
import express from "express";
import { API_HEALTH_PATH, API_MOUNT, HEALTH_PATH, HTTP_OK } from "../constants/http.const";
import { allowFrontend, errorHandler, mountClerk, mountWebApp, sessionMiddleware } from "../middlewares";
import { apiRouter } from "./index";

function healthHandler(_req: Request, res: Response): void {
  res.status(HTTP_OK).json({ status: "healthy" });
}

export function registerExpressApp(app: Express): void {
  app.use(express.json());
  app.use(allowFrontend);
  app.get(HEALTH_PATH, healthHandler);
  app.get(API_HEALTH_PATH, healthHandler);
  const servingWeb = mountWebApp(app);
  mountClerk(app);
  app.use(sessionMiddleware);
  app.use(API_MOUNT, apiRouter);
  if (!servingWeb) {
    app.get("/", (_req, res) => {
      res.status(HTTP_OK).json({ status: "ok", service: "clm-api" });
    });
  }
  app.use(errorHandler);
}
