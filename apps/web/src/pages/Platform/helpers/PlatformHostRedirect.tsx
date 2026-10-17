import { Navigate } from 'react-router-dom';
import { Landing } from '../../Landing';
import { productPathForHost } from '../../../Route.utils';

export function PlatformHostRedirect() {
  const hostPath = productPathForHost(window.location.hostname);
  if (hostPath) return <Navigate to={hostPath} replace />;
  return <Landing />;
}
