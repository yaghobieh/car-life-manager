import type { Request, Response } from 'express';
import { EMPTY_STRING } from '../constants/general.const';
import { HTTP_CREATED, HTTP_NOT_FOUND, HTTP_OK } from '../constants/http.const';
import { ERROR_LISTING_NOT_FOUND } from '../modules/listings/listings.const';
import { listingsStore } from '../modules/listings/listings.service';
import { parseListingFilterQuery } from '../modules/listings/listings.utils';

export async function getListingsController(req: Request, res: Response): Promise<void> {
  const filters = parseListingFilterQuery(req.query as Record<string, unknown>);

  const apartments = listingsStore.listApartments(filters);
  const cars = listingsStore.listCars(filters);
  const cities = listingsStore.getCities();
  const makers = listingsStore.getMakers();

  res.status(HTTP_OK).json({
    apartments,
    cars,
    totalApartments: apartments.length,
    totalCars: cars.length,
    cities,
    makers,
  });
}

export async function getListingDetailController(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const result = listingsStore.getById(id);
  if (!result) {
    res.status(HTTP_NOT_FOUND).json({ error: ERROR_LISTING_NOT_FOUND });
    return;
  }
  res.status(HTTP_OK).json(result);
}

export async function createListingController(req: Request, res: Response): Promise<void> {
  const listing = listingsStore.createListing(req.body ?? {});
  res.status(HTTP_CREATED).json({ listing });
}

export async function aiSearchController(req: Request, res: Response): Promise<void> {
  const query = String(req.query.q ?? EMPTY_STRING);
  const searchResult = listingsStore.aiSearch(query);
  res.status(HTTP_OK).json(searchResult);
}

