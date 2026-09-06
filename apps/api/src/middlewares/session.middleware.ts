import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db";

export interface AuthedRequest extends Request {
  userId: string;
}

export async function sessionMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cookie = req.headers.cookie ?? "";
    const match = cookie.match(/(?:^|;\s*)clm_user=([^;]+)/);
    let userId = match?.[1];

    if (userId) {
      const existing = await prisma.user.findUnique({ where: { id: userId } });
      if (!existing) userId = undefined;
    }

    if (!userId) {
      const user = await prisma.user.create({ data: {} });
      userId = user.id;
      res.setHeader(
        "Set-Cookie",
        `clm_user=${userId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`,
      );
    }

    (req as AuthedRequest).userId = userId;
    next();
  } catch (error) {
    next(error);
  }
}

export function getUserId(req: Request): string {
  const userId = (req as AuthedRequest).userId;
  if (!userId) throw new Error("Missing session");
  return userId;
}
