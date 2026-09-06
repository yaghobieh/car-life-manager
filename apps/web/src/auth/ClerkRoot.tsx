import { ClerkProvider } from '@clerk/react';
import { CLERK_PUBLISHABLE_KEY } from './clerk.const';
import { isClerkBrowserReady } from './clerk.utils';
import type { ClerkRootProps } from './ClerkRoot.types';

export function ClerkRoot(props: ClerkRootProps) {
  const { children } = props;
  if (!isClerkBrowserReady()) return children;
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  );
}
