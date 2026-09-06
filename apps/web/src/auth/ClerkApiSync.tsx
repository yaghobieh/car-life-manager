import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/react';
import { api, apiClient } from '@api';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, EMPTY_STRING } from '@const';
import { useAppState } from '@hooks';
import { isClerkBrowserReady } from './clerk.utils';

export function ClerkApiSync() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { refresh } = useAppState();
  const synced = useRef(BOOLEAN_FALSE);

  useEffect(() => {
    if (!isClerkBrowserReady() || !isLoaded) return;
    if (!isSignedIn) {
      apiClient.setToken(EMPTY_STRING);
      synced.current = BOOLEAN_FALSE;
      return;
    }
    if (synced.current) return;
    synced.current = BOOLEAN_TRUE;
    void getToken().then(async (token) => {
      apiClient.setToken(token ?? EMPTY_STRING);
      await api.syncClerk();
      await refresh();
    });
  }, [getToken, isLoaded, isSignedIn, refresh]);

  return null;
}
