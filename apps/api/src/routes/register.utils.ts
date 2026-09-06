import type { Express } from "express";
import express from "express";
import { API_MOUNT, HEALTH_PATH, HTTP_OK } from "../constants/http.const";
import { allowFrontend, errorHandler, sessionMiddleware } from "../middlewares";
import { apiRouter } from "./index";

export function registerExpressApp(app: Express): void {
  app.use(express.json());
  app.use(allowFrontend);
  app.get(HEALTH_PATH, (_req, res) => {
    res.status(HTTP_OK).json({ status: "healthy" });
  });
  app.get("/", (_req, res) => {
    res.status(HTTP_OK).json({ status: "ok", service: "clm-api" });
  });
  app.use(sessionMiddleware);
  app.use(API_MOUNT, apiRouter);
  app.use(errorHandler);
}
