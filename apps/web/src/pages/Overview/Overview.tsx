import { Badge, Card, CardBody, CardHeader, Flex, Grid, GridItem, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { vehicleStatusFromDates } from '@clm/shared';
import {
  COLOR_GREEN,
  COLOR_MUTED,
  EXPENSE_SPAN,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  GRID_COLS,
  GRID_GAP,
  HERO_CAR_SPAN,
  HERO_META_SPAN,
  META_COLS,
  SERVICE_SPAN,
  STATUS_SPAN,
  TASK_SPAN,
  VISIBLE_TASK_COUNT,
  ZERO,
} from '@const';
import { CarArt } from '@components/CarArt';
import { EmptyState } from '@components/EmptyState';
import { StatusBadge } from '@components/StatusBadge';
import { useAppState } from '@hooks';
import { OverviewExpenses } from './Overview.expenses';
import { OverviewReminders } from './Overview.reminders';
import { OVERVIEW_VIEW_EMPTY, OVERVIEW_VIEW_LOADING } from './Overview.const';
import { formatOverviewDate, resolveOverviewView, taskFilterCounts, vehicleSubtitle, vehicleTitle } from './Overview.utils';

export function Overview() {
  const { dashboard, loading, vehicles } = useAppState();
  const t = useTranslate();
  const { locale } = useLingoFormat();
  const view = resolveOverviewView(loading, dashboard, vehicles);

  if (view === OVERVIEW_VIEW_LOADING) {
    return (
      <Card variant="elevated" padding="lg">
        <Typography>{t('loading')}</Typography>
      </Card>
    );
  }

  if (view === OVERVIEW_VIEW_EMPTY || !dashboard) {
    return (
      <Card variant="elevated" padding="lg">
        <EmptyState title={t('noVehicles')} body={t('noVehiclesBody')} />
      </Card>
    );
  }

  const { vehicle, tasks, services, expenseSummary, reminders } = dashboard;
  const status = vehicleStatusFromDates(vehicle);
  const visibleTasks = tasks.slice(ZERO, VISIBLE_TASK_COUNT);
  const counts = taskFilterCounts(tasks);

  return (
    <Flex className="Bear-Overview" direction="column" gap={GRID_GAP}>
      <Grid cols={GRID_COLS} gap={GRID_GAP}>
        <GridItem colSpan={HERO_META_SPAN}>
          <Card variant="elevated" padding="lg">
            <Grid cols={GRID_COLS} gap={GRID_GAP}>
              <GridItem colSpan={HERO_CAR_SPAN}>
                <CarArt />
              </GridItem>
              <GridItem colSpan={HERO_META_SPAN}>
                <Typography color={COLOR_MUTED}>{vehicle.formattedRegistrationNumber}</Typography>
                <Typography variant="h1">{vehicleTitle(vehicle.make, vehicle.model, t('unknown'))}</Typography>
                <Typography color={COLOR_MUTED}>
                  {vehicleSubtitle(vehicle.fuelType, vehicle.modelYear, t('unknown'))}
                </Typography>
                <Badge variant="success" pill>
                  {t('active')}
                </Badge>
                <Grid cols={META_COLS} gap={FLEX_GAP_SM}>
                  <div>
                    <Typography color={COLOR_MUTED}>{t('year')}</Typography>
                    <Typography>{vehicle.modelYear ?? t('unknown')}</Typography>
                  </div>
                  <div>
                    <Typography color={COLOR_MUTED}>{t('roadEntry')}</Typography>
                    <Typography>{formatOverviewDate(vehicle.registrationDate, locale, t('unknown'))}</Typography>
                  </div>
                  <div>
                    <Typography color={COLOR_MUTED}>{t('hand')}</Typography>
                    <Typography>{vehicle.ownershipSequence ?? t('unknown')}</Typography>
                  </div>
                  <div>
                    <Typography color={COLOR_MUTED}>{t('ownershipType')}</Typography>
                    <Typography>{vehicle.ownershipType ?? t('unknown')}</Typography>
                  </div>
                  <div>
                    <Typography color={COLOR_MUTED}>{t('mileage')}</Typography>
                    <Typography>{vehicle.mileage ?? t('unknown')}</Typography>
                  </div>
                </Grid>
                <Typography color={COLOR_MUTED}>
                  {t('source')}: {vehicle.dataSource}
                </Typography>
              </GridItem>
            </Grid>
          </Card>
        </GridItem>
        <GridItem colSpan={STATUS_SPAN}>
          <Card variant="elevated" padding="lg">
            <CardHeader title={t('generalStatus')} />
            <CardBody>
              <Flex direction="column" gap={FLEX_GAP_MD}>
                <Flex justify="between">
                  <Typography>{t('license')}</Typography>
                  <Typography color={COLOR_GREEN} weight="bold">{status.license.label}</Typography>
                </Flex>
                <Flex justify="between">
                  <Typography>{t('test')}</Typography>
                  <Typography color={COLOR_GREEN} weight="bold">{status.test.label}</Typography>
                </Flex>
                <Flex justify="between">
                  <Typography>{t('fee')}</Typography>
                  <Typography color={COLOR_MUTED}>{t('unknown')}</Typography>
                </Flex>
                <Flex justify="between">
                  <Typography>{t('insurance')}</Typography>
                  <Typography color={COLOR_MUTED}>{t('noInsuranceLink')}</Typography>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Grid cols={GRID_COLS} gap={GRID_GAP}>
        <GridItem colSpan={EXPENSE_SPAN}>
          <OverviewExpenses expenseSummary={expenseSummary} />
        </GridItem>
        <GridItem colSpan={TASK_SPAN}>
          <Card variant="elevated" padding="lg">
            <Flex justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
              <Typography variant="h2">{t('leftover')}</Typography>
              <Flex gap={FLEX_GAP_SM} wrap="wrap">
                <Badge variant="primary" pill>{t('all')} {counts.all}</Badge>
                <Badge variant="danger" pill>{t('overdue')} {counts.overdue}</Badge>
                <Badge variant="warning" pill>{t('important')} {counts.important}</Badge>
              </Flex>
            </Flex>
            {visibleTasks.map((task) => (
              <Flex key={task.id} justify="between" align="center" gap={FLEX_GAP_SM}>
                <div>
                  <Typography weight="bold">{task.title}</Typography>
                  <Typography color={COLOR_MUTED}>{task.description}</Typography>
                </div>
                <StatusBadge priority={task.priority} />
              </Flex>
            ))}
          </Card>
        </GridItem>
        <GridItem colSpan={SERVICE_SPAN}>
          <Card variant="elevated" padding="lg">
            <CardHeader title={t('services')} />
            <CardBody>
              {services.map((service) => (
                <Flex key={service.providerId} justify="between" gap={FLEX_GAP_SM}>
                  <div>
                    <Typography weight="bold">{service.name}</Typography>
                    <Typography color={COLOR_MUTED}>{service.note}</Typography>
                  </div>
                  <Badge variant="warning" pill>{t('notSupported')}</Badge>
                </Flex>
              ))}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <OverviewReminders reminders={reminders} />
    </Flex>
  );
}
