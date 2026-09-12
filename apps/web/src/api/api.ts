import type {
  Expense,
  Home,
  HomeInput,
  Lawyer,
  LawyerInput,
  MaintenanceRecord,
  OfficialAddress,
  AreaPrice,
  PropertyExpense,
  PropertyExpenseInput,
  Reminder,
  SavedAddress,
  SavedAddressInput,
  ServiceAnswer,
  Task,
  VehicleDocument,
  VehicleLookupResult,
} from '@clm/shared';
import { ADDRESS_QUERY_PARAM, HTTP_METHOD_DELETE, HTTP_METHOD_PATCH, HTTP_METHOD_POST, ICS_PATH_SUFFIX } from '@const';
import {
  AUTH_AUTH0_PATH,
  AUTH_GOOGLE_PATH,
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_ME_PATH,
  AUTH_REGISTER_PATH,
  AUTH_SMS_TEST_PATH,
  LOOKUP_PATH,
  PROPERTY_ADDRESSES_PATH,
  PROPERTY_AREA_PRICES_PATH,
  PROPERTY_EXPENSES_PATH,
  PROPERTY_HOMES_PATH,
  PROPERTY_LAWYERS_PATH,
  PROPERTY_SAVED_PATH,
  TASKS_PATH,
  VEHICLES_PATH,
} from './api.const';
import { apiClient } from './ApiClient';
import type { AuthMePayload, AuthUserPayload, DashboardPayload, DocumentCreateInput, ProfileUpdateInput, SmsTestResult, VehicleListPayload } from './api.types';

export const api = {
  me: () => apiClient.request<AuthMePayload>(AUTH_ME_PATH),
  login: (identifier: string, password: string) =>
    apiClient.request<AuthUserPayload>(AUTH_LOGIN_PATH, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify({ identifier, password }),
    }),
  register: (email: string, password: string, name: string, role: string, username: string) =>
    apiClient.request<AuthUserPayload>(AUTH_REGISTER_PATH, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify({ email, password, name, role, username }),
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
  addDocument: (vehicleId: string, input: DocumentCreateInput) =>
    apiClient.request<{ document: VehicleDocument }>(`${VEHICLES_PATH}/${vehicleId}/documents`, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify(input),
    }),
  documentFileUrl: (vehicleId: string, documentId: string) =>
    `${VEHICLES_PATH}/${vehicleId}/documents/${documentId}/file`,
  downloadDocument: (vehicleId: string, documentId: string) =>
    apiClient.requestBlob(`${VEHICLES_PATH}/${vehicleId}/documents/${documentId}/file`),
  removeDocument: (vehicleId: string, documentId: string) =>
    apiClient.request<{ deleted: boolean }>(`${VEHICLES_PATH}/${vehicleId}/documents/${documentId}`, {
      method: HTTP_METHOD_DELETE,
    }),
  sendTestSms: () =>
    apiClient.request<SmsTestResult>(AUTH_SMS_TEST_PATH, { method: HTTP_METHOD_POST }),
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
  searchAddresses: (query: string) =>
    apiClient.request<{ addresses: OfficialAddress[] }>(
      `${PROPERTY_ADDRESSES_PATH}?${ADDRESS_QUERY_PARAM}=${encodeURIComponent(query)}`,
    ),
  searchAreaPrices: (query: string) =>
    apiClient.request<{ prices: AreaPrice[] }>(
      `${PROPERTY_AREA_PRICES_PATH}?${ADDRESS_QUERY_PARAM}=${encodeURIComponent(query)}`,
    ),
  listSavedAddresses: () => apiClient.request<{ addresses: SavedAddress[] }>(PROPERTY_SAVED_PATH),
  saveAddress: (input: SavedAddressInput) =>
    apiClient.request<{ address: SavedAddress }>(PROPERTY_SAVED_PATH, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify(input),
    }),
  listLawyers: () => apiClient.request<{ lawyers: Lawyer[] }>(PROPERTY_LAWYERS_PATH),
  addLawyer: (input: LawyerInput) =>
    apiClient.request<{ lawyer: Lawyer }>(PROPERTY_LAWYERS_PATH, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify(input),
    }),
  listHomes: () => apiClient.request<{ homes: Home[] }>(PROPERTY_HOMES_PATH),
  addHome: (input: HomeInput) =>
    apiClient.request<{ home: Home }>(PROPERTY_HOMES_PATH, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify(input),
    }),
  listPropertyExpenses: () => apiClient.request<{ expenses: PropertyExpense[] }>(PROPERTY_EXPENSES_PATH),
  addPropertyExpense: (input: PropertyExpenseInput) =>
    apiClient.request<{ expense: PropertyExpense }>(PROPERTY_EXPENSES_PATH, {
      method: HTTP_METHOD_POST,
      body: JSON.stringify(input),
    }),
};
