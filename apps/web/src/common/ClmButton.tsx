import type { ClmButtonProps } from './common.types';

export function ClmButton(props: ClmButtonProps) {
  const { kind = 'primary', children, onClick, type = 'button', disabled } = props;
  const className = kind === 'outline' ? 'Clm-btn-outline' : 'Clm-btn-primary';
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
