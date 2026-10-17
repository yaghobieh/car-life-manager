import { SVG_HERO_SIZE } from '@const';
import type { ClmHeroProps } from './common.types';
import { ClmPlate } from './ClmPlate';
import { ClmStatusPill } from './ClmStatusPill';

export function ClmHero(props: ClmHeroProps) {
  const { eyebrow, title, plate, carSrc, carAlt, pills, meta } = props;
  return (
    <section className="Clm-hero">
      <img className="Clm-hero-car" src={carSrc} alt={carAlt} width={SVG_HERO_SIZE} height={SVG_HERO_SIZE} />
      <div className="Clm-hero-info">
        <div className="Clm-hero-eyebrow">{eyebrow}</div>
        <h2 className="Clm-hero-title">{title}</h2>
        <div className="Clm-hero-plate-row">
          <ClmPlate plate={plate} />
          {pills.map((pill) => (
            <ClmStatusPill key={pill.label} label={pill.label} tone={pill.tone} />
          ))}
        </div>
      </div>
      <div className="Clm-hero-meta">
        {meta.map((item) => (
          <div key={item.label}>{item.label} <b>{item.value}</b></div>
        ))}
      </div>
    </section>
  );
}
