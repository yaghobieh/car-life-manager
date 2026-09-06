import { useNucleus } from '@forgedevstack/synapse';
import { appNucleus } from '@store';

export function useAppState() {
  return useNucleus(appNucleus);
}
