import type { ClmButtonKind, ClmButtonProps } from './common.types';

const CLM_BUTTON_KIND_CLASS: Record<ClmButtonKind, string> = {
  primary: 'Clm-btn-primary',
  outline: 'Clm-btn-outline',
};

export function ClmButton(props: ClmButtonProps) {
  const { kind = 'primary', children, onClick, type = 'button', disabled } = props;
  const className = CLM_BUTTON_KIND_CLASS[kind];
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
