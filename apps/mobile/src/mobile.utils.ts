import {
  PALETTE_DARK,
  PALETTE_LIGHT,
  PRODUCT_CAR,
  PROPERTY_ADDRESSES_PATH,
  PROPERTY_AREA_PRICES_PATH,
  PROPERTY_EXPENSES_PATH,
  PROPERTY_HOMES_PATH,
  PROPERTY_LAWYERS_PATH,
  PROPERTY_SAVED_PATH,
  SECTION_DOCUMENTS,
  SECTION_EXPENSES,
  SECTION_HOMES,
  SECTION_LAWYERS,
  SECTION_LOOKUP,
  SECTION_MAINTENANCE,
  SECTION_OVERVIEW,
  SECTION_REMINDERS,
  SECTION_REPORTS,
  SECTION_SAVED,
  SECTION_SEARCH,
  SECTION_SERVICES,
  SECTION_TASKS,
  SECTION_VEHICLES,
  THEME_DARK,
  VEHICLES_PATH,
} from './mobile.const';
import type { MobileRow, Palette } from './mobile.types';

const TITLE_FIELDS = ['title', 'name', 'formattedRegistrationNumber', 'city', 'street'] as const;
const BODY_FIELDS = ['dealType', 'street', 'category', 'amount', 'dueDate', 'status', 'registrationNumber'] as const;

export function paletteFor(mode: string): Palette {
  if (mode === THEME_DARK) return PALETTE_DARK;
  return PALETTE_LIGHT;
}

function textOf(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return '';
}

function recordOf(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return Object.fromEntries(Object.entries(value));
}

export function rowFrom(value: unknown, index: number): MobileRow | null {
  const record = recordOf(value);
  if (!record) return null;
  const title = TITLE_FIELDS.map((key) => textOf(record, key)).find((field) => field.length > 0) ?? '';
  const body = BODY_FIELDS.map((key) => textOf(record, key)).find((field) => field.length > 0 && field !== title) ?? '';
  const id = textOf(record, 'id') || title || String(index);
  if (!title) return null;
  return { id, title, body };
}

export function rowsIn(body: unknown, listKey: string): MobileRow[] {
  const record = recordOf(body);
  if (!record || !listKey) return [];
  const value = record[listKey];
  if (!Array.isArray(value)) return [];
  return value.flatMap((item, index) => {
    const row = rowFrom(item, index);
    return row ? [row] : [];
  });
}

export function sectionPath(product: string, sectionId: string, vehicleId: string, query: string): string {
  const encoded = encodeURIComponent(query.trim());
  const vehiclePaths: Record<string, string> = {
    [SECTION_OVERVIEW]: `${VEHICLES_PATH}/${vehicleId}`,
    [SECTION_TASKS]: `${VEHICLES_PATH}/${vehicleId}/tasks`,
    [SECTION_SERVICES]: `${VEHICLES_PATH}/${vehicleId}/services`,
    [SECTION_EXPENSES]: `${VEHICLES_PATH}/${vehicleId}/expenses`,
    [SECTION_DOCUMENTS]: `${VEHICLES_PATH}/${vehicleId}/documents`,
    [SECTION_MAINTENANCE]: `${VEHICLES_PATH}/${vehicleId}/maintenance`,
    [SECTION_REMINDERS]: `${VEHICLES_PATH}/${vehicleId}/reminders`,
    [SECTION_REPORTS]: `${VEHICLES_PATH}/${vehicleId}/expenses`,
  };
  const homePaths: Record<string, string> = {
    [SECTION_OVERVIEW]: PROPERTY_HOMES_PATH,
    [SECTION_HOMES]: PROPERTY_HOMES_PATH,
    [SECTION_SEARCH]: `${PROPERTY_ADDRESSES_PATH}?q=${encoded}`,
    [SECTION_LOOKUP]: `${PROPERTY_AREA_PRICES_PATH}?q=${encoded}`,
    [SECTION_EXPENSES]: PROPERTY_EXPENSES_PATH,
    [SECTION_LAWYERS]: PROPERTY_LAWYERS_PATH,
    [SECTION_SAVED]: PROPERTY_SAVED_PATH,
  };
  if (product === PRODUCT_CAR) {
    if (sectionId === SECTION_VEHICLES) return VEHICLES_PATH;
    return vehiclePaths[sectionId] ?? '';
  }
  return homePaths[sectionId] ?? '';
}

export function firstVehicleId(body: unknown): string {
  const rows = rowsIn(body, 'vehicles');
  return rows[0]?.id ?? '';
}
