import { Flex, Typography } from '@forgedevstack/bear';
import { FLEX_GAP_SM, ZERO } from '@const';
import { EmptyState } from '@components/EmptyState';
import { vehicleFileRows } from '../VehicleFile.utils';
import type { VehicleFilePanelInput, VehicleTabId } from '../VehicleFile.types';
import { VehicleFilePanelBody } from './VehicleFilePanelBody';

export function VehicleFilePanel(props: {
  tab: VehicleTabId;
  input: VehicleFilePanelInput;
  emptyTitle: string;
  emptyBody: string;
}) {
  const { tab, input, emptyTitle, emptyBody } = props;
  const rows = vehicleFileRows(tab, input);

  if (rows.length === ZERO) {
    return <EmptyState title={emptyTitle} body={emptyBody} />;
  }

  return (
    <Flex className="Bear-VehicleFilePanel" direction="column" gap={FLEX_GAP_SM}>
      {rows.map((row) => (
        <Flex key={row.key} direction="column">
          <Typography weight="bold">{row.title}</Typography>
          <VehicleFilePanelBody body={row.body} />
        </Flex>
      ))}
    </Flex>
  );
}
