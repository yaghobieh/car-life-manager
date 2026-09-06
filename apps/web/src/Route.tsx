import { Route, Routes } from 'react-router-dom';
import {
  ROUTE_AUTH,
  ROUTE_DOCUMENTS,
  ROUTE_EXPENSES,
  ROUTE_HOME,
  ROUTE_LANDING,
  ROUTE_MAINTENANCE,
  ROUTE_ONBOARDING,
  ROUTE_REMINDERS,
  ROUTE_REPORTS,
  ROUTE_SERVICES,
  ROUTE_SETTINGS,
  ROUTE_TASKS,
  ROUTE_VEHICLE,
  ROUTE_VEHICLES,
} from '@const';
import { Auth, Documents, Expenses, Gate, Landing, Maintenance, Onboarding, Overview, Reminders, Reports, Services, Settings, Tasks, VehicleFile, Vehicles } from '@pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTE_LANDING} element={<Landing />} />
      <Route path={ROUTE_AUTH} element={<Auth />} />
      <Route path={ROUTE_ONBOARDING} element={<Onboarding />} />
      <Route path={ROUTE_HOME} element={<Gate />}>
        <Route index element={<Overview />} />
        <Route path={ROUTE_VEHICLES.slice(1)} element={<Vehicles />} />
        <Route path={ROUTE_VEHICLE.slice(1)} element={<VehicleFile />} />
        <Route path={ROUTE_TASKS.slice(1)} element={<Tasks />} />
        <Route path={ROUTE_SERVICES.slice(1)} element={<Services />} />
        <Route path={ROUTE_EXPENSES.slice(1)} element={<Expenses />} />
        <Route path={ROUTE_DOCUMENTS.slice(1)} element={<Documents />} />
        <Route path={ROUTE_MAINTENANCE.slice(1)} element={<Maintenance />} />
        <Route path={ROUTE_REMINDERS.slice(1)} element={<Reminders />} />
        <Route path={ROUTE_REPORTS.slice(1)} element={<Reports />} />
        <Route path={ROUTE_SETTINGS.slice(1)} element={<Settings />} />
      </Route>
    </Routes>
  );
}
