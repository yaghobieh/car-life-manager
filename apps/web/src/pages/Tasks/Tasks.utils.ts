import { TASK_COLUMN_DEFS } from './Tasks.const';

export function taskColumns(t: (key: string) => string) {
  return TASK_COLUMN_DEFS.map((column) => ({
    id: column.id,
    accessor: column.accessor,
    header: t(column.headerKey),
  }));
}
