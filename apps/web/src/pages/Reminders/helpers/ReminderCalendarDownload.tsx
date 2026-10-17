import { Button, Flex } from '@forgedevstack/bear';
import { api } from '@api';
import { FLEX_GAP_MD } from '@const';

export function ReminderCalendarDownload(props: { vehicleId: string | null; label: string }) {
  const { vehicleId, label } = props;
  if (!vehicleId) return null;
  return (
    <Flex gap={FLEX_GAP_MD}>
      <Button variant="secondary" onClick={() => { window.location.href = api.calendarUrl(vehicleId); }}>
        {label}
      </Button>
    </Flex>
  );
}
