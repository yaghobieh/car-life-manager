import { Input } from '@forgedevstack/bear';
import type { AuthIdentifierFieldProps } from '../Auth.types';

export function AuthIdentifierField(props: AuthIdentifierFieldProps) {
  const { isRegister, email, identifier, emailLabel, identifierLabel, onEmailChange, onIdentifierChange } = props;
  if (isRegister) {
    return (
      <Input label={emailLabel} type="email" value={email} onChange={(event) => onEmailChange(event.target.value)} fullWidth />
    );
  }
  return (
    <Input label={identifierLabel} value={identifier} onChange={(event) => onIdentifierChange(event.target.value)} fullWidth />
  );
}
