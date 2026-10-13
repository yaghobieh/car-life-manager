import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, EMPTY_STRING, ROUTE_AUTH } from '@const';
import { ClmButton, ClmList, ClmPageHead, ClmRow, ClmStatusPill } from '@common';
import { LocaleSelect } from '@components/LocaleSelect';
import { useAppState } from '@hooks';
import { logger } from '@logger';
import { SettingsStatus } from '../../Settings/helpers/SettingsStatus';
import { emailHelpKey, emailTestResultKey, smsHelpKey, smsTestResultKey } from '../../Settings/Settings.utils';

export function PropertySettings() {
  const {
    user,
    refresh,
    emailNotifyReady,
    smsNotifyReady,
    smsAccountReady = BOOLEAN_FALSE,
    sendTestSms,
    sendTestEmail,
  } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const [name, setName] = useState(user?.name ?? EMPTY_STRING);
  const [phone, setPhone] = useState(user?.phone ?? EMPTY_STRING);
  const hasPhone = Boolean(phone);
  const hasEmail = Boolean(user?.email);
  const [notifyEmail, setNotifyEmail] = useState(user?.notifyEmail ?? BOOLEAN_TRUE);
  const [notifySms, setNotifySms] = useState(user?.notifySms ?? BOOLEAN_FALSE);
  const [busy, setBusy] = useState(BOOLEAN_FALSE);
  const [saved, setSaved] = useState(BOOLEAN_FALSE);
  const [errorKey, setErrorKey] = useState(EMPTY_STRING);
  const [smsResultKey, setSmsResultKey] = useState(EMPTY_STRING);
  const [emailResultKey, setEmailResultKey] = useState(EMPTY_STRING);
  const [smsBusy, setSmsBusy] = useState(BOOLEAN_FALSE);
  const [emailBusy, setEmailBusy] = useState(BOOLEAN_FALSE);

  async function logout() {
    await api.logout();
    logger.info('logout');
    await refresh();
    navigate(ROUTE_AUTH);
  }

  async function sendSmsCheck() {
    setSmsBusy(BOOLEAN_TRUE);
    setSmsResultKey(EMPTY_STRING);
    try {
      const result = await sendTestSms();
      setSmsResultKey(smsTestResultKey(result.status));
    } catch {
      setSmsResultKey('smsTestFailed');
    } finally {
      setSmsBusy(BOOLEAN_FALSE);
    }
  }

  async function sendEmailCheck() {
    setEmailBusy(BOOLEAN_TRUE);
    setEmailResultKey(EMPTY_STRING);
    try {
      const result = await sendTestEmail();
      setEmailResultKey(emailTestResultKey(result.status));
    } catch {
      setEmailResultKey('emailTestFailed');
    } finally {
      setEmailBusy(BOOLEAN_FALSE);
    }
  }

  async function saveProfile() {
    setBusy(BOOLEAN_TRUE);
    setSaved(BOOLEAN_FALSE);
    setErrorKey(EMPTY_STRING);
    try {
      await api.updateProfile({ name, phone, notifyEmail, notifySms });
      logger.info('property profile updated');
      await refresh();
      setSaved(BOOLEAN_TRUE);
    } catch {
      setErrorKey('invalidPhone');
    } finally {
      setBusy(BOOLEAN_FALSE);
    }
  }

  return (
    <div className="Bear-PropertySettings">
      <ClmPageHead title={t('settings')} subtitle={t('pageSubPropertySettings')} />
      <ClmList>
        <ClmRow
          title={t('interfaceLanguage')}
          subtitle={t('hebrew')}
          action={<LocaleSelect showLabel={BOOLEAN_FALSE} />}
        />
        <ClmRow
          title={t('emailAlerts')}
          subtitle={t(emailHelpKey(emailNotifyReady, hasEmail))}
        />
        <ClmRow
          title={t('connectedAccounts')}
          subtitle={t('propertyConnectionsBody')}
          action={<ClmStatusPill tone="warn" label={t('notSupported')} />}
        />
      </ClmList>
      <div className="Clm-card Clm-form">
        <Input label={t('name')} value={name} onChange={(event) => setName(event.target.value)} fullWidth />
        <Input label={t('phone')} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} fullWidth />
        <ClmButton kind="outline" onClick={() => setNotifyEmail(!notifyEmail)}>
          {t('notifyEmail')}: {notifyEmail ? t('active') : t('change')}
        </ClmButton>
        <ClmButton kind="outline" disabled={emailBusy || !hasEmail} onClick={() => void sendEmailCheck()}>
          {emailBusy ? t('saving') : t('sendTestEmail')}
        </ClmButton>
        {emailResultKey ? (
          <SettingsStatus
            errorKey={emailResultKey === 'emailTestSent' ? EMPTY_STRING : emailResultKey}
            saved={emailResultKey === 'emailTestSent'}
            errorText={t(emailResultKey)}
            savedText={t(emailResultKey)}
          />
        ) : null}
        <ClmRow
          title={t('notifySms')}
          subtitle={t(smsHelpKey(smsNotifyReady, smsAccountReady, hasPhone))}
        />
        <ClmButton kind="outline" onClick={() => setNotifySms(!notifySms)}>
          {t('notifySms')}: {notifySms ? t('active') : t('change')}
        </ClmButton>
        <ClmButton kind="outline" disabled={smsBusy || !hasPhone} onClick={() => void sendSmsCheck()}>
          {smsBusy ? t('saving') : t('sendTestSms')}
        </ClmButton>
        {smsResultKey ? (
          <SettingsStatus
            errorKey={smsResultKey === 'smsTestSent' ? EMPTY_STRING : smsResultKey}
            saved={smsResultKey === 'smsTestSent'}
            errorText={t(smsResultKey)}
            savedText={t(smsResultKey)}
          />
        ) : null}
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
