import { Box } from '@forgedevstack/bear';
import { useLocale } from '@forgedevstack/lingo/react';
import { COLOR_BG } from '@const';
import { bootstrapAppStore } from '@store';
import { fontFamilyForLocale } from './theme/bear.theme';
import { AppRoutes } from './Route';

bootstrapAppStore();

export function App() {
  const { locale } = useLocale();
  return (
    <Box className="bear-min-h-screen light" bg={COLOR_BG} style={{ fontFamily: fontFamilyForLocale(locale) }}>
      <AppRoutes />
    </Box>
  );
}
