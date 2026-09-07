import { Navigate } from 'react-router-dom';
import { Box, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { CARD_RADIUS_XL, COLOR_BG, FLEX_GAP_MD, ROUTE_PROPERTY } from '@const';
import { PropertyShell } from '@components/PropertyShell';
import { useAppState } from '@hooks';
import { bootstrapPropertyStore } from '@store';
import { authHref } from '../../Route.utils';

bootstrapPropertyStore();

export function PropertyGate() {
  const { user, authReady, error, refresh } = useAppState();
  const t = useTranslate();
  if (!authReady) {
    return null;
  }
  if (!user) return <Navigate to={authHref(ROUTE_PROPERTY)} replace />;
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
  return <PropertyShell />;
}
