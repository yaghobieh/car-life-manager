import type { ClmStatusPillProps } from './common.types';

export function ClmStatusPill(props: ClmStatusPillProps) {
  return (
    <span className={`Clm-status-pill Clm-status-pill--${props.tone}`}>
      <i />
      {props.label}
    </span>
  );
}
