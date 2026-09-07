import { Box } from '@forgedevstack/bear';
import { useLocale, useTranslate } from '@forgedevstack/lingo/react';
import { useLocation } from 'react-router-dom';
import { COLOR_BG } from '@const';
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
  const { pathname } = useLocation();
  const { loading, authReady, user, dashboard } = useAppState();
  const showLoader = isAppBootLoading(authReady, loading, Boolean(user), Boolean(dashboard), isCarAppPath(pathname));

  return (
    <Box className="bear-min-h-screen light" bg={COLOR_BG} style={{ fontFamily: fontFamilyForLocale(locale) }}>
      {showLoader ? <AppLoader label={t('loadingVehicle')} /> : null}
      <AppRoutes />
    </Box>
  );
}
