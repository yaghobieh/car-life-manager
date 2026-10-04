import {
  API_BASE,
  AUTH_LOGIN_PATH,
  AUTH_REGISTER_PATH,
  DEAL_OWNED,
  PROPERTY_HOMES_PATH,
  ROLE_OWNER,
  VEHICLES_PATH,
} from './mobile.const';
import type { ApiErrorBody, AuthResponse, Home, HomesResponse } from './mobile.types';

export async function apiRequest<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const body = (await response.json().catch(() => ({}))) as T & ApiErrorBody;
  if (!response.ok) {
    throw new Error(body.error ?? `Request failed (${response.status})`);
  }
  return body;
}

export function login(identifier: string, password: string): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(AUTH_LOGIN_PATH, '', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
}

export function register(email: string, password: string, name: string, username: string): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(AUTH_REGISTER_PATH, '', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, role: ROLE_OWNER, username }),
  });
}

export function listHomes(token: string): Promise<HomesResponse> {
  return apiRequest<HomesResponse>(PROPERTY_HOMES_PATH, token);
}

export function addHome(token: string, city: string): Promise<{ home: Home }> {
  return apiRequest(PROPERTY_HOMES_PATH, token, {
    method: 'POST',
    body: JSON.stringify({ dealType: DEAL_OWNED, city }),
  });
}

export function readJson(token: string, path: string): Promise<unknown> {
  return apiRequest<unknown>(path, token);
}

export function addVehicle(token: string, registrationNumber: string): Promise<unknown> {
  return apiRequest(VEHICLES_PATH, token, {
    method: 'POST',
    body: JSON.stringify({ registrationNumber }),
  });
}

export function listListings(): Promise<{ apartments: any[]; cars: any[] }> {
  return apiRequest<{ apartments: any[]; cars: any[] }>('/api/listings', '');
}

export { callApi, useCallApi } from './helpers/useCallApi';
