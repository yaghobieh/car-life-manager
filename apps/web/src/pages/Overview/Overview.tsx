import { useState } from 'react';
import { Badge, Banner, Box, Button, Card, Flex, Grid, GridItem, Typography, useIsDesktop } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import { nextTasks, sourceFromProvenance, vehicleStatusFromDates, type Task } from '@clm/shared';
import {
  CARD_RADIUS_XL,
  COLOR_BLUE,
  COLOR_MUTED,
  COLOR_NAVY_DEEP,
  COLOR_WHITE,
  EMPTY_ICON_VEHICLE,
  EXPENSE_SPAN,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  GRID_COLS,
  GRID_GAP,
  ONE,
  ROUTE_SERVICES,
  ROUTE_TASKS,
  ROUTE_VEHICLE,
  SERVICE_SPAN,
  TASK_SPAN,
  TYPO_SECTION_TITLE,
  VISIBLE_TASK_COUNT,
  ZERO,
} from '@const';
import { EmptyState } from '@components/EmptyState';
import { PageHeader } from '@components/PageHeader';
import { PlateBadge } from '@components/PlateBadge';
import { ProviderMark } from '@components/ProviderMark';
import { SourceBadge } from '@components/SourceBadge';
import { TaskDrawer } from '@components/TaskDrawer';
import { TaskRow } from '@components/TaskRow';
import { useAppState } from '@hooks';
import { connectedServiceCount } from '../Services/Services.utils';
import { HeroCarSvg } from './helpers/HeroCarSvg';
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
  greetingKey,
  resolveOverviewView,
  taskFilterCounts,
  vehicleTitle,
} from './Overview.utils';

export function Overview() {
  const { dashboard, loading, vehicles } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const { locale } = useLingoFormat();
  const isDesktop = useIsDesktop();
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const view = resolveOverviewView(loading, dashboard, vehicles);
  const pageCols = isDesktop ? GRID_COLS : ONE;
  const expenseSpan = isDesktop ? EXPENSE_SPAN : ONE;
  const taskSpan = isDesktop ? TASK_SPAN : ONE;
  const serviceSpan = isDesktop ? SERVICE_SPAN : ONE;

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
        <EmptyState title={t('noVehicles')} body={t('noVehiclesBody')} icon={EMPTY_ICON_VEHICLE} />
      </Card>
    );
  }

  const { vehicle, tasks, services, expenseSummary, reminders, recalls } = dashboard;
  const status = vehicleStatusFromDates(vehicle);
  const visibleTasks = nextTasks(tasks, VISIBLE_TASK_COUNT);
  const counts = taskFilterCounts(tasks);
  const connectedCount = connectedServiceCount(services);

  return (
    <Flex className="Bear-Overview" direction="column" gap={GRID_GAP}>
      <PageHeader title={t(greetingKey())} subtitle={t('pageSubOverview')} />
      {connectedCount === ZERO && (
        <Banner
          severity="info"
          title={t('bannerConnectionsTitle')}
          action={(
            <Button variant="primary" compact onClick={() => navigate(ROUTE_SERVICES)}>
              {t('bannerConnectionsCta')}
            </Button>
          )}
        >
          {t('bannerConnectionsBody')}
        </Banner>
      )}
      <Box bg={COLOR_NAVY_DEEP} p={5} rounded="2xl" className="Bear-Overview__hero">
        <Flex align="center" gap={FLEX_GAP_MD} wrap="wrap">
          <HeroCarSvg />
          <Flex direction="column" gap={FLEX_GAP_SM} className="bear-flex-1">
            <Typography color={COLOR_MUTED}>{t('activeVehicle')}</Typography>
            <Typography weight="extrabold" color={COLOR_WHITE}>
              {vehicleTitle(vehicle.make, vehicle.model, t('unknown'))}
              {vehicle.modelYear ? ` · ${vehicle.modelYear}` : ''}
            </Typography>
            <Flex align="center" gap={FLEX_GAP_SM} wrap="wrap">
              <PlateBadge plate={vehicle.formattedRegistrationNumber} />
              <Badge variant="success" pill>{t('license')} · {t(`status_${status.license.kind}`)}</Badge>
              <Badge variant="success" pill>{t('test')} · {t(`status_${status.test.kind}`)}</Badge>
              <Badge variant="danger" pill>{t('noInsuranceLink')}</Badge>
            </Flex>
            <Flex gap={FLEX_GAP_MD} wrap="wrap">
              <Typography color={COLOR_MUTED}>{t('hand')} <Typography color={COLOR_WHITE} weight="bold">{vehicle.ownershipSequence ?? t('unknown')}</Typography></Typography>
              <Typography color={COLOR_MUTED}>{t('color')} <Typography color={COLOR_WHITE} weight="bold">{vehicle.color ?? t('unknown')}</Typography></Typography>
              <Typography color={COLOR_MUTED}>{t('roadEntry')} <Typography color={COLOR_WHITE} weight="bold">{formatOverviewDate(vehicle.registrationDate, locale, t('unknown'))}</Typography></Typography>
            </Flex>
            <SourceBadge source={sourceFromProvenance(vehicle.dataProvenance)} updatedAt={vehicle.dataSourceUpdatedAt} />
            <Button variant="secondary" compact onClick={() => navigate(ROUTE_VEHICLE)}>
              {t('viewVehicle')}
            </Button>
          </Flex>
        </Flex>
      </Box>

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
                <TaskRow key={task.id} task={task} onOpen={setOpenTask} />
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
              <Flex justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
                <Typography variant={TYPO_SECTION_TITLE}>{t('services')}</Typography>
                <Badge variant="neutral" pill>
                  {connectedServiceCount(services)} {t('connections')}
                </Badge>
              </Flex>
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
      <TaskDrawer task={openTask} onClose={() => setOpenTask(null)} />
    </Flex>
  );
}
