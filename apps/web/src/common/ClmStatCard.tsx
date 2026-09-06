import type { ClmStatCardProps } from './common.types';

export function ClmStatCard(props: ClmStatCardProps) {
  const { title, value, note, iconSrc, noteTone } = props;
  return (
    <article className="Clm-card">
      <div className="Clm-card-head">
        <span className="Clm-card-title">{title}</span>
        {iconSrc ? <img src={iconSrc} alt="" width={16} height={16} /> : null}
      </div>
      <div className="Clm-card-value">{value}</div>
      <div className={noteTone === 'bad' ? 'Clm-card-note Clm-card-note--bad' : 'Clm-card-note'}>{note}</div>
    </article>
  );
}
