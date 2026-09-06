import {
  VEHICLE_TAB_DETAILS,
  VEHICLE_TAB_DOCUMENTS,
  VEHICLE_TAB_EXPENSES,
  VEHICLE_TAB_MAINTENANCE,
  VEHICLE_TAB_OVERVIEW,
  VEHICLE_TAB_SERVICES,
  VEHICLE_TAB_TIMELINE,
} from '@const';
import type { VehicleFilePanelInput, VehicleFileRow, VehicleTabId } from './VehicleFile.types';

const ROW_BUILDERS: Record<VehicleTabId, (input: VehicleFilePanelInput) => VehicleFileRow[]> = {
  [VEHICLE_TAB_OVERVIEW]: (input) => [{ key: VEHICLE_TAB_OVERVIEW, title: input.intro }],
  [VEHICLE_TAB_DETAILS]: (input) => {
    const vehicle = input.dashboard.vehicle;
    return [
      { key: 'year', title: `${input.yearLabel}: ${vehicle.modelYear ?? input.unknownLabel}` },
      { key: 'color', title: `${input.colorLabel}: ${vehicle.color ?? input.unknownLabel}` },
      { key: 'hand', title: `${input.handLabel}: ${vehicle.ownershipSequence ?? input.unknownLabel}` },
      { key: 'license', title: `${input.licenseLabel}: ${vehicle.registrationExpiry ?? input.unknownLabel}` },
      { key: 'test', title: `${input.testLabel}: ${vehicle.nextTestDate ?? input.unknownLabel}` },
    ];
  },
  [VEHICLE_TAB_DOCUMENTS]: (input) =>
    (input.dashboard.documents ?? []).map((document) => ({ key: document.id, title: document.title })),
  [VEHICLE_TAB_SERVICES]: (input) =>
    (input.dashboard.services ?? []).map((service) => ({ key: service.providerId, title: service.name })),
  [VEHICLE_TAB_EXPENSES]: (input) =>
    (input.dashboard.expenses ?? []).map((expense) => ({
      key: expense.id,
      title: `${expense.category} ${expense.amount}`,
    })),
  [VEHICLE_TAB_MAINTENANCE]: (input) =>
    (input.dashboard.maintenance ?? []).map((record) => ({
      key: record.id,
      title: `${record.serviceType} ${record.serviceDate}`,
    })),
  [VEHICLE_TAB_TIMELINE]: (input) =>
    (input.dashboard.timeline ?? []).map((event) => ({
      key: event.id,
      title: input.timelineTitle(event.type),
      body: event.detail ?? event.occurredAt,
    })),
};

export function vehicleFileRows(tab: VehicleTabId, input: VehicleFilePanelInput): VehicleFileRow[] {
  return ROW_BUILDERS[tab](input);
}
