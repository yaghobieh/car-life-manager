import type { ClmPlateProps } from './common.types';

export function ClmPlate(props: ClmPlateProps) {
  return (
    <span className={props.compact ? 'Clm-mini-plate' : 'Clm-plate'}>
      {props.plate}
    </span>
  );
}
