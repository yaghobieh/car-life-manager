import type { Expense, MaintenanceRecord, Reminder, ServiceAnswer, Task, VehicleDocument, VehicleLookupResult } from '@clm/shared';
import { HTTP_METHOD_PATCH, HTTP_METHOD_POST, ICS_PATH_SUFFIX } from '@const';
import {
  AUTH_AUTH0_PATH,
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
import type { AuthMePayload, AuthUserPayload, DashboardPayload, ProfileUpdateInput, VehicleListPayload } from './api.types';

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
  updateProfile: (input: ProfileUpdateInput) =>
    apiClient.request<AuthUserPayload>(AUTH_ME_PATH, {
      method: HTTP_METHOD_PATCH,
      body: JSON.stringify(input),
    }),
  calendarUrl: (vehicleId: string) => `${VEHICLES_PATH}/${vehicleId}${ICS_PATH_SUFFIX}`,
  googleStart: AUTH_GOOGLE_PATH,
  auth0Start: AUTH_AUTH0_PATH,
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
  addDocument: (vehicleId: string, input: Pick<VehicleDocument, 'type' | 'title'> & Partial<VehicleDocument>) =>
    apiClient.request<{ document: VehicleDocument }>(`${VEHICLES_PATH}/${vehicleId}/documents`, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify(input),
    }),
  addReminder: (vehicleId: string, input: Pick<Reminder, 'title' | 'dueDate'>) =>
    apiClient.request<{ reminder: Reminder }>(`${VEHICLES_PATH}/${vehicleId}/reminders`, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify(input),
    }),
  confirmService: (vehicleId: string, providerId: string, answer: ServiceAnswer) =>
    apiClient.request<{ confirmed: boolean }>(`${VEHICLES_PATH}/${vehicleId}/services/${providerId}/confirm`, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify({ answer }),
    }),
  addMaintenance: (vehicleId: string, input: Pick<MaintenanceRecord, 'serviceDate' | 'serviceType'> & Partial<MaintenanceRecord>) =>
    apiClient.request<{ maintenance: MaintenanceRecord }>(`${VEHICLES_PATH}/${vehicleId}/maintenance`, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify(input),
    }),
};
