import { clerkMiddleware } from "@clerk/express";
import { isClerkReady } from "../config";
import type { Express } from "express";

export function mountClerk(app: Express): void {
  if (!isClerkReady()) return;
  app.use(clerkMiddleware());
}
