import { useState } from 'react';
import { Input } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { googleCalendarUrl } from '@clm/shared';
import { api } from '@api';
import { DATE_SLICE_LENGTH, EMPTY_STRING, SVG_EMPTY_REMINDER, WINDOW_BLANK, WINDOW_NOREFERRER, ZERO } from '@const';
import { ClmButton, ClmEmpty, ClmList, ClmPageHead, ClmRow } from '@common';
import { useAppState } from '@hooks';
import { ReminderCalendarDownload } from './helpers/ReminderCalendarDownload';

export function Reminders() {
  const { dashboard, currentId, refresh } = useAppState();
  const t = useTranslate();
  const reminders = dashboard?.reminders ?? [];
  const [showForm, setShowForm] = useState(reminders.length > ZERO);
  const [title, setTitle] = useState(EMPTY_STRING);
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, DATE_SLICE_LENGTH));
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!currentId) return;
    setBusy(true);
    try {
      await api.addReminder(currentId, { title, dueDate });
      setTitle(EMPTY_STRING);
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
          <ReminderCalendarDownload vehicleId={currentId} label={t('downloadCalendar')} />
          {reminders.length > ZERO && (
            <ClmList>
              {reminders.map((reminder) => (
                <ClmRow
                  key={reminder.id}
                  iconSrc={SVG_EMPTY_REMINDER}
                  title={reminder.title}
                  subtitle={reminder.dueDate}
                  action={(
                    <ClmButton
                      kind="outline"
                      onClick={() => window.open(googleCalendarUrl({ uid: reminder.id, title: reminder.title, date: reminder.dueDate }), WINDOW_BLANK, WINDOW_NOREFERRER)}
                    >
                      {t('addToGoogleCalendar')}
                    </ClmButton>
                  )}
                />
              ))}
            </ClmList>
          )}
          <div className="Clm-form">
            <Input label={t('title')} value={title} onChange={(event) => setTitle(event.target.value)} fullWidth />
            <Input label={t('date')} type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} fullWidth />
            <ClmButton disabled={busy} onClick={() => void submit()}>{busy ? t('saving') : t('setReminder')}</ClmButton>
          </div>
        </>
      )}
    </div>
  );
}
