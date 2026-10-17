import { SVG_EMPTY_SIZE } from '@const';
import type { ClmEmptyProps } from './common.types';

export function ClmEmpty(props: ClmEmptyProps) {
  const { iconSrc, title, body, action } = props;
  return (
    <div className="Clm-empty">
      <img src={iconSrc} alt="" width={SVG_EMPTY_SIZE} height={SVG_EMPTY_SIZE} />
      <h3>{title}</h3>
      <p>{body}</p>
      {action}
    </div>
  );
}
