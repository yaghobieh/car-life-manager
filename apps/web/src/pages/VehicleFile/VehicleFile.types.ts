import type { DashboardPayload } from '@api';
import type { VEHICLE_TABS } from './VehicleFile.const';

export type VehicleTabId = (typeof VEHICLE_TABS)[number]['id'];

export interface VehicleFileRow {
  key: string;
  title: string;
  body?: string;
}

export interface VehicleFilePanelProps {
  tab: VehicleTabId;
  dashboard: DashboardPayload;
  emptyTitle: string;
  emptyBody: string;
}

export interface VehicleFilePanelInput {
  dashboard: DashboardPayload;
  unknownLabel: string;
  intro: string;
  yearLabel: string;
  colorLabel: string;
  handLabel: string;
  licenseLabel: string;
  testLabel: string;
  timelineTitle: (type: string) => string;
}
