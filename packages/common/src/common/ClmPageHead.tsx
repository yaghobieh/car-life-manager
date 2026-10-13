import type { ClmPageHeadProps } from './common.types';

export function ClmPageHead(props: ClmPageHeadProps) {
  const { title, subtitle } = props;
  return (
    <div className="Clm-page-head">
      <h1 className="Clm-page-title">{title}</h1>
      {subtitle ? <p className="Clm-page-sub">{subtitle}</p> : null}
    </div>
  );
}
