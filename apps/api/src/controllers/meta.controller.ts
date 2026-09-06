import type { Request, Response } from "express";
import { config } from "../config";
import { HTTP_OK } from "../constants/http.const";

export function metaController(_req: Request, res: Response): void {
  res.status(HTTP_OK).json({
    frontend: config.appVersion,
    backend: config.appVersion,
    build: config.buildSha,
  });
}
