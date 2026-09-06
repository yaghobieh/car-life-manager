import type { Request, Response } from "express";
import { HTTP_CREATED, HTTP_OK } from "../constants/http.const";
import { getUserId } from "../middlewares";
import {
  addExpense,
  addVehicle,
  getDashboard,
  listVehicles,
  lookupVehicle,
  removeVehicle,
} from "../modules/vehicles/service";

export async function lookupVehicleController(req: Request, res: Response): Promise<void> {
  const result = await lookupVehicle(String(req.params.registrationNumber));
  res.json(result);
}

export async function listVehiclesController(req: Request, res: Response): Promise<void> {
  res.json({ vehicles: await listVehicles(getUserId(req)) });
}

export async function addVehicleController(req: Request, res: Response): Promise<void> {
  const registrationNumber = String(req.body?.registrationNumber ?? "");
  const result = await addVehicle(getUserId(req), registrationNumber);
  res.status(result.created ? HTTP_CREATED : HTTP_OK).json(result);
}

export async function getDashboardController(req: Request, res: Response): Promise<void> {
  res.json(await getDashboard(getUserId(req), String(req.params.id)));
}

export async function removeVehicleController(req: Request, res: Response): Promise<void> {
  await removeVehicle(getUserId(req), String(req.params.id));
  res.json({ deleted: true });
}

export async function listVehicleTasksController(req: Request, res: Response): Promise<void> {
  const dashboard = await getDashboard(getUserId(req), String(req.params.id));
  res.json({ tasks: dashboard.tasks });
}

export async function listVehicleServicesController(req: Request, res: Response): Promise<void> {
  const dashboard = await getDashboard(getUserId(req), String(req.params.id));
  res.json({ services: dashboard.services });
}

export async function listVehicleExpensesController(req: Request, res: Response): Promise<void> {
  const dashboard = await getDashboard(getUserId(req), String(req.params.id));
  res.json({ expenses: dashboard.expenses, summary: dashboard.expenseSummary });
}

export async function addExpenseController(req: Request, res: Response): Promise<void> {
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
  res.status(HTTP_CREATED).json({ expense });
}

export async function listVehicleRemindersController(req: Request, res: Response): Promise<void> {
  const dashboard = await getDashboard(getUserId(req), String(req.params.id));
  res.json({ reminders: dashboard.reminders });
}
