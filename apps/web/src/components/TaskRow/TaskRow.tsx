import { useState } from 'react';
import { Badge, Button } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import { OfficialLink } from '@components/OfficialLink';
import { TASK_PRIORITY_DONE, TASK_STATUS_COMPLETED } from '@const';
import { resolveBearId, useAppState, useBearId } from '@hooks';
import { taskDisplayTitle } from '@locales';
import type { TaskRowProps } from './TaskRow.types';
import { taskStatusIcon } from './TaskRow.utils';

export function TaskRow(props: TaskRowProps) {
  const { task, onOpen, id, testId } = props;
  const { refresh } = useAppState();
  const t = useTranslate();
  const [busy, setBusy] = useState(false);
  const generatedId = useBearId('TaskRow');
  const domId = resolveBearId(id, generatedId);
  const done = task.status === TASK_STATUS_COMPLETED;
  const title = taskDisplayTitle(task, t);
  const isConnect = task.category === 'insurance' || task.category === 'services';

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
    <div id={domId} data-testid={testId} className="Clm-row Bear-TaskRow">
      <div className="Clm-row-icon">
        <img src={taskStatusIcon(task)} alt={title} width={18} height={18} />
      </div>
      <div className="Clm-row-body">
        <div className="Clm-row-title">{title}</div>
        <div className="Clm-row-sub">
          {task.description}
          {task.externalUrl ? (
            <>
              {' · '}
              <OfficialLink href={task.externalUrl} label={t('officialSite')} />
            </>
          ) : null}
        </div>
      </div>
      <div className="Clm-row-action">
        {done ? (
          <Badge variant="success" pill>
            {task.priority === TASK_PRIORITY_DONE ? t('completed') : `${t(task.priority)} · ${t('completed')}`}
          </Badge>
        ) : isConnect ? (
          <Button
            variant={task.category === 'insurance' ? 'primary' : 'secondary'}
            compact
            onClick={() => onOpen?.(task)}
          >
            {t('connect')}
          </Button>
        ) : (
          <Button variant="secondary" compact loading={busy} loadingText={t('saving')} onClick={() => void complete()}>
            {t('markDone')}
          </Button>
        )}
      </div>
    </div>
  );
}
