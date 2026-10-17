import { useCallback, useState } from 'react';
import { EMPTY_STRING } from '../constants/generals.const';

export interface ApiResult<T> {
  data: T | null;
  error: string | null;
}

export async function callApi<T>(
  apiFn: () => Promise<T>,
  fallbackErrorMessage: string = 'Operation failed'
): Promise<ApiResult<T>> {
  try {
    const data = await apiFn();
    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err.message : fallbackErrorMessage;
    return { data: null, error };
  }
}

export function useCallApi<T, Args extends unknown[]>(
  apiFn: (...args: Args) => Promise<T>,
  fallbackErrorMessage: string = 'Operation failed'
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(EMPTY_STRING);

  const execute = useCallback(
    async (...args: Args): Promise<ApiResult<T>> => {
      setLoading(true);
      setError(EMPTY_STRING);
      try {
        const result = await apiFn(...args);
        setData(result);
        return { data: result, error: null };
      } catch (err) {
        const message = err instanceof Error ? err.message : fallbackErrorMessage;
        setError(message);
        return { data: null, error: message };
      } finally {
        setLoading(false);
      }
    },
    [apiFn, fallbackErrorMessage]
  );

  return { execute, data, loading, error, setError, setData };
}
