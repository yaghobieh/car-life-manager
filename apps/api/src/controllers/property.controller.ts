import type { Request, Response } from "express";
import { HTTP_CREATED, HTTP_OK } from "../constants/http.const";
import { getUserId } from "../middlewares";
import { DEAL_OWNED } from "../modules/property/property.const";
import { queueHomeDues } from "../notifications/service";
import {
  addHome,
  addLawyer,
  addPropertyExpense,
  listHomes,
  listLawyers,
  listPropertyExpenses,
  listSavedAddresses,
  saveAddress,
  searchAddresses,
  searchAreaPrices,
} from "../modules/property/service";

export async function searchAddressesController(req: Request, res: Response): Promise<void> {
  const query = String(req.query.q ?? "");
  res.status(HTTP_OK).json({ addresses: await searchAddresses(query) });
}

export async function searchAreaPricesController(req: Request, res: Response): Promise<void> {
  const query = String(req.query.q ?? "");
  res.status(HTTP_OK).json({ prices: await searchAreaPrices(query) });
}

export async function listLawyersController(req: Request, res: Response): Promise<void> {
  res.status(HTTP_OK).json({ lawyers: await listLawyers(getUserId(req)) });
}

export async function addLawyerController(req: Request, res: Response): Promise<void> {
  const lawyer = await addLawyer(getUserId(req), {
    name: String(req.body?.name ?? ""),
    city: req.body?.city,
    specialty: req.body?.specialty,
    phone: req.body?.phone,
    notes: req.body?.notes,
  });
  res.status(HTTP_CREATED).json({ lawyer });
}

export async function listSavedAddressesController(req: Request, res: Response): Promise<void> {
  res.status(HTTP_OK).json({ addresses: await listSavedAddresses(getUserId(req)) });
}

export async function saveAddressController(req: Request, res: Response): Promise<void> {
  const address = await saveAddress(getUserId(req), {
    city: String(req.body?.city ?? ""),
    street: req.body?.street,
    cityCode: req.body?.cityCode,
    streetCode: req.body?.streetCode,
    region: req.body?.region,
  });
  res.status(HTTP_CREATED).json({ address });
}

export async function listHomesController(req: Request, res: Response): Promise<void> {
  const userId = getUserId(req);
  const homes = await listHomes(userId);
  queueHomeDues(userId);
  res.status(HTTP_OK).json({ homes });
}

export async function addHomeController(req: Request, res: Response): Promise<void> {
  const home = await addHome(getUserId(req), {
    dealType: req.body?.dealType ?? DEAL_OWNED,
    city: String(req.body?.city ?? ""),
    street: req.body?.street,
    houseNumber: req.body?.houseNumber,
    neighborhood: req.body?.neighborhood,
    rooms: req.body?.rooms === undefined ? null : Number(req.body.rooms),
    sqm: req.body?.sqm === undefined ? null : Number(req.body.sqm),
    floor: req.body?.floor === undefined ? null : Number(req.body.floor),
    price: req.body?.price === undefined ? null : Number(req.body.price),
    features: Array.isArray(req.body?.features) ? req.body.features : undefined,
    imageUrls: Array.isArray(req.body?.imageUrls) ? req.body.imageUrls : undefined,
    model3dUrl: req.body?.model3dUrl,
    nextDueDate: req.body?.nextDueDate,
    nextDueTitle: req.body?.nextDueTitle,
    notes: req.body?.notes,
  });
  res.status(HTTP_CREATED).json({ home });
}

export async function listPropertyExpensesController(req: Request, res: Response): Promise<void> {
  res.status(HTTP_OK).json({ expenses: await listPropertyExpenses(getUserId(req)) });
}

export async function addPropertyExpenseController(req: Request, res: Response): Promise<void> {
  const expense = await addPropertyExpense(getUserId(req), {
    category: String(req.body?.category ?? ""),
    amount: Number(req.body?.amount),
    occurredAt: String(req.body?.occurredAt ?? ""),
    description: req.body?.description,
  });
  res.status(HTTP_CREATED).json({ expense });
}
