import { Box } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { CLM_GRID_BEAR_OVERRIDE, CLM_GRID_THEME } from '@theme';
import type { ClmGridTableProps } from './ClmGridTable.types';

export function ClmGridTable(props: ClmGridTableProps) {
  return (
    <Box className="Bear-ClmGridTable bear-overflow-x-auto">
      <GridTable
        density="comfortable"
        themeMode="light"
        theme={CLM_GRID_THEME}
        themeOverride={CLM_GRID_BEAR_OVERRIDE}
        mobileLayout="stacked"
        {...props}
      />
    </Box>
  );
}
