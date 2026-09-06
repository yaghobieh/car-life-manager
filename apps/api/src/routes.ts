import { Router } from "express";
import { catalogWithTimestamp } from "@clm/shared";
import { rateLimit } from "@forgedevstack/harbor";
import { getUserId } from "./session";
import { asyncRoute } from "./http";
import {
  addExpense,
  addVehicle,
  getDashboard,
  listVehicles,
  lookupVehicle,
  patchTask,
  removeVehicle,
} from "./modules/vehicles/service";

export const apiRouter = Router();

apiRouter.get(
  "/vehicles/lookup/:registrationNumber",
  rateLimit({ windowMs: 60_000, max: 20 }),
  asyncRoute(async (req, res) => {
    const result = await lookupVehicle(String(req.params.registrationNumber));
    res.json(result);
  }),
);

apiRouter.get(
  "/vehicles",
  asyncRoute(async (req, res) => {
    res.json({ vehicles: await listVehicles(getUserId(req)) });
  }),
);

apiRouter.post(
  "/vehicles",
  asyncRoute(async (req, res) => {
    const registrationNumber = String(req.body?.registrationNumber ?? "");
    const result = await addVehicle(getUserId(req), registrationNumber);
    res.status(result.created ? 201 : 200).json(result);
  }),
);

apiRouter.get(
  "/vehicles/:id",
  asyncRoute(async (req, res) => {
    res.json(await getDashboard(getUserId(req), String(req.params.id)));
  }),
);

apiRouter.delete(
  "/vehicles/:id",
  asyncRoute(async (req, res) => {
    await removeVehicle(getUserId(req), String(req.params.id));
    res.json({ deleted: true });
  }),
);

apiRouter.get(
  "/vehicles/:id/tasks",
  asyncRoute(async (req, res) => {
    const dashboard = await getDashboard(getUserId(req), String(req.params.id));
    res.json({ tasks: dashboard.tasks });
  }),
);

apiRouter.patch(
  "/tasks/:id",
  asyncRoute(async (req, res) => {
    const task = await patchTask(getUserId(req), String(req.params.id), String(req.body?.status ?? ""));
    res.json({ task });
  }),
);

apiRouter.get(
  "/vehicles/:id/services",
  asyncRoute(async (req, res) => {
    await getDashboard(getUserId(req), String(req.params.id));
    res.json({ services: catalogWithTimestamp() });
  }),
);

apiRouter.get(
  "/vehicles/:id/expenses",
  asyncRoute(async (req, res) => {
    const dashboard = await getDashboard(getUserId(req), String(req.params.id));
    res.json({ expenses: dashboard.expenses, summary: dashboard.expenseSummary });
  }),
);

apiRouter.post(
  "/vehicles/:id/expenses",
  asyncRoute(async (req, res) => {
    const expense = await addExpense(getUserId(req), String(req.params.id), {
      category: req.body.category,
      amount: Number(req.body.amount),
      currency: "ILS",
      merchant: req.body.merchant ?? null,
      occurredAt: req.body.occurredAt,
      description: req.body.description ?? null,
      recurring: Boolean(req.body.recurring),
      attachmentId: null,
    });
    res.status(201).json({ expense });
  }),
);

apiRouter.get(
  "/vehicles/:id/reminders",
  asyncRoute(async (req, res) => {
    const dashboard = await getDashboard(getUserId(req), String(req.params.id));
    res.json({ reminders: dashboard.reminders });
  }),
);

apiRouter.get("/identity/status", (_req, res) => {
  res.json({
    status: "unavailable",
    note: "אין ספק אימות זהות מוגדר. לא ניתן לאמת בעלות על ידי הזנת מספר זהות בלבד.",
  });
});
