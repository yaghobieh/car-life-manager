import { useState } from 'react';
import { Box, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { api } from '@api';
import {
  CARD_RADIUS_XL,
  COLOR_MENU_SCRIM,
  COLOR_MUTED,
  FLEX_GAP_LG,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  TASK_STATUS_COMPLETED,
  TYPO_SECTION_TITLE,
} from '@const';
import { SourceBadge } from '@components/SourceBadge';
import { resolveBearId, useAppState, useBearId } from '@hooks';
import { taskDisplayTitle } from '@locales';
import { TaskDrawerComplete } from './helpers/TaskDrawerComplete';
import { TaskDrawerLink } from './helpers/TaskDrawerLink';
import type { TaskDrawerProps } from './TaskDrawer.types';

export function TaskDrawer(props: TaskDrawerProps) {
  const { task, onClose, id, testId } = props;
  const { refresh } = useAppState();
  const t = useTranslate();
  const [busy, setBusy] = useState(false);
  const generatedId = useBearId('TaskDrawer');
  const domId = resolveBearId(id, generatedId);

  if (!task) return null;
  const current = task;
  const done = current.status === TASK_STATUS_COMPLETED;

  async function complete() {
    setBusy(true);
    try {
      await api.patchTask(current.id, TASK_STATUS_COMPLETED);
      await refresh();
      onClose();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Box id={domId} data-testid={testId} className="Bear-TaskDrawer bear-fixed bear-inset-0 bear-z-50">
      <Box className="bear-absolute bear-inset-0" bg={COLOR_MENU_SCRIM} onClick={onClose} />
      <Box className="bear-absolute bear-bottom-0 bear-left-0 bear-right-0">
        <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
          <Flex direction="column" gap={FLEX_GAP_LG}>
            <Typography variant={TYPO_SECTION_TITLE}>{taskDisplayTitle(current, t)}</Typography>
            <SourceBadge source="calculated" />
            <Flex direction="column" gap={FLEX_GAP_SM}>
              <Typography weight="bold">{t('whyItMatters')}</Typography>
              <Typography color={COLOR_MUTED}>{t('taskWhy')}</Typography>
              <Typography color={COLOR_MUTED}>{current.description}</Typography>
            </Flex>
            <Flex direction="column" gap={FLEX_GAP_SM}>
              <Typography weight="bold">{t('whatToDo')}</Typography>
              <TaskDrawerLink href={current.externalUrl} label={t('officialSite')} />
            </Flex>
            <Flex gap={FLEX_GAP_MD} wrap="wrap">
              <TaskDrawerComplete done={done} busy={busy} label={t('finished')} loadingText={t('saving')} onComplete={() => void complete()} />
              <Button variant="ghost" onClick={onClose}>
                {t('back')}
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </Box>
  );
}
