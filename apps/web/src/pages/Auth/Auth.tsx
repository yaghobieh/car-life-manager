import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api, ApiError } from '@api';
import {
  CARD_RADIUS_XL,
  COLOR_BG,
  COLOR_DANGER,
  COLOR_MUTED,
  COLOR_NAVY_DEEP,
  EMPTY_STRING,
  FLEX_GAP_LG,
  TYPO_PAGE_TITLE,
} from '@const';
import { LocaleSelect } from '@components/LocaleSelect';
import { Logo } from '@components/Logo';
import { useAppState } from '@hooks';
import { logger } from '@logger';
import { AUTH_ERROR_QUERY, AUTH_MODE_LOGIN, AUTH_MODE_REGISTER } from './Auth.const';
import type { AuthMode } from './Auth.types';
import { afterAuthPath, authErrorKey, nextAuthMode } from './Auth.utils';
import { AuthGoogleButton } from './helpers/AuthGoogleButton';

export function Auth() {
  const { user, vehicles, loading, authReady, googleEnabled, refresh } = useAppState();
  const t = useTranslate();
  const [mode, setMode] = useState<AuthMode>(AUTH_MODE_LOGIN);
  const [email, setEmail] = useState(EMPTY_STRING);
  const [password, setPassword] = useState(EMPTY_STRING);
  const [name, setName] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState(EMPTY_STRING);
  const [params] = useSearchParams();
  const queryError = params.get(AUTH_ERROR_QUERY);
  const shownError = errorKey !== EMPTY_STRING ? errorKey : queryError ? authErrorKey(queryError) : EMPTY_STRING;
  const isRegister = mode === AUTH_MODE_REGISTER;

  if (!authReady || loading) {
    return null;
  }

  if (user) return <Navigate to={afterAuthPath(vehicles.length)} replace />;

  async function submit() {
    setBusy(true);
    setErrorKey(EMPTY_STRING);
    try {
      if (isRegister) await api.register(email, password, name);
      else await api.login(email, password);
      logger.info('auth success', mode);
      await refresh();
    } catch (error) {
      logger.warn('auth failed', error);
      setErrorKey(authErrorKey(error instanceof ApiError ? error.code : undefined));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Box bg={COLOR_BG} className="Bear-Auth bear-min-h-screen">
      <Box bg={COLOR_NAVY_DEEP} className="bear-px-4 bear-py-4">
        <Flex justify="between" align="center">
          <Logo onDark />
          <LocaleSelect />
        </Flex>
      </Box>
      <Flex className="bear-min-h-screen bear-p-4" align="center" justify="center">
        <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL} className="bear-w-full bear-max-w-xl">
          <Flex direction="column" gap={FLEX_GAP_LG}>
            <Typography variant={TYPO_PAGE_TITLE} color={COLOR_NAVY_DEEP}>
              {isRegister ? t('registerTitle') : t('loginTitle')}
            </Typography>
            <Typography color={COLOR_MUTED}>{t('authHelp')}</Typography>
            <AuthGoogleButton
              enabled={googleEnabled}
              label={t('connectWithGoogle')}
              unavailableText={t('authGoogleUnavailable')}
              onUnavailable={() => setErrorKey('authGoogleUnavailable')}
            />
            <Flex direction="column" gap={FLEX_GAP_LG}>
              {isRegister && (
                <Input label={t('name')} value={name} onChange={(event) => setName(event.target.value)} fullWidth />
              )}
              <Input label={t('email')} type="email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
              <Input label={t('password')} type="password" value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
              <Button variant="primary" fullWidth loading={busy} loadingText={t('saving')} onClick={() => void submit()}>
                {isRegister ? t('register') : t('login')}
              </Button>
            </Flex>
            {shownError !== EMPTY_STRING && (
              <Typography color={COLOR_DANGER} role="alert">{t(shownError)}</Typography>
            )}
            <Button variant="ghost" fullWidth onClick={() => setMode(nextAuthMode(mode))}>
              {isRegister ? t('haveAccount') : t('needAccount')}
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Box>
  );
}
