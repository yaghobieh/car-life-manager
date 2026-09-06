import type { Express } from "express";
import express from "express";
import { API_MOUNT, HEALTH_PATH, HTTP_OK } from "../constants/http.const";
import { allowFrontend, errorHandler, mountWebApp, sessionMiddleware } from "../middlewares";
import { apiRouter } from "./index";

export function registerExpressApp(app: Express): void {
  app.use(express.json());
  app.use(allowFrontend);
  app.get(HEALTH_PATH, (_req, res) => {
    res.status(HTTP_OK).json({ status: "healthy" });
  });
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
