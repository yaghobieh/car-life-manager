import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import {
  CARD_RADIUS_XL,
  COLOR_DANGER,
  COLOR_GREEN,
  COLOR_MUTED,
  EMPTY_STRING,
  FLEX_GAP_LG,
  FLEX_GAP_MD,
  ROUTE_AUTH,
  TYPO_SECTION_TITLE,
} from '@const';
import { useAppState } from '@hooks';
import { logger } from '@logger';
import { SETTINGS_AVATAR_SIZE } from './Settings.const';

export function Settings() {
  const { user, refresh } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const [name, setName] = useState(user?.name ?? EMPTY_STRING);
  const [phone, setPhone] = useState(user?.phone ?? EMPTY_STRING);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorKey, setErrorKey] = useState(EMPTY_STRING);

  if (!user) return <Navigate to={ROUTE_AUTH} replace />;

  async function logout() {
    await api.logout();
    logger.info('logout');
    await refresh();
    navigate(ROUTE_AUTH);
  }

  async function saveProfile() {
    setBusy(true);
    setSaved(false);
    setErrorKey(EMPTY_STRING);
    try {
      await api.updateProfile(name, phone);
      logger.info('profile updated');
      await refresh();
      setSaved(true);
    } catch {
      setErrorKey('invalidPhone');
    } finally {
      setBusy(false);
    }
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
        <Typography variant={TYPO_SECTION_TITLE}>{t('editProfile')}</Typography>
        <Input
          label={t('name')}
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
        <Input
          label={t('phone')}
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          fullWidth
        />
        {errorKey !== EMPTY_STRING && (
          <Typography color={COLOR_DANGER} role="alert">{t(errorKey)}</Typography>
        )}
        {saved && <Typography color={COLOR_GREEN}>{t('profileSaved')}</Typography>}
        <Button
          variant="primary"
          loading={busy}
          loadingText={t('saving')}
          onClick={() => void saveProfile()}
        >
          {t('save')}
        </Button>
        <Button variant="ghost" onClick={() => void logout()}>{t('logout')}</Button>
      </Flex>
    </Card>
  );
}
