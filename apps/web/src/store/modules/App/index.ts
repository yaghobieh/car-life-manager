import { createNucleus } from '@forgedevstack/synapse';
import { BOOLEAN_FALSE, BOOLEAN_TRUE } from '@const';
import { fetchDashboard, fetchVehicleList } from './App.apis';
import { APP_NUCLEUS_NAME } from './App.consts';
import { beginRefresh, refreshFailed, refreshSucceeded } from './App.reducers';
import type { AppNucleusState } from './App.types';
import { resolveSelectedVehicleId } from './App.utils';

const bootstrap = { started: BOOLEAN_FALSE };

export const appNucleus = createNucleus<AppNucleusState>(
  (set, get) => ({
    vehicles: [],
    currentId: null,
    dashboard: null,
    loading: BOOLEAN_TRUE,
    error: null,
    refresh: async () => {
      set(beginRefresh());
      try {
        const { vehicles } = await fetchVehicleList();
        const selected = resolveSelectedVehicleId(get().currentId, vehicles);
        const dashboard = selected ? await fetchDashboard(selected) : null;
        set(refreshSucceeded(vehicles, selected, dashboard));
      } catch (err) {
        set(refreshFailed(err instanceof Error ? err.message : String(err)));
      }
    },
    select: (id: string) => {
      set({ currentId: id });
      void fetchDashboard(id).then(
        (dashboard) => set({ dashboard }),
        (err: Error) => set({ error: err.message }),
      );
    },
  }),
  { devtoolsName: APP_NUCLEUS_NAME },
);

export function bootstrapAppStore() {
  if (bootstrap.started) return;
  bootstrap.started = BOOLEAN_TRUE;
  void appNucleus.get().refresh();
}

export type { AppNucleusState } from './App.types';
