export function asTableRows<T extends object>(rows: T[]): Array<T & Record<string, unknown>> {
  return rows as Array<T & Record<string, unknown>>;
}
