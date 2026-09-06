import { Badge, Card, CardBody, CardHeader, Flex, Grid, GridItem, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { vehicleStatusFromDates } from '@clm/shared';
import {
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_MUTED,
  CURRENCY_ILS,
  EXPENSE_SPAN,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  FULL_SPAN,
  GRID_COLS,
  GRID_GAP,
  HERO_CAR_SPAN,
  HERO_META_SPAN,
  META_COLS,
  REMINDER_SPAN,
  SERVICE_SPAN,
  STATUS_SPAN,
  TASK_SPAN,
  VISIBLE_REMINDER_COUNT,
  VISIBLE_TASK_COUNT,
} from '@const';
import { CarArt } from '@components/CarArt';
import { EmptyState } from '@components/EmptyState';
import { StatusBadge } from '@components/StatusBadge';
import { useAppState } from '@hooks';
import { formatOverviewDate, taskFilterCounts, vehicleSubtitle, vehicleTitle } from './Overview.utils';

export function Overview() {
  const { dashboard, loading, vehicles } = useAppState();
  const t = useTranslate();
  const { locale, formatCurrency } = useLingoFormat();

  if (loading) {
    return (
      <Card variant="elevated" padding="lg">
        <Typography>{t('loading')}</Typography>
      </Card>
    );
  }

  if (!dashboard || vehicles.length === 0) {
    return (
      <Card variant="elevated" padding="lg">
        <EmptyState title={t('noVehicles')} body={t('noVehiclesBody')} />
      </Card>
    );
  }

  const { vehicle, tasks, services, expenseSummary, reminders } = dashboard;
  const status = vehicleStatusFromDates(vehicle);
  const visibleTasks = tasks.slice(0, VISIBLE_TASK_COUNT);
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
          <Card variant="elevated" padding="lg">
            <CardHeader title={t('monthlyExpenses')} />
            <CardBody>
              {expenseSummary.hasData ? (
                <Flex direction="column" gap={FLEX_GAP_SM}>
                  {expenseSummary.byCategory.map((row) => (
                    <Flex justify="between" key={row.category}>
                      <Typography>{row.category}</Typography>
                      <Typography weight="bold">{formatCurrency(row.amount, CURRENCY_ILS)}</Typography>
                    </Flex>
                  ))}
                  <Flex justify="between">
                    <Typography weight="extrabold" color={COLOR_BLUE}>{t('monthTotal')}</Typography>
                    <Typography weight="extrabold" color={COLOR_BLUE}>
                      {formatCurrency(expenseSummary.currentMonth, CURRENCY_ILS)}
                    </Typography>
                  </Flex>
                </Flex>
              ) : (
                <EmptyState title={t('noExpenses')} body={t('noExpensesBody')} />
              )}
            </CardBody>
          </Card>
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

      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={FLEX_GAP_SM}>
          <Typography variant="h2">{t('upcoming')}</Typography>
          <Typography color={COLOR_MUTED}>{t('remindersOfficial')}</Typography>
        </Flex>
        <Grid cols={GRID_COLS} gap={GRID_GAP}>
          {reminders.length === 0 ? (
            <GridItem colSpan={FULL_SPAN}>
              <Typography color={COLOR_MUTED}>{t('noReminders')}</Typography>
            </GridItem>
          ) : reminders.slice(0, VISIBLE_REMINDER_COUNT).map((item) => (
            <GridItem key={item.id} colSpan={REMINDER_SPAN}>
              <Typography weight="bold">{item.title}</Typography>
              <Typography color={COLOR_MUTED}>{formatOverviewDate(item.dueDate, locale, t('unknown'))}</Typography>
            </GridItem>
          ))}
        </Grid>
      </Card>
    </Flex>
  );
}
