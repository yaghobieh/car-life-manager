import { Navigate, Route, Routes } from 'react-router-dom';
import { Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import {
  FLEX_GAP_MD,
  ROUTE_DOCUMENTS,
  ROUTE_EXPENSES,
  ROUTE_HOME,
  ROUTE_MAINTENANCE,
  ROUTE_ONBOARDING,
  ROUTE_REMINDERS,
  ROUTE_REPORTS,
  ROUTE_SERVICES,
  ROUTE_SETTINGS,
  ROUTE_TASKS,
  ROUTE_VEHICLES,
} from '@const';
import { AppShell } from '@components/AppShell';
import { useAppState } from '@hooks';
import { bootstrapAppStore } from '@store';
import { Expenses, Onboarding, Overview, Services, Simple, Tasks, Vehicles } from '@pages';

bootstrapAppStore();

function Gate() {
  const { vehicles, loading, error, refresh } = useAppState();
  const t = useTranslate();
  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
        <Card variant="elevated" padding="lg">
          <Typography>{t('loading')}</Typography>
        </Card>
      </Flex>
    );
  }
  if (error) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
        <Card variant="elevated" padding="lg">
          <Flex direction="column" gap={FLEX_GAP_MD}>
            <Typography role="alert">{error}</Typography>
            <Button variant="primary" onClick={() => void refresh()}>{t('retry')}</Button>
          </Flex>
        </Card>
      </Flex>
    );
  }
  if (vehicles.length === 0) return <Navigate to={ROUTE_ONBOARDING} replace />;
  return <AppShell />;
}

export function App() {
  return (
    <Routes>
      <Route path={ROUTE_ONBOARDING} element={<Onboarding />} />
      <Route path={ROUTE_HOME} element={<Gate />}>
        <Route index element={<Overview />} />
        <Route path={ROUTE_VEHICLES.slice(1)} element={<Vehicles />} />
        <Route path={ROUTE_TASKS.slice(1)} element={<Tasks />} />
        <Route path={ROUTE_SERVICES.slice(1)} element={<Services />} />
        <Route path={ROUTE_EXPENSES.slice(1)} element={<Expenses />} />
        <Route path={ROUTE_DOCUMENTS.slice(1)} element={<Simple titleKey="documents" bodyKey="noDocuments" />} />
        <Route path={ROUTE_MAINTENANCE.slice(1)} element={<Simple titleKey="maintenance" bodyKey="noMaintenance" />} />
        <Route path={ROUTE_REMINDERS.slice(1)} element={<Simple titleKey="reminders" bodyKey="noReminders" />} />
        <Route path={ROUTE_REPORTS.slice(1)} element={<Simple titleKey="reports" bodyKey="reportsBody" />} />
        <Route path={ROUTE_SETTINGS.slice(1)} element={<Simple titleKey="settings" bodyKey="settingsBody" />} />
      </Route>
    </Routes>
  );
}
