import { useState } from 'react';
import { Badge, Button, Card, Flex, Grid, GridItem, Typography, useIsDesktop } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import { vehicleStatusFromDates } from '@clm/shared';
import {
  CARD_RADIUS_XL,
  CAR_ART_VIEW_3D,
  CAR_ART_VIEW_PHOTO,
  COLOR_BLUE,
  COLOR_INK,
  COLOR_MUTED,
  EXPENSE_SPAN,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  GRID_COLS,
  GRID_GAP,
  HERO_CAR_SPAN,
  HERO_META_SPAN,
  META_COLS,
  ONE,
  ROUTE_SERVICES,
  ROUTE_TASKS,
  SERVICE_SPAN,
  STATUS_TILE_COLS,
  TASK_SPAN,
  TASK_STATUS_COMPLETED,
  TYPO_PAGE_TITLE,
  TYPO_SECTION_TITLE,
  VISIBLE_TASK_COUNT,
  ZERO,
} from '@const';
import { CarArt } from '@components/CarArt';
import { EmptyState } from '@components/EmptyState';
import { ProviderMark } from '@components/ProviderMark';
import { TaskRow } from '@components/TaskRow';
import { useAppState } from '@hooks';
import {
  serviceBadgeVariant,
  serviceStatusKey,
  translatedService,
} from '@locales';
import { OverviewCompare } from './Overview.compare';
import { OverviewExpenses } from './Overview.expenses';
import { OverviewRecalls } from './Overview.recalls';
import { OverviewReminders } from './Overview.reminders';
import { OverviewStatus } from './Overview.status';
import { OVERVIEW_VIEW_EMPTY, OVERVIEW_VIEW_LOADING } from './Overview.const';
import {
  formatOverviewDate,
  resolveOverviewView,
  taskFilterCounts,
  vehicleSubtitle,
  vehicleTitle,
} from './Overview.utils';

export function Overview() {
  const { dashboard, loading, vehicles } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const { locale } = useLingoFormat();
  const isDesktop = useIsDesktop();
  const [carView, setCarView] = useState(CAR_ART_VIEW_PHOTO);
  const view = resolveOverviewView(loading, dashboard, vehicles);
  const pageCols = isDesktop ? GRID_COLS : ONE;
  const carSpan = isDesktop ? HERO_CAR_SPAN : ONE;
  const metaSpan = isDesktop ? HERO_META_SPAN : ONE;
  const expenseSpan = isDesktop ? EXPENSE_SPAN : ONE;
  const taskSpan = isDesktop ? TASK_SPAN : ONE;
  const serviceSpan = isDesktop ? SERVICE_SPAN : ONE;
  const metaCols = isDesktop ? META_COLS : STATUS_TILE_COLS;

  if (view === OVERVIEW_VIEW_LOADING) {
    return (
      <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <Typography>{t('loading')}</Typography>
      </Card>
    );
  }

  if (view === OVERVIEW_VIEW_EMPTY || !dashboard) {
    return (
      <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <EmptyState title={t('noVehicles')} body={t('noVehiclesBody')} />
      </Card>
    );
  }

  const { vehicle, tasks, services, expenseSummary, reminders, recalls } = dashboard;
  const status = vehicleStatusFromDates(vehicle);
  const visibleTasks = tasks
    .filter((task) => task.status !== TASK_STATUS_COMPLETED)
    .slice(ZERO, VISIBLE_TASK_COUNT);
  const counts = taskFilterCounts(tasks);
  const is3d = carView === CAR_ART_VIEW_3D;

  return (
    <Flex className="Bear-Overview" direction="column" gap={GRID_GAP}>
      <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <Grid cols={pageCols} gap={GRID_GAP}>
          <GridItem colSpan={carSpan}>
            <Flex direction="column" gap={FLEX_GAP_SM}>
              <CarArt make={vehicle.make} model={vehicle.model} color={vehicle.color} view={carView} />
              <Button
                variant="ghost"
                compact
                disableElevation
                onClick={() => setCarView(is3d ? CAR_ART_VIEW_PHOTO : CAR_ART_VIEW_3D)}
              >
                {is3d ? t('viewPhoto') : t('view3d')}
              </Button>
            </Flex>
          </GridItem>
          <GridItem colSpan={metaSpan}>
            <Flex direction="column" gap={FLEX_GAP_SM}>
              <Typography color={COLOR_MUTED}>{vehicle.formattedRegistrationNumber}</Typography>
              <Typography variant={TYPO_PAGE_TITLE} color={COLOR_INK}>
                {vehicleTitle(vehicle.make, vehicle.model, t('unknown'))}
              </Typography>
              <Typography color={COLOR_MUTED}>
                {vehicleSubtitle(vehicle.fuelType, vehicle.modelYear, t('unknown'))}
              </Typography>
              <Badge variant="success" pill>
                {t('active')}
              </Badge>
              <Grid cols={metaCols} gap={FLEX_GAP_SM}>
                <Flex direction="column">
                  <Typography color={COLOR_MUTED}>{t('make')}</Typography>
                  <Typography>{vehicle.make ?? t('unknown')}</Typography>
                </Flex>
                <Flex direction="column">
                  <Typography color={COLOR_MUTED}>{t('model')}</Typography>
                  <Typography>{vehicle.model ?? t('unknown')}</Typography>
                </Flex>
                <Flex direction="column">
                  <Typography color={COLOR_MUTED}>{t('year')}</Typography>
                  <Typography>{vehicle.modelYear ?? t('unknown')}</Typography>
                </Flex>
                <Flex direction="column">
                  <Typography color={COLOR_MUTED}>{t('color')}</Typography>
                  <Typography>{vehicle.color ?? t('unknown')}</Typography>
                </Flex>
                <Flex direction="column">
                  <Typography color={COLOR_MUTED}>{t('roadEntry')}</Typography>
                  <Typography>{formatOverviewDate(vehicle.registrationDate, locale, t('unknown'))}</Typography>
                </Flex>
                <Flex direction="column">
                  <Typography color={COLOR_MUTED}>{t('hand')}</Typography>
                  <Typography>{vehicle.ownershipSequence ?? t('unknown')}</Typography>
                </Flex>
                <Flex direction="column">
                  <Typography color={COLOR_MUTED}>{t('ownershipType')}</Typography>
                  <Typography>{vehicle.ownershipType ?? t('unknown')}</Typography>
                </Flex>
                <Flex direction="column">
                  <Typography color={COLOR_MUTED}>{t('mileage')}</Typography>
                  <Typography>{vehicle.mileage ?? t('unknown')}</Typography>
                </Flex>
              </Grid>
              <Typography color={COLOR_MUTED}>
                {t('source')}: {vehicle.dataSource}
              </Typography>
            </Flex>
          </GridItem>
        </Grid>
      </Card>

      <OverviewStatus
        licenseKind={status.license.kind}
        testKind={status.test.kind}
        registrationExpiry={vehicle.registrationExpiry}
        nextTestDate={vehicle.nextTestDate}
        lastTestDate={vehicle.lastTestDate}
      />

      <OverviewCompare currentId={vehicle.id} />

      <Grid cols={pageCols} gap={GRID_GAP}>
        <GridItem colSpan={expenseSpan}>
          <OverviewExpenses expenseSummary={expenseSummary} />
        </GridItem>
        <GridItem colSpan={taskSpan}>
          <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
            <Flex direction="column" gap={FLEX_GAP_MD}>
              <Flex justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
                <Typography variant={TYPO_SECTION_TITLE}>{t('leftover')}</Typography>
                <Flex gap={FLEX_GAP_SM} wrap="wrap">
                  <Badge variant="primary" pill>{t('all')} {counts.all}</Badge>
                  <Badge variant="danger" pill>{t('overdue')} {counts.overdue}</Badge>
                  <Badge variant="warning" pill>{t('important')} {counts.important}</Badge>
                </Flex>
              </Flex>
              <Typography color={COLOR_MUTED}>{t('leftoverHelp')}</Typography>
              {visibleTasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
              <Button variant="ghost" compact disableElevation onClick={() => navigate(ROUTE_TASKS)}>
                <Typography color={COLOR_BLUE}>{t('viewAll')}</Typography>
              </Button>
            </Flex>
          </Card>
        </GridItem>
        <GridItem colSpan={serviceSpan}>
          <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
            <Flex direction="column" gap={FLEX_GAP_MD}>
              <Typography variant={TYPO_SECTION_TITLE}>{t('services')}</Typography>
              {services.map((service) => {
                const item = translatedService(service, t);
                return (
                  <Flex key={service.providerId} justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
                    <Flex align="center" gap={FLEX_GAP_SM}>
                      <ProviderMark providerId={service.providerId} name={item.name} />
                      <Flex direction="column">
                        <Typography weight="bold">{item.name}</Typography>
                        <Typography color={COLOR_MUTED}>{item.note}</Typography>
                      </Flex>
                    </Flex>
                    <Badge variant={serviceBadgeVariant(service.status)} pill>
                      {t(serviceStatusKey(service.status))}
                    </Badge>
                  </Flex>
                );
              })}
              <Button variant="ghost" compact disableElevation onClick={() => navigate(ROUTE_SERVICES)}>
                <Typography color={COLOR_BLUE}>{t('viewAll')}</Typography>
              </Button>
            </Flex>
          </Card>
        </GridItem>
      </Grid>

      <OverviewRecalls recalls={recalls ?? []} />
      <OverviewReminders reminders={reminders} />
    </Flex>
  );
}
