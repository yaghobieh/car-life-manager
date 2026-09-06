import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import { CARD_RADIUS_XL, COLOR_MUTED, FLEX_GAP_LG, FLEX_GAP_MD, ROUTE_AUTH, TYPO_SECTION_TITLE } from '@const';
import { useAppState } from '@hooks';
import { logger } from '@logger';

export function Settings() {
  const { user, refresh } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();

  if (!user) return <Navigate to={ROUTE_AUTH} replace />;

  async function logout() {
    await api.logout();
    logger.info('logout');
    await refresh();
    navigate(ROUTE_AUTH);
  }

  return (
    <Card className="Bear-Settings" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Typography variant={TYPO_SECTION_TITLE}>{t('account')}</Typography>
        <Flex direction="column" gap={FLEX_GAP_MD}>
          <Typography>{user.name ?? t('unknown')}</Typography>
          <Typography color={COLOR_MUTED}>{user.email ?? t('unknown')}</Typography>
        </Flex>
        <Button variant="primary" onClick={() => void logout()}>{t('logout')}</Button>
      </Flex>
    </Card>
  );
}
