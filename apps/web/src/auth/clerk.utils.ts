import { CLERK_PUBLISHABLE_KEY } from './clerk.const';
import { EMPTY_STRING } from '@const';

export function isClerkBrowserReady(): boolean {
  return CLERK_PUBLISHABLE_KEY !== EMPTY_STRING;
}
