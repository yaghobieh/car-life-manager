import { Box, useBearMode } from '@forgedevstack/bear';
import { useLocale, useTranslate } from '@forgedevstack/lingo/react';
import { useLocation } from 'react-router-dom';
import { AppLoader, isAppBootLoading } from '@components/AppLoader';
import { bootstrapAppStore } from '@store';
import { useAppState } from '@hooks';
import { fontFamilyForLocale } from './theme/bear.theme';
import { AppRoutes } from './Route';
import { isCarAppPath } from './Route.utils';

bootstrapAppStore();

export function App() {
  const { locale } = useLocale();
  const t = useTranslate();
  const { mode } = useBearMode();
  const { pathname } = useLocation();
  const { loading, authReady, user, dashboard } = useAppState();
  const showLoader = isAppBootLoading(authReady, loading, Boolean(user), Boolean(dashboard), isCarAppPath(pathname));

  return (
    <Box className={`bear-min-h-screen ${mode}`} style={{ fontFamily: fontFamilyForLocale(locale), background: 'var(--clm-paper)', color: 'var(--clm-ink)' }}>
      {showLoader ? <AppLoader label={t('loadingVehicle')} /> : null}
      <AppRoutes />
    </Box>
  );
}
