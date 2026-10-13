import { BOOLEAN_FALSE, BOOLEAN_TRUE } from '@const';

export function isAppBootLoading(
  authReady: boolean,
  loading: boolean,
  hasUser: boolean,
  hasDashboard: boolean,
  needsDashboard = BOOLEAN_TRUE,
): boolean {
  if (!authReady) return BOOLEAN_TRUE;
  if (loading && !hasUser) return BOOLEAN_TRUE;
  if (needsDashboard && loading && hasUser && !hasDashboard) return BOOLEAN_TRUE;
  return BOOLEAN_FALSE;
}
