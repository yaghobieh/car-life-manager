import type { Request } from "express";

export interface AuthedRequest extends Request {
  userId?: string;
}
