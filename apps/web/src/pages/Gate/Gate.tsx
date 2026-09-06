import { Navigate } from 'react-router-dom';
import { Box, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { CARD_RADIUS_XL, COLOR_BG, FLEX_GAP_MD, ROUTE_AUTH, ROUTE_ONBOARDING, ZERO } from '@const';
import { AppShell } from '@components/AppShell';
import { useAppState } from '@hooks';

export function Gate() {
  const { user, vehicles, loading, authReady, error, refresh } = useAppState();
  const t = useTranslate();
  if (!authReady || loading) {
    return (
      <Box bg={COLOR_BG} className="bear-min-h-screen">
        <Flex className="bear-min-h-screen" align="center" justify="center">
          <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
            <Typography>{t('loading')}</Typography>
          </Card>
        </Flex>
      </Box>
    );
  }
  if (!user) return <Navigate to={ROUTE_AUTH} replace />;
  if (error) {
    return (
      <Box bg={COLOR_BG} className="bear-min-h-screen">
        <Flex className="bear-min-h-screen" align="center" justify="center">
          <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
            <Flex direction="column" gap={FLEX_GAP_MD}>
              <Typography role="alert">{error}</Typography>
              <Button variant="primary" fullWidth onClick={() => void refresh()}>{t('retry')}</Button>
            </Flex>
          </Card>
        </Flex>
      </Box>
    );
  }
  if (vehicles.length === ZERO) return <Navigate to={ROUTE_ONBOARDING} replace />;
  return <AppShell />;
}
