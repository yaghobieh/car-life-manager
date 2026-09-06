import {
  ERROR_PRESENTATION_PAGE,
  ERROR_PRESENTATION_TOAST,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_UNAUTHORIZED,
} from '@const';
import type { ErrorPresentation } from './api.types';

export function presentationForStatus(status: number): ErrorPresentation {
  if (status === HTTP_STATUS_UNAUTHORIZED || status === HTTP_STATUS_FORBIDDEN) {
    return ERROR_PRESENTATION_PAGE;
  }
  return ERROR_PRESENTATION_TOAST;
}
