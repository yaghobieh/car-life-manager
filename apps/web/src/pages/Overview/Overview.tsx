import { useState } from 'react';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import { nextTasks, vehicleStatusFromDates, type Task } from '@clm/shared';
import {
  BUTTON_KIND_OUTLINE,
  CURRENCY_ILS,
  INSURANCE_OFFICIAL_URL,
  ROUTE_ONBOARDING,
  ROUTE_SERVICES,
  ROUTE_TASKS,
  STATUS_KIND_HEALTHY,
  SVG_EMPTY_REPORT,
  SVG_EMPTY_VEHICLE,
  SVG_STATUS_ALERT,
  SVG_STATUS_OK,
  VISIBLE_TASK_COUNT,
  ZERO,
} from '@const';
import {
  ClmButton,
  ClmEmpty,
  ClmHero,
  ClmList,
  ClmPageHead,
  ClmRow,
  ClmSectionTitle,
  ClmStatCard,
} from '@common';
import { CarArt } from '@components/CarArt';
import { OfficialLink } from '@components/OfficialLink';
import { TaskDrawer } from '@connected/TaskDrawer';
import { TaskRow } from '@connected/TaskRow';
import { useAppState } from '@hooks';
import {
  KEY_ACTIVE_VEHICLE,
  KEY_ADD_VEHICLE,
  KEY_EXPENSE_NOTE_DEFAULT,
  KEY_EXPENSE_PREFIX,
  KEY_INSURANCE,
  KEY_INSURANCE_HELP_NOTE,
  KEY_LAST_TEST_ON,
  KEY_LEFTOVER,
  KEY_LEFTOVER_HELP,
  KEY_LICENSE,
  KEY_LOADING,
  KEY_NO_INSURANCE_OFFICIAL,
  KEY_NO_TASKS,
  KEY_NO_VEHICLES,
  KEY_NO_VEHICLES_BODY,
  KEY_OFFICIAL_SITE,
  KEY_OVERVIEW,
  KEY_PAGE_SUB_OVERVIEW,
  KEY_PAYMENTS_COUNT,
  KEY_PROVIDER_NOTE_INSURANCE,
  KEY_SERVICES,
  KEY_STATUS_PREFIX,
  KEY_TEST,
  KEY_THIS_MONTH,
  KEY_UNKNOWN,
  KEY_VALID_UNTIL,
  KEY_VIEW_ALL,
  OVERVIEW_TONE_BAD,
  OVERVIEW_VIEW_EMPTY,
  OVERVIEW_VIEW_LOADING,
} from './Overview.const';
import { OverviewRecalls } from './Overview.recalls';
import {
  buildOverviewMeta,
  buildOverviewPills,
  formatOverviewDate,
  resolveOverviewView,
  vehicleTitle,
} from './Overview.utils';

function renderOverviewTasks(
  tasks: Task[],
  t: (key: string) => string,
  onOpen: (task: Task) => void,
) {
  if (tasks.length === ZERO) {
    return <ClmEmpty iconSrc={SVG_EMPTY_VEHICLE} title={t(KEY_NO_TASKS)} body={t(KEY_LEFTOVER_HELP)} />;
  } else {
    return (
      <ClmList>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onOpen={onOpen} />
        ))}
      </ClmList>
    );
  }
}

export function Overview() {
  const { dashboard, loading, vehicles } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const { locale, formatCurrency } = useLingoFormat();
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const view = resolveOverviewView(loading, dashboard, vehicles);

  if (view === OVERVIEW_VIEW_LOADING) {
    return <ClmPageHead title={t(KEY_LOADING)} />;
  }

  if (view === OVERVIEW_VIEW_EMPTY || !dashboard) {
    return (
      <>
        <ClmPageHead title={t(KEY_OVERVIEW)} subtitle={t(KEY_PAGE_SUB_OVERVIEW)} />
        <ClmEmpty
          iconSrc={SVG_EMPTY_VEHICLE}
          title={t(KEY_NO_VEHICLES)}
          body={t(KEY_NO_VEHICLES_BODY)}
          action={<ClmButton onClick={() => navigate(ROUTE_ONBOARDING)}>{t(KEY_ADD_VEHICLE)}</ClmButton>}
        />
      </>
    );
  }

  const { vehicle, tasks, expenseSummary, expenses, recalls } = dashboard;
  const status = vehicleStatusFromDates(vehicle);
  const visibleTasks = nextTasks(tasks, VISIBLE_TASK_COUNT);
  const title = vehicle.modelYear
    ? `${vehicleTitle(vehicle.make, vehicle.model, t(KEY_UNKNOWN))} · ${vehicle.modelYear}`
    : vehicleTitle(vehicle.make, vehicle.model, t(KEY_UNKNOWN));
  const topCategory = expenseSummary.byCategory[ZERO];
  const monthNote = expenseSummary.hasData
    ? `${expenses?.length ?? ZERO} ${t(KEY_PAYMENTS_COUNT)}`
    : t(KEY_EXPENSE_NOTE_DEFAULT);

  const pills = buildOverviewPills(status.license.kind, status.test.kind, t);
  const meta = buildOverviewMeta(vehicle, locale, t);

  return (
    <div className="Bear-Overview">
      <ClmPageHead title={t(KEY_OVERVIEW)} subtitle={t(KEY_PAGE_SUB_OVERVIEW)} />
      <ClmHero
        eyebrow={t(KEY_ACTIVE_VEHICLE)}
        title={title}
        plate={vehicle.formattedRegistrationNumber}
        car={<CarArt make={vehicle.make} model={vehicle.model} color={vehicle.color} imageUrl={vehicle.imageUrl} />}
        carAlt={title}
        pills={pills}
        meta={meta}
      />
      <div className="Clm-grid">
        <ClmStatCard
          title={t(KEY_LICENSE)}
          value={t(`${KEY_STATUS_PREFIX}${status.license.kind}`)}
          note={`${t(KEY_VALID_UNTIL)} ${formatOverviewDate(vehicle.registrationExpiry, locale, t(KEY_UNKNOWN))}`}
          iconSrc={status.license.kind === STATUS_KIND_HEALTHY ? SVG_STATUS_OK : SVG_STATUS_ALERT}
        />
        <ClmStatCard
          title={t(KEY_TEST)}
          value={formatOverviewDate(vehicle.nextTestDate, locale, t(KEY_UNKNOWN))}
          note={`${t(KEY_LAST_TEST_ON)} ${formatOverviewDate(vehicle.lastTestDate, locale, t(KEY_UNKNOWN))}`}
          iconSrc={status.test.kind === STATUS_KIND_HEALTHY ? SVG_STATUS_OK : SVG_STATUS_ALERT}
        />
        <ClmStatCard
          title={t(KEY_INSURANCE)}
          value={t(KEY_NO_INSURANCE_OFFICIAL)}
          note={t(KEY_INSURANCE_HELP_NOTE)}
          iconSrc={SVG_STATUS_ALERT}
          noteTone={OVERVIEW_TONE_BAD}
        />
        <ClmStatCard
          title={t(KEY_THIS_MONTH)}
          value={formatCurrency(expenseSummary.currentMonth, CURRENCY_ILS)}
          note={topCategory ? `${t(`${KEY_EXPENSE_PREFIX}${topCategory.category}`)} · ${monthNote}` : monthNote}
          iconSrc={SVG_EMPTY_REPORT}
        />
      </div>
      <ClmSectionTitle title={t(KEY_INSURANCE)} />
      <ClmList>
        <ClmRow
          iconSrc={SVG_STATUS_ALERT}
          title={t(KEY_NO_INSURANCE_OFFICIAL)}
          subtitle={t(KEY_PROVIDER_NOTE_INSURANCE)}
          action={<OfficialLink href={INSURANCE_OFFICIAL_URL} label={t(KEY_OFFICIAL_SITE)} />}
        />
      </ClmList>
      <ClmButton kind={BUTTON_KIND_OUTLINE} onClick={() => navigate(ROUTE_SERVICES)}>{t(KEY_SERVICES)}</ClmButton>
      <OverviewRecalls recalls={recalls} />
      <ClmSectionTitle title={t(KEY_LEFTOVER)} />
      {renderOverviewTasks(visibleTasks, t, setOpenTask)}
      <ClmButton kind={BUTTON_KIND_OUTLINE} onClick={() => navigate(ROUTE_TASKS)}>{t(KEY_VIEW_ALL)}</ClmButton>
      <TaskDrawer task={openTask} onClose={() => setOpenTask(null)} />
    </div>
  );
}
