import {
  NAV_DOCUMENTS,
  NAV_EXPENSES,
  NAV_MAINTENANCE,
  NAV_OVERVIEW,
  NAV_REMINDERS,
  NAV_REPORTS,
  NAV_SERVICES,
  NAV_SETTINGS,
  NAV_TASKS,
  NAV_VEHICLES,
  ROUTE_DOCUMENTS,
  ROUTE_EXPENSES,
  ROUTE_HOME,
  ROUTE_MAINTENANCE,
  ROUTE_REMINDERS,
  ROUTE_REPORTS,
  ROUTE_SERVICES,
  ROUTE_SETTINGS,
  ROUTE_TASKS,
  ROUTE_VEHICLES,
} from '@const';
import type { NavItem } from './AppShell.types';

export const NAV_ITEMS: NavItem[] = [
  { id: NAV_OVERVIEW, to: ROUTE_HOME, labelKey: 'overview', shortLabelKey: 'overviewShort' },
  { id: NAV_VEHICLES, to: ROUTE_VEHICLES, labelKey: 'vehicles', shortLabelKey: 'vehiclesShort' },
  { id: NAV_TASKS, to: ROUTE_TASKS, labelKey: 'tasks', shortLabelKey: 'tasksShort' },
  { id: NAV_SERVICES, to: ROUTE_SERVICES, labelKey: 'services' },
  { id: NAV_EXPENSES, to: ROUTE_EXPENSES, labelKey: 'expenses', shortLabelKey: 'expensesShort' },
  { id: NAV_DOCUMENTS, to: ROUTE_DOCUMENTS, labelKey: 'documents' },
  { id: NAV_MAINTENANCE, to: ROUTE_MAINTENANCE, labelKey: 'maintenance' },
  { id: NAV_REMINDERS, to: ROUTE_REMINDERS, labelKey: 'reminders' },
  { id: NAV_REPORTS, to: ROUTE_REPORTS, labelKey: 'reports' },
  { id: NAV_SETTINGS, to: ROUTE_SETTINGS, labelKey: 'settings' },
];

export const MOBILE_PRIMARY_NAV_IDS = [NAV_OVERVIEW, NAV_VEHICLES, NAV_TASKS, NAV_EXPENSES];
