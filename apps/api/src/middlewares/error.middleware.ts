import type { Request, Response, NextFunction } from "express";
import { HTTP_SERVER_ERROR } from "../constants/http.const";
import { logger } from "../logger";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const status = typeof error === "object" && error && "status" in error
    ? Number((error as { status: number }).status)
    : HTTP_SERVER_ERROR;
  const message = error instanceof Error ? error.message : "Unexpected error";
  const code = typeof error === "object" && error && "code" in error
    ? String((error as { code: string }).code)
    : undefined;
  logger.error(message, { status, code });
  res.status(status || HTTP_SERVER_ERROR).json({ error: message, code });
}
