import { useToast } from '@forgedevstack/bear';
import { apiClient } from '@api';
import { ERROR_PRESENTATION_TOAST } from '@const';

export function ApiErrorHost() {
  const toast = useToast();
  apiClient.setErrorHandler((error) => {
    if (error.presentation === ERROR_PRESENTATION_TOAST) {
      toast.error(error.message);
    }
  });
  return null;
}
