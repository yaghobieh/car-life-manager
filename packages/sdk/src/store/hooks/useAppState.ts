import { useNucleus } from '@forgedevstack/synapse';
import { appNucleus } from '../modules/App';

export function useAppState() {
  return useNucleus(appNucleus);
}
