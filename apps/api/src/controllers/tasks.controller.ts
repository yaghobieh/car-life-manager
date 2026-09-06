import type { Request, Response } from "express";
import { getUserId } from "../middlewares";
import { patchTask } from "../modules/vehicles/service";

export async function patchTaskController(req: Request, res: Response): Promise<void> {
  const task = await patchTask(getUserId(req), String(req.params.id), String(req.body?.status ?? ""));
  res.json({ task });
}
