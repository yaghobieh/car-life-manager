import {
  NAV_GROUP_GENERAL,
  NAV_PROPERTY_OVERVIEW,
  NAV_PROPERTY_SAVED,
  NAV_PROPERTY_SEARCH,
  ROUTE_PROPERTY,
  ROUTE_PROPERTY_SAVED,
  ROUTE_PROPERTY_SEARCH,
  SVG_NAV_OVERVIEW,
  SVG_NAV_SAVED,
  SVG_NAV_SEARCH,
} from '@const';
import type { NavItem } from '../AppShell/AppShell.types';

export const PROPERTY_NAV_ITEMS: NavItem[] = [
  { id: NAV_PROPERTY_OVERVIEW, to: ROUTE_PROPERTY, labelKey: 'propertyOverview', shortLabelKey: 'propertyOverviewShort', group: NAV_GROUP_GENERAL, iconSrc: SVG_NAV_OVERVIEW },
  { id: NAV_PROPERTY_SEARCH, to: ROUTE_PROPERTY_SEARCH, labelKey: 'propertySearch', shortLabelKey: 'propertySearchShort', group: NAV_GROUP_GENERAL, iconSrc: SVG_NAV_SEARCH },
  { id: NAV_PROPERTY_SAVED, to: ROUTE_PROPERTY_SAVED, labelKey: 'propertySaved', shortLabelKey: 'propertySavedShort', group: NAV_GROUP_GENERAL, iconSrc: SVG_NAV_SAVED },
];
