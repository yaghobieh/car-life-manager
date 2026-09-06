import type { Expense, Task, VehicleLookupResult } from '@clm/shared';
import { HTTP_METHOD_PATCH, HTTP_METHOD_POST } from '@const';
import {
  AUTH_GOOGLE_PATH,
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_ME_PATH,
  AUTH_REGISTER_PATH,
  LOOKUP_PATH,
  TASKS_PATH,
  VEHICLES_PATH,
} from './api.const';
import { apiClient } from './ApiClient';
import type { AuthMePayload, AuthUserPayload, DashboardPayload, VehicleListPayload } from './api.types';

export const api = {
  me: () => apiClient.request<AuthMePayload>(AUTH_ME_PATH),
  login: (email: string, password: string) =>
    apiClient.request<AuthUserPayload>(AUTH_LOGIN_PATH, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify({ email, password }),
    }),
  register: (email: string, password: string, name: string) =>
    apiClient.request<AuthUserPayload>(AUTH_REGISTER_PATH, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify({ email, password, name }),
    }),
  logout: () =>
    apiClient.request<{ user: null }>(AUTH_LOGOUT_PATH, { method: HTTP_METHOD_POST }),
  googleStart: AUTH_GOOGLE_PATH,
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
