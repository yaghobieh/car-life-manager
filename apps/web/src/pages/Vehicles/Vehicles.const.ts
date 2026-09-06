export const VEHICLE_COLUMN_DEFS = [
  { id: 'plate', accessor: 'formattedRegistrationNumber', headerKey: 'plate' },
  { id: 'make', accessor: 'make', headerKey: 'make' },
  { id: 'model', accessor: 'model', headerKey: 'model' },
  { id: 'year', accessor: 'modelYear', headerKey: 'year' },
  { id: 'color', accessor: 'color', headerKey: 'color' },
  { id: 'source', accessor: 'dataSource', headerKey: 'source' },
] as const;
