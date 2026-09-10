import { PROPERTY_PRODUCT_ENABLED } from '@const';
import type { AuthRegisterPanelProps } from '../Auth.types';
import { AuthRegisterExtras } from './AuthRegisterExtras';
import { AuthRegisterRoleSelect } from './AuthRegisterRoleSelect';

export function AuthRegisterPanel(props: AuthRegisterPanelProps) {
  const { role, onRoleChange, city, onCityChange } = props;
  if (!PROPERTY_PRODUCT_ENABLED) {
    return <AuthRegisterRoleSelect role={role} onRoleChange={onRoleChange} />;
  }
  return (
    <AuthRegisterExtras
      role={role}
      onRoleChange={onRoleChange}
      city={city}
      onCityChange={onCityChange}
    />
  );
}
