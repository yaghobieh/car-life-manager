import type { ClmRowProps } from './common.types';

function ClmRowInner(props: ClmRowProps) {
  const { iconSrc, iconAlt, title, subtitle, action } = props;
  return (
    <>
      {iconSrc ? (
        <div className="Clm-row-icon">
          <img src={iconSrc} alt={iconAlt ?? title} width={18} height={18} />
        </div>
      ) : null}
      <div className="Clm-row-body">
        <div className="Clm-row-title">{title}</div>
        {subtitle ? <div className="Clm-row-sub">{subtitle}</div> : null}
      </div>
      {action ? <div className="Clm-row-action">{action}</div> : null}
    </>
  );
}

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
