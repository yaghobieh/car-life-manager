import { Typography } from '@forgedevstack/bear';
import { COLOR_MUTED } from '@const';

export function VehicleFilePanelBody(props: { body?: string }) {
  const { body } = props;
  if (!body) return null;
  return <Typography color={COLOR_MUTED}>{body}</Typography>;
}
