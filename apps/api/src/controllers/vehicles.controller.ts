import type { Request, Response } from "express";
import { getUserId } from "../middlewares";
import { CONTENT_TYPE_ICS, HTTP_CREATED, HTTP_OK, ICS_CONTENT_DISPOSITION } from "../constants/http.const";
import {
  addDocument,
  addExpense,
  addMaintenance,
  addReminder,
  addVehicle,
  confirmService,
  getDashboard,
  getDocumentFile,
  listVehicles,
  lookupVehicle,
  removeVehicle,
} from "../modules/vehicles/service";
import { vehicleCalendarIcs } from "../modules/vehicles/calendar";
import type { ServiceAnswer } from "@clm/shared";

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

export async function addReminderController(req: Request, res: Response): Promise<void> {
  const reminder = await addReminder(getUserId(req), String(req.params.id), {
    title: String(req.body?.title ?? ""),
    dueDate: String(req.body?.dueDate ?? ""),
  });
  res.status(HTTP_CREATED).json({ reminder });
}

export async function listVehicleDocumentsController(req: Request, res: Response): Promise<void> {
  const dashboard = await getDashboard(getUserId(req), String(req.params.id));
  res.json({ documents: dashboard.documents });
}

export async function addDocumentController(req: Request, res: Response): Promise<void> {
  const hasFile = Boolean(req.body?.contentBase64);
  const document = await addDocument(getUserId(req), String(req.params.id), {
    type: String(req.body?.type ?? "other"),
    title: String(req.body?.title ?? ""),
    notes: req.body?.notes ?? null,
    expiresAt: req.body?.expiresAt ?? null,
    file: hasFile
      ? {
          fileName: String(req.body?.fileName ?? req.body?.originalName ?? ""),
          mimeType: String(req.body?.mimeType ?? ""),
          contentBase64: String(req.body?.contentBase64 ?? ""),
        }
      : null,
  });
  res.status(HTTP_CREATED).json({ document });
}

export async function downloadDocumentController(req: Request, res: Response): Promise<void> {
  const file = await getDocumentFile(getUserId(req), String(req.params.id), String(req.params.docId));
  res.setHeader("Content-Type", file.mimeType);
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(file.originalName)}"`);
  res.send(Buffer.from(file.body));
}

export async function confirmServiceController(req: Request, res: Response): Promise<void> {
  await confirmService(
    getUserId(req),
    String(req.params.id),
    String(req.params.providerId),
    String(req.body?.answer ?? "") as ServiceAnswer,
  );
  res.json({ confirmed: true });
}

export async function addMaintenanceController(req: Request, res: Response): Promise<void> {
  const record = await addMaintenance(getUserId(req), String(req.params.id), {
    serviceDate: String(req.body?.serviceDate ?? ""),
    serviceType: String(req.body?.serviceType ?? ""),
    mileage: req.body?.mileage === undefined || req.body?.mileage === "" ? null : Number(req.body.mileage),
    garage: req.body?.garage ?? null,
    cost: req.body?.cost === undefined || req.body?.cost === "" ? null : Number(req.body.cost),
    notes: req.body?.notes ?? null,
    parts: req.body?.parts ?? null,
  });
  res.status(HTTP_CREATED).json({ maintenance: record });
}

export async function listVehicleMaintenanceController(req: Request, res: Response): Promise<void> {
  const dashboard = await getDashboard(getUserId(req), String(req.params.id));
  res.json({ maintenance: dashboard.maintenance });
}

export async function vehicleCalendarController(req: Request, res: Response): Promise<void> {
  const ics = await vehicleCalendarIcs(getUserId(req), String(req.params.id));
  res.setHeader("Content-Type", CONTENT_TYPE_ICS);
  res.setHeader("Content-Disposition", ICS_CONTENT_DISPOSITION);
  res.status(HTTP_OK).send(ics);
}
