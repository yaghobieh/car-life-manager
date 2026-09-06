import { useState } from 'react';
import { Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import {
  CARD_RADIUS_XL,
  COLOR_MUTED,
  DATE_SLICE_LENGTH,
  EMPTY_STRING,
  FLEX_GAP_LG,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  ZERO,
} from '@const';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';

export function Reminders() {
  const { dashboard, currentId, refresh } = useAppState();
  const t = useTranslate();
  const reminders = dashboard?.reminders ?? [];
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
    <Card className="Bear-Reminders" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Typography color={COLOR_MUTED}>{t('remindersOfficial')}</Typography>
        <Input label={t('title')} value={title} onChange={(event) => setTitle(event.target.value)} fullWidth />
        <Input label={t('date')} type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} fullWidth />
        <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void submit()}>
          {t('addReminder')}
        </Button>
        {reminders.length === ZERO && <EmptyState title={t('noReminders')} body={t('remindersOfficial')} />}
        {reminders.map((reminder) => (
          <Flex key={reminder.id} direction="column" gap={FLEX_GAP_SM}>
            <Typography weight="bold">{reminder.title}</Typography>
            <Typography color={COLOR_MUTED}>{reminder.dueDate}</Typography>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
