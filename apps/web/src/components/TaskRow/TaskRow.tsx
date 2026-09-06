import { useState } from 'react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import { COLOR_BLUE, COLOR_MUTED, FLEX_GAP_SM, TASK_STATUS_COMPLETED } from '@const';
import { StatusBadge } from '@components/StatusBadge';
import { useAppState } from '@hooks';
import { taskDisplayTitle } from '@locales';
import type { TaskRowProps } from './TaskRow.types';

export function TaskRow(props: TaskRowProps) {
  const { task } = props;
  const { refresh } = useAppState();
  const t = useTranslate();
  const [busy, setBusy] = useState(false);
  const done = task.status === TASK_STATUS_COMPLETED;

  async function complete() {
    setBusy(true);
    try {
      await api.patchTask(task.id, TASK_STATUS_COMPLETED);
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Flex className="Bear-TaskRow" justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
      <Flex direction="column">
        <Typography weight="bold">{taskDisplayTitle(task, t)}</Typography>
        <Typography color={COLOR_MUTED}>{task.description}</Typography>
        {task.externalUrl && (
          <a href={task.externalUrl} target="_blank" rel="noreferrer">
            <Typography color={COLOR_BLUE}>{t('officialSite')}</Typography>
          </a>
        )}
      </Flex>
      <Flex align="center" gap={FLEX_GAP_SM} wrap="wrap">
        <StatusBadge priority={task.priority} />
        {!done && (
          <Button variant="secondary" compact loading={busy} loadingText={t('saving')} onClick={() => void complete()}>
            {t('markDone')}
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
