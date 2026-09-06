import type { Request, Response } from "express";

export function identityStatusController(_req: Request, res: Response): void {
  res.json({
    status: "unavailable",
    note: "אין ספק אימות זהות מוגדר. לא ניתן לאמת בעלות על ידי הזנת מספר זהות בלבד.",
  });
}
