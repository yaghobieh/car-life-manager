import { LoginFields } from './LoginFields';
import { RegisterFields } from './RegisterFields';
import type { AuthFieldsProps } from '../mobile.types';

export function AuthFields(props: AuthFieldsProps) {
  const { isRegister, name, username, email, onName, onUsername, onEmail, identifier, onIdentifier } = props;
  if (isRegister) {
    return (
      <RegisterFields
        name={name}
        username={username}
        email={email}
        onName={onName}
        onUsername={onUsername}
        onEmail={onEmail}
      />
    );
  }
  return <LoginFields identifier={identifier} onIdentifier={onIdentifier} />;
}
