import type { ClmListProps } from './common.types';

export function ClmList(props: ClmListProps) {
  return <div className="Clm-list">{props.children}</div>;
}
