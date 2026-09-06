import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import { CARD_RADIUS_XL, COLOR_MUTED, FLEX_GAP_LG, FLEX_GAP_MD, ROUTE_AUTH, TYPO_SECTION_TITLE } from '@const';
import { useAppState } from '@hooks';
import { logger } from '@logger';
import { SETTINGS_AVATAR_SIZE } from './Settings.const';

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

  const displayName = user.name ?? t('unknown');

  return (
    <Card className="Bear-Settings" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Typography variant={TYPO_SECTION_TITLE}>{t('account')}</Typography>
        <Flex align="center" gap={FLEX_GAP_MD}>
          {user.imageUrl && (
            <Box className="Bear-Settings__photo" rounded="full">
              <img src={user.imageUrl} alt={displayName} width={SETTINGS_AVATAR_SIZE} height={SETTINGS_AVATAR_SIZE} />
            </Box>
          )}
          <Flex direction="column" gap={FLEX_GAP_MD}>
            <Typography weight="bold">{displayName}</Typography>
            <Typography color={COLOR_MUTED}>{user.email ?? t('unknown')}</Typography>
          </Flex>
        </Flex>
        <Button variant="primary" onClick={() => void logout()}>{t('logout')}</Button>
      </Flex>
    </Card>
  );
}
