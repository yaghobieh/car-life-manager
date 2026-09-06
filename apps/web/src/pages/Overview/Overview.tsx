import { Badge, Box, Button, Card, Flex, Grid, GridItem, Typography, useIsDesktop } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import { vehicleStatusFromDates } from '@clm/shared';
import {
  CARD_RADIUS_XL,
  COLOR_BLUE,
  COLOR_INK,
  COLOR_MUTED,
  COLOR_TILE,
  EXPENSE_SPAN,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  GRID_COLS,
  GRID_GAP,
  HERO_CAR_SPAN,
  HERO_META_SPAN,
  META_COLS,
  ONE,
  ROUTE_DOCUMENTS,
  ROUTE_SERVICES,
  ROUTE_TASKS,
  SERVICE_SPAN,
  STATUS_SPAN,
  STATUS_TILE_COLS,
  TASK_SPAN,
  TYPO_PAGE_TITLE,
  TYPO_SECTION_TITLE,
  VISIBLE_TASK_COUNT,
  ZERO,
} from '@const';
import { CarArt } from '@components/CarArt';
import { EmptyState } from '@components/EmptyState';
import { ProviderMark } from '@components/ProviderMark';
import { StatusBadge } from '@components/StatusBadge';
import { useAppState } from '@hooks';
import { OverviewExpenses } from './Overview.expenses';
import { OverviewRecalls } from './Overview.recalls';
import { OverviewReminders } from './Overview.reminders';
import { OVERVIEW_VIEW_EMPTY, OVERVIEW_VIEW_LOADING } from './Overview.const';
import {
  formatOverviewDate,
  resolveOverviewView,
  statusKindColor,
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
  const view = resolveOverviewView(loading, dashboard, vehicles);
  const pageCols = isDesktop ? GRID_COLS : ONE;
  const heroSpan = isDesktop ? HERO_META_SPAN : ONE;
  const carSpan = isDesktop ? HERO_CAR_SPAN : ONE;
  const metaSpan = isDesktop ? HERO_META_SPAN : ONE;
  const statusSpan = isDesktop ? STATUS_SPAN : ONE;
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
  const visibleTasks = tasks.slice(ZERO, VISIBLE_TASK_COUNT);
  const counts = taskFilterCounts(tasks);

  return (
    <Flex className="Bear-Overview" direction="column" gap={GRID_GAP}>
      <Grid cols={pageCols} gap={GRID_GAP}>
        <GridItem colSpan={heroSpan}>
          <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
            <Grid cols={pageCols} gap={GRID_GAP}>
              <GridItem colSpan={carSpan}>
                <CarArt make={vehicle.make} model={vehicle.model} />
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
                    <div>
                      <Typography color={COLOR_MUTED}>{t('make')}</Typography>
                      <Typography>{vehicle.make ?? t('unknown')}</Typography>
                    </div>
                    <div>
                      <Typography color={COLOR_MUTED}>{t('model')}</Typography>
                      <Typography>{vehicle.model ?? t('unknown')}</Typography>
                    </div>
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
                </Flex>
              </GridItem>
            </Grid>
          </Card>
        </GridItem>
        <GridItem colSpan={statusSpan}>
          <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
            <Flex direction="column" gap={FLEX_GAP_MD}>
              <Typography variant={TYPO_SECTION_TITLE}>{t('generalStatus')}</Typography>
              <Grid cols={STATUS_TILE_COLS} gap={FLEX_GAP_SM}>
                <Box bg={COLOR_TILE} p={3} rounded="lg">
                  <Typography color={COLOR_MUTED}>{t('license')}</Typography>
                  <Typography color={statusKindColor(status.license.kind)} weight="bold">
                    {status.license.label}
                  </Typography>
                  <Typography color={COLOR_MUTED}>
                    {formatOverviewDate(vehicle.registrationExpiry, locale, t('unknown'))}
                  </Typography>
                </Box>
                <Box bg={COLOR_TILE} p={3} rounded="lg">
                  <Typography color={COLOR_MUTED}>{t('test')}</Typography>
                  <Typography color={statusKindColor(status.test.kind)} weight="bold">
                    {status.test.label}
                  </Typography>
                  <Typography color={COLOR_MUTED}>
                    {formatOverviewDate(vehicle.nextTestDate, locale, t('unknown'))}
                  </Typography>
                  <Typography color={COLOR_MUTED}>
                    {t('lastTest')}: {formatOverviewDate(vehicle.lastTestDate, locale, t('unknown'))}
                  </Typography>
                </Box>
                <Box bg={COLOR_TILE} p={3} rounded="lg">
                  <Typography color={COLOR_MUTED}>{t('fee')}</Typography>
                  <Typography color={COLOR_MUTED}>{t('unknown')}</Typography>
                </Box>
                <Box bg={COLOR_TILE} p={3} rounded="lg">
                  <Typography color={COLOR_MUTED}>{t('insurance')}</Typography>
                  <Typography color={COLOR_MUTED}>{t('noInsuranceLink')}</Typography>
                </Box>
              </Grid>
              <Button variant="ghost" compact disableElevation onClick={() => navigate(ROUTE_DOCUMENTS)}>
                <Typography color={COLOR_BLUE}>{t('viewAll')}</Typography>
              </Button>
            </Flex>
          </Card>
        </GridItem>
      </Grid>

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
              {visibleTasks.map((task) => (
                <Flex key={task.id} justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
                  <div>
                    <Typography weight="bold">{task.title}</Typography>
                    <Typography color={COLOR_MUTED}>{task.description}</Typography>
                  </div>
                  <StatusBadge priority={task.priority} />
                </Flex>
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
              {services.map((service) => (
                <Flex key={service.providerId} justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
                  <Flex align="center" gap={FLEX_GAP_SM}>
                    <ProviderMark providerId={service.providerId} name={service.name} />
                    <div>
                      <Typography weight="bold">{service.name}</Typography>
                      <Typography color={COLOR_MUTED}>{service.note}</Typography>
                    </div>
                  </Flex>
                  <Badge variant="warning" pill>{t('notSupported')}</Badge>
                </Flex>
              ))}
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
