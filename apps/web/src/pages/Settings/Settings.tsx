import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  CARD_RADIUS_XL,
  COLOR_MUTED,
  EMPTY_STRING,
  FLEX_GAP_LG,
  FLEX_GAP_MD,
  ROUTE_AUTH,
  TYPO_SECTION_TITLE,
} from '@const';
import { PageHeader } from '@components/PageHeader';
import { useAppState } from '@hooks';
import { logger } from '@logger';
import { SETTINGS_AVATAR_SIZE } from './Settings.const';
import { SettingsPhoto } from './helpers/SettingsPhoto';
import { SettingsStatus } from './helpers/SettingsStatus';
import { SettingsToggle } from './helpers/SettingsToggle';

export function Settings() {
  const { user, refresh, emailNotifyReady, smsNotifyReady } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const [name, setName] = useState(user?.name ?? EMPTY_STRING);
  const [phone, setPhone] = useState(user?.phone ?? EMPTY_STRING);
  const [notifyEmail, setNotifyEmail] = useState(user?.notifyEmail ?? BOOLEAN_TRUE);
  const [notifySms, setNotifySms] = useState(user?.notifySms ?? BOOLEAN_FALSE);
  const [busy, setBusy] = useState(BOOLEAN_FALSE);
  const [saved, setSaved] = useState(BOOLEAN_FALSE);
  const [errorKey, setErrorKey] = useState(EMPTY_STRING);

  if (!user) return <Navigate to={ROUTE_AUTH} replace />;

  async function logout() {
    await api.logout();
    logger.info('logout');
    await refresh();
    navigate(ROUTE_AUTH);
  }

  async function saveProfile() {
    setBusy(BOOLEAN_TRUE);
    setSaved(BOOLEAN_FALSE);
    setErrorKey(EMPTY_STRING);
    try {
      await api.updateProfile({ name, phone, notifyEmail, notifySms });
      logger.info('profile updated');
      await refresh();
      setSaved(BOOLEAN_TRUE);
    } catch {
      setErrorKey('invalidPhone');
    } finally {
      setBusy(BOOLEAN_FALSE);
    }
  }

  const displayName = user.name ?? t('unknown');
  const emailReadyLabel = emailNotifyReady ? t('notifyEmailReady') : t('notifyEmailMissing');
  const smsReadyLabel = smsNotifyReady ? t('notifySmsReady') : t('notifySmsMissing');

  return (
    <Flex className="Bear-Settings" direction="column" gap={FLEX_GAP_LG}>
      <PageHeader title={t('settings')} subtitle={t('pageSubSettings')} />
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Typography variant={TYPO_SECTION_TITLE}>{t('account')}</Typography>
        <Flex align="center" gap={FLEX_GAP_MD}>
          <SettingsPhoto imageUrl={user.imageUrl} displayName={displayName} size={SETTINGS_AVATAR_SIZE} />
          <Flex direction="column" gap={FLEX_GAP_MD}>
            <Typography weight="bold">{displayName}</Typography>
            <Typography color={COLOR_MUTED}>{user.email ?? t('unknown')}</Typography>
          </Flex>
        </Flex>
        <Typography variant={TYPO_SECTION_TITLE}>{t('editProfile')}</Typography>
        <Input label={t('name')} value={name} onChange={(event) => setName(event.target.value)} fullWidth />
        <Input label={t('phone')} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} fullWidth />
        <Typography variant={TYPO_SECTION_TITLE}>{t('notifications')}</Typography>
        <Typography color={COLOR_MUTED}>{t('notifyHelp')}</Typography>
        <Flex gap={FLEX_GAP_MD} wrap="wrap">
          <SettingsToggle
            active={notifyEmail}
            label={t('notifyEmail')}
            onClick={() => setNotifyEmail(!notifyEmail)}
          />
          <SettingsToggle
            active={notifySms}
            label={t('notifySms')}
            onClick={() => setNotifySms(!notifySms)}
          />
        </Flex>
        <Typography color={COLOR_MUTED}>{emailReadyLabel}</Typography>
        <Typography color={COLOR_MUTED}>{smsReadyLabel}</Typography>
        <Typography color={COLOR_MUTED}>{t('calendarHelp')}</Typography>
        <SettingsStatus
          errorKey={errorKey}
          saved={saved}
          errorText={t(errorKey || 'invalidPhone')}
          savedText={t('profileSaved')}
        />
        <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void saveProfile()}>
          {t('save')}
        </Button>
        <Button variant="ghost" onClick={() => void logout()}>{t('logout')}</Button>
      </Flex>
    </Card>
    </Flex>
  );
}
