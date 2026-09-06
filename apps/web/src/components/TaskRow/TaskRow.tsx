import { useState } from 'react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import { COLOR_MUTED, FLEX_GAP_SM, TASK_STATUS_COMPLETED } from '@const';
import { StatusBadge } from '@components/StatusBadge';
import { resolveBearId, useAppState, useBearId } from '@hooks';
import { taskDisplayTitle } from '@locales';
import { TaskRowComplete } from './helpers/TaskRowComplete';
import { TaskRowLink } from './helpers/TaskRowLink';
import type { TaskRowProps } from './TaskRow.types';

export function TaskRow(props: TaskRowProps) {
  const { task, onOpen, id, testId } = props;
  const { refresh } = useAppState();
  const t = useTranslate();
  const [busy, setBusy] = useState(false);
  const generatedId = useBearId('TaskRow');
  const domId = resolveBearId(id, generatedId);
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
    <Flex id={domId} data-testid={testId} className="Bear-TaskRow" justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
      <Flex direction="column">
        <Button variant="ghost" compact disableElevation onClick={() => onOpen?.(task)}>
          <Typography weight="bold">{taskDisplayTitle(task, t)}</Typography>
        </Button>
        <Typography color={COLOR_MUTED}>{task.description}</Typography>
        <TaskRowLink href={task.externalUrl} label={t('officialSite')} />
      </Flex>
      <Flex align="center" gap={FLEX_GAP_SM} wrap="wrap">
        <StatusBadge priority={task.priority} />
        <TaskRowComplete
          done={done}
          busy={busy}
          label={t('markDone')}
          loadingText={t('saving')}
          onComplete={() => void complete()}
        />
      </Flex>
    </Flex>
  );
}
