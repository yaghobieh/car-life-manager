import { Navigate, Route, Routes } from 'react-router-dom';
import {
  CAR_SEGMENT_DOCUMENTS,
  CAR_SEGMENT_EXPENSES,
  CAR_SEGMENT_MAINTENANCE,
  CAR_SEGMENT_REMINDER_ID,
  CAR_SEGMENT_REMINDERS,
  CAR_SEGMENT_REPORTS,
  CAR_SEGMENT_SERVICES,
  CAR_SEGMENT_SETTINGS,
  CAR_SEGMENT_TASKS,
  CAR_SEGMENT_VEHICLE,
  CAR_SEGMENT_VEHICLES,
  PROPERTY_SEGMENT_DOCUMENTS,
  PROPERTY_SEGMENT_EXPENSES,
  PROPERTY_SEGMENT_HOME_ID,
  PROPERTY_SEGMENT_HOMES,
  PROPERTY_SEGMENT_LAWYERS,
  PROPERTY_SEGMENT_LOOKUP,
  PROPERTY_SEGMENT_SAVED,
  PROPERTY_SEGMENT_SEARCH,
  PROPERTY_SEGMENT_SETTINGS,
  ROUTE_AUTH,
  ROUTE_CAR,
  ROUTE_ONBOARDING,
  ROUTE_PLATFORM,
  ROUTE_PROPERTY,
} from '@const';
import {
  Auth,
  CalendarEvent,
  Documents,
  Expenses,
  Gate,
  Maintenance,
  Onboarding,
  Overview,
  PropertyDocuments,
  PropertyExpenses,
  PropertyGate,
  PropertyHome,
  PropertyHomeDetail,
  PropertyHomes,
  PropertyLawyers,
  PropertyLookup,
  PropertySaved,
  PropertySearch,
  PropertySettings,
  Reminders,
  Reports,
  Services,
  Settings,
  Tasks,
  VehicleFile,
  Vehicles,
} from '@pages';
import { LEGACY_REDIRECTS } from './Route.const';
import { PlatformHostRedirect } from './pages/Platform/helpers/PlatformHostRedirect';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTE_PLATFORM} element={<PlatformHostRedirect />} />
      <Route path={`${ROUTE_AUTH}/*`} element={<Auth />} />
      <Route path={ROUTE_ONBOARDING} element={<Onboarding />} />
      <Route path={ROUTE_CAR} element={<Gate />}>
        <Route index element={<Overview />} />
        <Route path={CAR_SEGMENT_VEHICLES} element={<Vehicles />} />
        <Route path={CAR_SEGMENT_VEHICLE} element={<VehicleFile />} />
        <Route path={CAR_SEGMENT_TASKS} element={<Tasks />} />
        <Route path={CAR_SEGMENT_SERVICES} element={<Services />} />
        <Route path={CAR_SEGMENT_EXPENSES} element={<Expenses />} />
        <Route path={CAR_SEGMENT_DOCUMENTS} element={<Documents />} />
        <Route path={CAR_SEGMENT_MAINTENANCE} element={<Maintenance />} />
        <Route path={CAR_SEGMENT_REMINDERS} element={<Reminders />} />
        <Route path={`${CAR_SEGMENT_REMINDERS}/${CAR_SEGMENT_REMINDER_ID}`} element={<CalendarEvent />} />
        <Route path={CAR_SEGMENT_REPORTS} element={<Reports />} />
        <Route path={CAR_SEGMENT_SETTINGS} element={<Settings />} />
      </Route>
      <Route path={ROUTE_PROPERTY} element={<PropertyGate />}>
        <Route index element={<PropertyHome />} />
        <Route path={PROPERTY_SEGMENT_HOMES} element={<PropertyHomes />} />
        <Route path={`${PROPERTY_SEGMENT_HOMES}/${PROPERTY_SEGMENT_HOME_ID}`} element={<PropertyHomeDetail />} />
        <Route path={PROPERTY_SEGMENT_SEARCH} element={<PropertySearch />} />
        <Route path={PROPERTY_SEGMENT_LOOKUP} element={<PropertyLookup />} />
        <Route path={PROPERTY_SEGMENT_EXPENSES} element={<PropertyExpenses />} />
        <Route path={PROPERTY_SEGMENT_SAVED} element={<PropertySaved />} />
        <Route path={PROPERTY_SEGMENT_LAWYERS} element={<PropertyLawyers />} />
        <Route path={PROPERTY_SEGMENT_DOCUMENTS} element={<PropertyDocuments />} />
        <Route path={PROPERTY_SEGMENT_SETTINGS} element={<PropertySettings />} />
      </Route>
      {LEGACY_REDIRECTS.map((item) => (
        <Route key={item.from} path={item.from} element={<Navigate to={item.to} replace />} />
      ))}
    </Routes>
  );
}
