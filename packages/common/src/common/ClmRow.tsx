import type { ClmRowProps } from './common.types';
import { ClmRowInner } from './helpers/ClmRowInner';

export function ClmRow(props: ClmRowProps) {
  if (props.onClick) {
    return (
      <button type="button" className="Clm-row" onClick={props.onClick}>
        <ClmRowInner {...props} />
      </button>
    );
  }
  return (
    <div className="Clm-row">
      <ClmRowInner {...props} />
    </div>
  );
}
