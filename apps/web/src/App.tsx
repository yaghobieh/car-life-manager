import { Box } from '@forgedevstack/bear';
import { useLocale, useTranslate } from '@forgedevstack/lingo/react';
import { COLOR_BG } from '@const';
import { AppLoader, isAppBootLoading } from '@components/AppLoader';
import { bootstrapAppStore } from '@store';
import { ClerkApiSync } from './auth/ClerkApiSync';
import { isClerkBrowserReady } from './auth/clerk.utils';
import { useAppState } from '@hooks';
import { fontFamilyForLocale } from './theme/bear.theme';
import { AppRoutes } from './Route';

bootstrapAppStore();

export function App() {
  const { locale } = useLocale();
  const t = useTranslate();
  const { loading, authReady, user, dashboard } = useAppState();
  const showLoader = isAppBootLoading(authReady, loading, Boolean(user), Boolean(dashboard));

  return (
    <Box className="bear-min-h-screen light" bg={COLOR_BG} style={{ fontFamily: fontFamilyForLocale(locale) }}>
      {isClerkBrowserReady() ? <ClerkApiSync /> : null}
      {showLoader ? <AppLoader label={t('loadingVehicle')} /> : null}
      <AppRoutes />
    </Box>
  );
}
