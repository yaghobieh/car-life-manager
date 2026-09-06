import { api } from '@api';

export function fetchVehicleList() {
  return api.listVehicles();
}

export function fetchDashboard(id: string) {
  return api.dashboard(id);
}
