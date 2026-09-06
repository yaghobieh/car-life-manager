import type { ClmSectionTitleProps } from './common.types';

export function ClmSectionTitle(props: ClmSectionTitleProps) {
  return (
    <h3 className="Clm-section-title">
      {props.title}
      <span className="Clm-lane-dash" />
    </h3>
  );
}
