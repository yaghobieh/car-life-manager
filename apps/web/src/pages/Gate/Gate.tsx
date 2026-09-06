import { Navigate } from 'react-router-dom';
import { Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { FLEX_GAP_MD, ROUTE_ONBOARDING, ZERO } from '@const';
import { AppShell } from '@components/AppShell';
import { useAppState } from '@hooks';

export function Gate() {
  const { vehicles, loading, error, refresh } = useAppState();
  const t = useTranslate();
  if (loading) {
    return (
      <Flex className="bear-min-h-screen" align="center" justify="center">
        <Card variant="elevated" padding="lg">
          <Typography>{t('loading')}</Typography>
        </Card>
      </Flex>
    );
  }
  if (error) {
    return (
      <Flex className="bear-min-h-screen" align="center" justify="center">
        <Card variant="elevated" padding="lg">
          <Flex direction="column" gap={FLEX_GAP_MD}>
            <Typography role="alert">{error}</Typography>
            <Button variant="primary" onClick={() => void refresh()}>{t('retry')}</Button>
          </Flex>
        </Card>
      </Flex>
    );
  }
  if (vehicles.length === ZERO) return <Navigate to={ROUTE_ONBOARDING} replace />;
  return <AppShell />;
}
