import { COLOR_WHITE } from '@const';
import {
  CAR_ART_BODY,
  CAR_ART_RIM,
  CAR_ART_STROKE,
  CAR_ART_TIRE,
  CAR_ART_WINDOW,
} from '../CarArt.const';

export function CarArtSvg() {
  return (
    <svg viewBox="0 0 320 140" fill="none">
      <rect x="40" y="52" width="240" height="46" rx="18" fill={CAR_ART_BODY} />
      <path d="M70 86h180c8 0 14-8 12-16l-10-34c-3-10-12-16-22-16H120c-12 0-22 8-26 19l-10 31c-2 8 4 16 12 16Z" fill={COLOR_WHITE} stroke={CAR_ART_STROKE} />
      <circle cx="108" cy="98" r="16" fill={CAR_ART_TIRE} />
      <circle cx="108" cy="98" r="7" fill={CAR_ART_RIM} />
      <circle cx="214" cy="98" r="16" fill={CAR_ART_TIRE} />
      <circle cx="214" cy="98" r="7" fill={CAR_ART_RIM} />
      <rect x="128" y="48" width="70" height="22" rx="6" fill={CAR_ART_WINDOW} />
    </svg>
  );
}
