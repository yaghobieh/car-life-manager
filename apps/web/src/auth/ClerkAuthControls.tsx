import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import { Flex } from '@forgedevstack/bear';
import { FLEX_GAP_SM } from '@const';
import { isClerkBrowserReady } from './clerk.utils';

export function ClerkSignedOutActions() {
  if (!isClerkBrowserReady()) return null;
  return (
    <Show when="signed-out">
      <Flex className="Bear-ClerkAuthControls" gap={FLEX_GAP_SM} wrap="wrap">
        <SignInButton />
        <SignUpButton />
      </Flex>
    </Show>
  );
}

export function ClerkSignedInButton() {
  if (!isClerkBrowserReady()) return null;
  return (
    <Show when="signed-in">
      <UserButton />
    </Show>
  );
}
