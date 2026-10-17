import { useNucleus } from '@forgedevstack/synapse';
import { propertyNucleus } from '../modules/Property';

export function usePropertyState() {
  return useNucleus(propertyNucleus);
}
