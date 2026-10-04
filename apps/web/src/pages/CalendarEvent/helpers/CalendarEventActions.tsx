import { Flex } from '@forgedevstack/bear';
import { FLEX_GAP_MD } from '@const';
import { ClmButton } from '@common';
import type { CalendarEventActionsProps } from '../CalendarEvent.types';

export function CalendarEventActions(props: CalendarEventActionsProps) {
  const { downloadLabel, googleLabel, onDownload, onGoogle } = props;
  return (
    <Flex className="Bear-CalendarEventActions" gap={FLEX_GAP_MD} wrap="wrap">
      <ClmButton onClick={onDownload}>{downloadLabel}</ClmButton>
      <ClmButton kind="outline" onClick={onGoogle}>{googleLabel}</ClmButton>
    </Flex>
  );
}
