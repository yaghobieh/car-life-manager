import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, EMPTY_STRING, ROUTE_AUTH, TWILIO_SIGNUP_URL } from '@const';
import { ClmButton, ClmList, ClmPageHead, ClmRow, ClmStatusPill } from '@common';
import { LocaleSelect } from '@components/LocaleSelect';
import { OfficialLink } from '@components/OfficialLink';
import { useAppState } from '@hooks';
import { logger } from '@logger';
import { SettingsStatus } from './helpers/SettingsStatus';

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

  return (
    <div className="Bear-Settings">
      <ClmPageHead title={t('settings')} subtitle={t('pageSubSettings')} />
      <ClmList>
        <ClmRow
          title={t('interfaceLanguage')}
          subtitle={t('hebrew')}
          action={<LocaleSelect showLabel={BOOLEAN_FALSE} />}
        />
        <ClmRow
          title={t('emailAlerts')}
          subtitle={emailNotifyReady ? t('notifyEmailReady') : t('notifyEmailMissing')}
          action={(
            <ClmButton kind="outline" onClick={() => setNotifyEmail(!notifyEmail)}>
              {notifyEmail ? t('manage') : t('change')}
            </ClmButton>
          )}
        />
        <ClmRow
          title={t('connectedAccounts')}
          subtitle={t('sourceOfficial')}
          action={<ClmStatusPill tone="good" label={t('active')} />}
        />
      </ClmList>
      <div className="Clm-form">
        <Input label={t('name')} value={name} onChange={(event) => setName(event.target.value)} fullWidth />
        <Input label={t('phone')} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} fullWidth />
        <ClmRow
          title={t('notifySms')}
          subtitle={smsNotifyReady ? t('notifySmsReady') : t('smsSignupHelp')}
          action={<OfficialLink href={TWILIO_SIGNUP_URL} label={t('smsSignupCta')} />}
        />
        <ClmButton kind="outline" onClick={() => setNotifySms(!notifySms)}>
          {t('notifySms')}: {notifySms ? t('active') : t('change')}
        </ClmButton>
        <SettingsStatus
          errorKey={errorKey}
          saved={saved}
          errorText={t(errorKey || 'invalidPhone')}
          savedText={t('profileSaved')}
        />
        <ClmButton disabled={busy} onClick={() => void saveProfile()}>{busy ? t('saving') : t('save')}</ClmButton>
        <ClmButton kind="outline" onClick={() => void logout()}>{t('logout')}</ClmButton>
      </div>
    </div>
  );
}
