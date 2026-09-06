import type { Request, Response, NextFunction } from "express";

export function asyncRoute(
  handler: (req: Request, res: Response) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const status = typeof error === "object" && error && "status" in error
    ? Number((error as { status: number }).status)
    : 500;
  const message = error instanceof Error ? error.message : "Unexpected error";
  const code = typeof error === "object" && error && "code" in error
    ? String((error as { code: string }).code)
    : undefined;
  res.status(status || 500).json({ error: message, code });
}
