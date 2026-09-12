import {
  EMPTY_STRING,
  HTTP_CREDENTIALS_INCLUDE,
  HTTP_JSON,
  HTTP_STATUS_OK,
} from '@const';
import { presentationForStatus } from './api.utils';
import type { ApiClientError, ApiErrorBody, ApiErrorHandler } from './api.types';

export class ApiError extends Error implements ApiClientError {
  status: number;
  code?: string;
  presentation: ApiClientError['presentation'];

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.presentation = presentationForStatus(status);
  }
}

export class ApiClient {
  private token = EMPTY_STRING;
  private onError: ApiErrorHandler | null = null;

  setToken(token: string) {
    this.token = token;
  }

  setErrorHandler(handler: ApiErrorHandler) {
    this.onError = handler;
  }

  async request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers);
    headers.set('Content-Type', HTTP_JSON);
    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    const response = await fetch(path, {
      credentials: HTTP_CREDENTIALS_INCLUDE,
      ...init,
      headers,
    });
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    if (response.status < HTTP_STATUS_OK || !response.ok) {
      const error = new ApiError(body.error ?? `Request failed (${response.status})`, response.status, body.code);
      this.onError?.(error);
      throw error;
    }
    return body as T;
  }

  async requestBlob(path: string): Promise<Blob> {
    const headers = new Headers();
    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }
    const response = await fetch(path, {
      credentials: HTTP_CREDENTIALS_INCLUDE,
      headers,
    });
    if (response.status < HTTP_STATUS_OK || !response.ok) {
      const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
      const error = new ApiError(body.error ?? `Request failed (${response.status})`, response.status, body.code);
      this.onError?.(error);
      throw error;
    }
    return response.blob();
  }
}

export const apiClient = new ApiClient();
