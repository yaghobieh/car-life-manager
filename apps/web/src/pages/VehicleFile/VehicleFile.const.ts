import {
  VEHICLE_TAB_DETAILS,
  VEHICLE_TAB_DOCUMENTS,
  VEHICLE_TAB_EXPENSES,
  VEHICLE_TAB_MAINTENANCE,
  VEHICLE_TAB_OVERVIEW,
  VEHICLE_TAB_SERVICES,
  VEHICLE_TAB_TIMELINE,
} from '@const';

export const VEHICLE_TABS = [
  { id: VEHICLE_TAB_OVERVIEW, labelKey: 'overview' },
  { id: VEHICLE_TAB_DETAILS, labelKey: 'vehicleDetails' },
  { id: VEHICLE_TAB_DOCUMENTS, labelKey: 'documents' },
  { id: VEHICLE_TAB_SERVICES, labelKey: 'services' },
  { id: VEHICLE_TAB_EXPENSES, labelKey: 'expenses' },
  { id: VEHICLE_TAB_MAINTENANCE, labelKey: 'maintenance' },
  { id: VEHICLE_TAB_TIMELINE, labelKey: 'vehicleTimeline' },
] as const;
