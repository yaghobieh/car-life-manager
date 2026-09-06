import { bootstrapAppStore } from '@store';
import { AppRoutes } from './Route';

bootstrapAppStore();

export function App() {
  return <AppRoutes />;
}
