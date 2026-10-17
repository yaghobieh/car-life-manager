import { BOOLEAN_FALSE, BOOLEAN_TRUE } from '@const';

export function isAppBootLoading(
  authReady: boolean,
  loading: boolean,
  hasUser: boolean,
  hasDashboard: boolean,
): boolean {
  if (!authReady) return BOOLEAN_TRUE;
  if (loading && !hasUser) return BOOLEAN_TRUE;
  if (loading && hasUser && !hasDashboard) return BOOLEAN_TRUE;
  return BOOLEAN_FALSE;
}
