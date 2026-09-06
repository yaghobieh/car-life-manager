import { Box } from '@forgedevstack/bear';
import { COLOR_BG, FONT_FAMILY } from '@const';
import { bootstrapAppStore } from '@store';
import { AppRoutes } from './Route';

bootstrapAppStore();

export function App() {
  return (
    <Box className="bear-min-h-screen" bg={COLOR_BG} style={{ fontFamily: FONT_FAMILY }}>
      <AppRoutes />
    </Box>
  );
}
