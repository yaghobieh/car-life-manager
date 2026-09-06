import { createNucleus } from '@forgedevstack/synapse';
import { api } from '@api';
import { BOOLEAN_FALSE, BOOLEAN_TRUE } from '@const';
import { logger } from '@logger';
import { fetchDashboard, fetchVehicleList } from './App.apis';
import { APP_NUCLEUS_NAME } from './App.consts';
import { beginRefresh, refreshFailed, refreshSucceeded, refreshUnauthenticated } from './App.reducers';
import type { AppNucleusState } from './App.types';
import { resolveSelectedVehicleId } from './App.utils';

const bootstrap = { started: BOOLEAN_FALSE };

export const appNucleus = createNucleus<AppNucleusState>(
  (set, get) => ({
    user: null,
    googleEnabled: BOOLEAN_FALSE,
    authReady: BOOLEAN_FALSE,
    vehicles: [],
    currentId: null,
    dashboard: null,
    loading: BOOLEAN_TRUE,
    error: null,
    refresh: async () => {
      set(beginRefresh());
      try {
        const session = await api.me();
        if (!session.user) {
          logger.info('session empty');
          set(refreshUnauthenticated(session.googleEnabled));
          return;
        }
        const { vehicles } = await fetchVehicleList();
        const selected = resolveSelectedVehicleId(get().currentId, vehicles);
        const dashboard = selected ? await fetchDashboard(selected) : null;
        set(refreshSucceeded(session.user, session.googleEnabled, vehicles, selected, dashboard));
      } catch (err) {
        logger.error(err);
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
