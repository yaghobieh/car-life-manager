import { VEHICLE_COLUMN_DEFS } from './Vehicles.const';

export function vehicleColumns(t: (key: string) => string) {
  return VEHICLE_COLUMN_DEFS.map((column) => ({
    id: column.id,
    accessor: column.accessor,
    header: t(column.headerKey),
  }));
}
