import { Router } from 'express';
import { asyncRoute } from '../middlewares';
import {
  aiSearchController,
  createListingController,
  getListingDetailController,
  getListingsController,
} from '../controllers/listings.controller';

export function registerListingsRoutes(router: Router): void {
  router.get('/listings', asyncRoute(getListingsController));
  router.get('/listings/search', asyncRoute(aiSearchController));
  router.get('/listings/:id', asyncRoute(getListingDetailController));
  router.post('/listings', asyncRoute(createListingController));
}
