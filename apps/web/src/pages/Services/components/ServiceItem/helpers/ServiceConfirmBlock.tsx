import { Button, Flex, Typography } from '@forgedevstack/bear';
import { COLOR_MUTED, FLEX_GAP_SM } from '@const';
import type { ServiceItemProps } from '../../../Services.types';

export function ServiceConfirmBlock(props: ServiceItemProps) {
  const {
    isOfficial,
    confirmed,
    confirmedHelp,
    notVerifiedHelp,
    confirmLabel,
    checkLaterLabel,
    answers,
    busy,
    savingLabel,
    onConfirm,
  } = props;
  if (isOfficial) return null;
  const help = confirmed ? confirmedHelp : notVerifiedHelp;
  return (
    <Flex direction="column" gap={FLEX_GAP_SM}>
      <Typography color={COLOR_MUTED}>{help}</Typography>
      <Typography>{confirmLabel}</Typography>
      <Typography color={COLOR_MUTED}>{checkLaterLabel}</Typography>
      <Flex gap={FLEX_GAP_SM} wrap="wrap">
        {answers.map((answer) => (
          <Button
            key={answer.value}
            variant="secondary"
            compact
            loading={busy}
            loadingText={savingLabel}
            onClick={() => onConfirm(answer.value)}
          >
            {answer.label}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}
