import type { Request, Response } from "express";
import { HTTP_CREATED, HTTP_OK } from "../constants/http.const";
import { getUserId } from "../middlewares";
import {
  addLawyer,
  listLawyers,
  listSavedAddresses,
  saveAddress,
  searchAddresses,
} from "../modules/property/service";

export async function searchAddressesController(req: Request, res: Response): Promise<void> {
  const query = String(req.query.q ?? "");
  res.status(HTTP_OK).json({ addresses: await searchAddresses(query) });
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
