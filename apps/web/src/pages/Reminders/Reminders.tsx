import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Typography } from '@forgedevstack/bear';
import { useLocale, useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import { EMPTY_STRING, SVG_EMPTY_REMINDER, ZERO } from '@const';
import { ClmButton, ClmEmpty, ClmList, ClmPageHead, ClmRow, ClmSectionTitle } from '@common';
import { useAppState } from '@hooks';
import { reminderEventPath } from '../CalendarEvent';
import { ReminderCalendarDownload } from './helpers/ReminderCalendarDownload';
import { formatDisplayDate, todayInputDate } from './Reminders.utils';

export function Reminders() {
  const { dashboard, currentId, refresh, user, smsNotifyReady } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const { locale } = useLocale();
  const reminders = dashboard?.reminders ?? [];
  const [showForm, setShowForm] = useState(reminders.length > ZERO);
  const [title, setTitle] = useState(EMPTY_STRING);
  const [dueDate, setDueDate] = useState(todayInputDate());
  const [busy, setBusy] = useState(false);
  const smsReady = Boolean(smsNotifyReady && user?.notifySms && user.phone);

  async function submit() {
    if (!currentId) return;
    setBusy(true);
    try {
      await api.addReminder(currentId, { title, dueDate });
      setTitle(EMPTY_STRING);
      setDueDate(todayInputDate());
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="Bear-Reminders">
      <ClmPageHead title={t('reminders')} subtitle={t('pageSubReminders')} />
      {reminders.length === ZERO && !showForm ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_REMINDER}
          title={t('noRemindersTitle')}
          body={t('noRemindersBody')}
          action={<ClmButton onClick={() => setShowForm(true)}>{t('setReminder')}</ClmButton>}
        />
      ) : (
        <>
          {reminders.length > ZERO && (
            <ClmList>
              {reminders.map((reminder) => (
                <ClmRow
                  key={reminder.id}
                  iconSrc={SVG_EMPTY_REMINDER}
                  title={reminder.title}
                  subtitle={formatDisplayDate(reminder.dueDate, locale)}
                  action={(
                    <ClmButton
                      kind="outline"
                      onClick={() => navigate(reminderEventPath(reminder.id))}
                    >
                      {t('openCalendarEvent')}
                    </ClmButton>
                  )}
                />
              ))}
            </ClmList>
          )}
          <div className="Clm-form-card">
            <ClmSectionTitle title={t('reminderFormTitle')} />
            <Typography>{t('reminderFormHelp')}</Typography>
            {smsReady ? <Typography>{t('reminderSmsHint')}</Typography> : null}
            <Input label={t('title')} value={title} onChange={(event) => setTitle(event.target.value)} fullWidth />
            <Input label={t('date')} type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} fullWidth />
            <div className="Clm-form-row">
              <Button variant="primary" disabled={busy} onClick={() => void submit()}>
                {busy ? t('saving') : t('setReminder')}
              </Button>
              <ReminderCalendarDownload vehicleId={currentId} label={t('downloadCalendar')} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
