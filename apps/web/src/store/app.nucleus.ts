import { createNucleus } from '@forgedevstack/synapse';
import { api } from '@api';
import type { AppNucleusState } from './app.nucleus.types';
import { APP_NUCLEUS_NAME } from './app.nucleus.const';

const bootstrap = { started: false };

export const appNucleus = createNucleus<AppNucleusState>(
  (set, get) => ({
    vehicles: [],
    currentId: null,
    dashboard: null,
    loading: true,
    error: null,
    refresh: async () => {
      set({ loading: true, error: null });
      try {
        const { vehicles } = await api.listVehicles();
        const currentId = get().currentId;
        const selected = currentId && vehicles.some((item) => item.id === currentId)
          ? currentId
          : vehicles[0]?.id ?? null;
        set({
          vehicles,
          currentId: selected,
          dashboard: selected ? await api.dashboard(selected) : null,
          loading: false,
        });
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : String(err),
          loading: false,
        });
      }
    },
    select: (id: string) => {
      set({ currentId: id });
      void api.dashboard(id).then(
        (dashboard) => set({ dashboard }),
        (err: Error) => set({ error: err.message }),
      );
    },
  }),
  { devtoolsName: APP_NUCLEUS_NAME },
);

export function bootstrapAppStore() {
  if (bootstrap.started) return;
  bootstrap.started = true;
  void appNucleus.get().refresh();
}
