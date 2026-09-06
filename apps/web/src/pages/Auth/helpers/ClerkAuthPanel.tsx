import { SignIn, SignUp } from '@clerk/react';
import { Flex } from '@forgedevstack/bear';
import { ROUTE_AUTH } from '@const';
import { AUTH_MODE_REGISTER } from '../Auth.const';
import type { AuthMode } from '../Auth.types';

export function ClerkAuthPanel(props: { mode: AuthMode }) {
  const { mode } = props;
  const isRegister = mode === AUTH_MODE_REGISTER;
  return (
    <Flex className="Bear-ClerkAuthPanel" justify="center">
      {isRegister ? (
        <SignUp routing="path" path={ROUTE_AUTH} signInUrl={ROUTE_AUTH} />
      ) : (
        <SignIn routing="path" path={ROUTE_AUTH} signUpUrl={ROUTE_AUTH} />
      )}
    </Flex>
  );
}
