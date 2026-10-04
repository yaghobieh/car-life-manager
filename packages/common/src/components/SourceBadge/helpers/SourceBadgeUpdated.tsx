import { Typography } from '@forgedevstack/bear';
import { COLOR_MUTED } from '@const';
import type { SourceBadgeUpdatedProps } from '../SourceBadge.types';

export function SourceBadgeUpdated(props: SourceBadgeUpdatedProps) {
  const { updatedAt, label, formatDate } = props;
  if (!updatedAt) return null;
  return (
    <Typography color={COLOR_MUTED}>
      {label}: {formatDate(updatedAt)}
    </Typography>
  );
}
