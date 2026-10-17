import { Button } from '@forgedevstack/bear';
import type { SettingsToggleProps } from '../Settings.types';

export function SettingsToggle(props: SettingsToggleProps) {
  const { active, label, onClick } = props;
  return (
    <Button variant={active ? 'primary' : 'ghost'} onClick={onClick}>
      {label}
    </Button>
  );
}
