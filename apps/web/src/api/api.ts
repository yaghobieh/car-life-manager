import type { Expense, Task, VehicleLookupResult } from '@clm/shared';
import { HTTP_JSON } from '@const';
import { LOOKUP_PATH, TASKS_PATH, VEHICLES_PATH } from './api.const';
import type { ApiErrorBody, DashboardPayload, VehicleListPayload } from './api.types';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': HTTP_JSON, ...(init?.headers ?? {}) },
    ...init,
  });
  const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
  if (!response.ok) {
    throw new Error(body.error ?? `Request failed (${response.status})`);
  }
  return body as T;
}

export const api = {
  lookup: (plate: string) =>
    request<VehicleLookupResult>(`${LOOKUP_PATH}/${encodeURIComponent(plate)}`),
  listVehicles: () => request<VehicleListPayload>(VEHICLES_PATH),
  addVehicle: (registrationNumber: string) =>
    request<{ vehicle: unknown; created: boolean }>(VEHICLES_PATH, {
      method: 'POST',
      body: JSON.stringify({ registrationNumber }),
    }),
  dashboard: (id: string) => request<DashboardPayload>(`${VEHICLES_PATH}/${id}`),
  patchTask: (id: string, status: string) =>
    request<{ task: Task }>(`${TASKS_PATH}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  addExpense: (vehicleId: string, input: Partial<Expense>) =>
    request<{ expense: Expense }>(`${VEHICLES_PATH}/${vehicleId}/expenses`, {
      method: 'POST',
      body: JSON.stringify(input),
    }),
};
