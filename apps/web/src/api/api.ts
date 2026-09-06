import type { Expense, Task, VehicleLookupResult } from '@clm/shared';
import { HTTP_METHOD_PATCH, HTTP_METHOD_POST } from '@const';
import { LOOKUP_PATH, TASKS_PATH, VEHICLES_PATH } from './api.const';
import { apiClient } from './ApiClient';
import type { DashboardPayload, VehicleListPayload } from './api.types';

export const api = {
  lookup: (plate: string) =>
    apiClient.request<VehicleLookupResult>(`${LOOKUP_PATH}/${encodeURIComponent(plate)}`),
  listVehicles: () => apiClient.request<VehicleListPayload>(VEHICLES_PATH),
  addVehicle: (registrationNumber: string) =>
    apiClient.request<{ vehicle: unknown; created: boolean }>(VEHICLES_PATH, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify({ registrationNumber }),
    }),
  dashboard: (id: string) => apiClient.request<DashboardPayload>(`${VEHICLES_PATH}/${id}`),
  patchTask: (id: string, status: string) =>
    apiClient.request<{ task: Task }>(`${TASKS_PATH}/${id}`, {
      method: HTTP_METHOD_PATCH,
      body: JSON.stringify({ status }),
    }),
  addExpense: (vehicleId: string, input: Partial<Expense>) =>
    apiClient.request<{ expense: Expense }>(`${VEHICLES_PATH}/${vehicleId}/expenses`, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify(input),
    }),
};
