import { Navigate } from 'react-router-dom';
import { Platform } from '../Platform';
import { productPathForHost } from '../../../Route.utils';

export function PlatformHostRedirect() {
  const hostPath = productPathForHost(window.location.hostname);
  if (hostPath) return <Navigate to={hostPath} replace />;
  return <Platform />;
}
