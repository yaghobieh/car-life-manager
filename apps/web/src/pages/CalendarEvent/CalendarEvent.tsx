import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { googleCalendarUrl } from '@clm/shared';
import { COLOR_MUTED, ROUTE_REMINDERS, SVG_EMPTY_REMINDER, WINDOW_BLANK, WINDOW_NOREFERRER } from '@const';
import { ClmButton, ClmEmpty, ClmList, ClmPageHead, ClmRow } from '@common';
import { useAppState } from '@hooks';
import { REMINDER_CALENDAR_NAME } from '../Reminders/Reminders.const';
import { CalendarEventActions } from './helpers/CalendarEventActions';
import { downloadIcs, reminderToCalendarEvent } from './CalendarEvent.utils';

export function CalendarEvent() {
  const { reminderId } = useParams();
  const { dashboard } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const reminder = dashboard?.reminders.find((item) => item.id === reminderId);
  const event = reminder ? reminderToCalendarEvent(reminder) : null;

  if (!reminder || !event) {
    return (
      <div className="Bear-CalendarEvent">
        <ClmPageHead title={t('calendarEventTitle')} subtitle={t('calendarEventHelp')} />
        <ClmEmpty
          iconSrc={SVG_EMPTY_REMINDER}
          title={t('noRemindersTitle')}
          body={t('calendarEventMissing')}
          action={<ClmButton onClick={() => navigate(ROUTE_REMINDERS)}>{t('reminders')}</ClmButton>}
        />
      </div>
    );
  }

  return (
    <div className="Bear-CalendarEvent">
      <ClmPageHead title={t('calendarEventTitle')} subtitle={t('calendarEventHelp')} />
      <ClmList>
        <ClmRow
          iconSrc={SVG_EMPTY_REMINDER}
          title={reminder.title}
          subtitle={reminder.dueDate}
        />
      </ClmList>
      <Typography color={COLOR_MUTED}>{t('calendarEventHelp')}</Typography>
      <CalendarEventActions
        downloadLabel={t('downloadCalendar')}
        googleLabel={t('addToGoogleCalendar')}
        onDownload={() => downloadIcs([event], REMINDER_CALENDAR_NAME)}
        onGoogle={() => window.open(googleCalendarUrl(event), WINDOW_BLANK, WINDOW_NOREFERRER)}
      />
      <ClmButton kind="outline" onClick={() => navigate(ROUTE_REMINDERS)}>{t('back')}</ClmButton>
    </div>
  );
}
