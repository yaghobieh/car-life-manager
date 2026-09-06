import {
  NAV_DOCUMENTS,
  NAV_EXPENSES,
  NAV_GROUP_GENERAL,
  NAV_GROUP_MANAGE,
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
  { id: NAV_OVERVIEW, to: ROUTE_HOME, labelKey: 'overview', shortLabelKey: 'overviewShort', group: NAV_GROUP_GENERAL },
  { id: NAV_VEHICLES, to: ROUTE_VEHICLES, labelKey: 'vehicles', shortLabelKey: 'vehiclesShort', group: NAV_GROUP_GENERAL },
  { id: NAV_TASKS, to: ROUTE_TASKS, labelKey: 'tasks', shortLabelKey: 'tasksShort', group: NAV_GROUP_GENERAL },
  { id: NAV_SERVICES, to: ROUTE_SERVICES, labelKey: 'services', group: NAV_GROUP_GENERAL },
  { id: NAV_EXPENSES, to: ROUTE_EXPENSES, labelKey: 'expenses', shortLabelKey: 'expensesShort', group: NAV_GROUP_GENERAL },
  { id: NAV_DOCUMENTS, to: ROUTE_DOCUMENTS, labelKey: 'documents', group: NAV_GROUP_MANAGE },
  { id: NAV_MAINTENANCE, to: ROUTE_MAINTENANCE, labelKey: 'maintenance', group: NAV_GROUP_MANAGE },
  { id: NAV_REMINDERS, to: ROUTE_REMINDERS, labelKey: 'reminders', group: NAV_GROUP_MANAGE },
  { id: NAV_REPORTS, to: ROUTE_REPORTS, labelKey: 'reports', group: NAV_GROUP_MANAGE },
  { id: NAV_SETTINGS, to: ROUTE_SETTINGS, labelKey: 'settings', group: NAV_GROUP_MANAGE },
];

export const MOBILE_PRIMARY_NAV_IDS = [NAV_OVERVIEW, NAV_VEHICLES, NAV_TASKS, NAV_EXPENSES];

export const SEARCH_MAKE_ALIASES: Record<string, string> = {
  'קיה': 'kia',
  'טויוטה': 'toyota',
  'יונדאי': 'hyundai',
  'מאזדה': 'mazda',
  'סקודה': 'skoda',
  'פולקסווגן': 'volkswagen',
  'הונדה': 'honda',
  'פורד': 'ford',
  'פיג': 'peugeot',
  'רנו': 'renault',
  'שברולט': 'chevrolet',
  'מרצדס': 'mercedes',
  'במוו': 'bmw',
  'אאודי': 'audi',
};
