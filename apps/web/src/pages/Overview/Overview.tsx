import { useState } from 'react';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import { nextTasks, vehicleStatusFromDates, type Task } from '@clm/shared';
import {
  CURRENCY_ILS,
  INSURANCE_OFFICIAL_URL,
  SVG_EMPTY_VEHICLE,
  ROUTE_ONBOARDING,
  ROUTE_SERVICES,
  ROUTE_TASKS,
  STATUS_KIND_HEALTHY,
  SVG_STATUS_ALERT,
  SVG_STATUS_OK,
  SVG_EMPTY_REPORT,
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
import { TaskDrawer } from '@components/TaskDrawer';
import { TaskRow } from '@components/TaskRow';
import { useAppState } from '@hooks';
import { OVERVIEW_VIEW_EMPTY, OVERVIEW_VIEW_LOADING } from './Overview.const';
import { OverviewRecalls } from './Overview.recalls';
import { formatOverviewDate, resolveOverviewView, toneForKind, vehicleTitle } from './Overview.utils';

export function Overview() {
  const { dashboard, loading, vehicles } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();
  const { locale, formatCurrency } = useLingoFormat();
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const view = resolveOverviewView(loading, dashboard, vehicles);

  if (view === OVERVIEW_VIEW_LOADING) {
    return <ClmPageHead title={t('loading')} />;
  }

  if (view === OVERVIEW_VIEW_EMPTY || !dashboard) {
    return (
      <>
        <ClmPageHead title={t('overview')} subtitle={t('pageSubOverview')} />
        <ClmEmpty
          iconSrc={SVG_EMPTY_VEHICLE}
          title={t('noVehicles')}
          body={t('noVehiclesBody')}
          action={<ClmButton onClick={() => navigate(ROUTE_ONBOARDING)}>{t('addVehicle')}</ClmButton>}
        />
      </>
    );
  }

  const { vehicle, tasks, expenseSummary, expenses, recalls } = dashboard;
  const status = vehicleStatusFromDates(vehicle);
  const visibleTasks = nextTasks(tasks, VISIBLE_TASK_COUNT);
  const title = vehicle.modelYear
    ? `${vehicleTitle(vehicle.make, vehicle.model, t('unknown'))} · ${vehicle.modelYear}`
    : vehicleTitle(vehicle.make, vehicle.model, t('unknown'));
  const topCategory = expenseSummary.byCategory[ZERO];
  const monthNote = expenseSummary.hasData
    ? `${expenses?.length ?? ZERO} ${t('paymentsCount')}`
    : t('expenseNoteDefault');

  return (
    <div className="Bear-Overview">
      <ClmPageHead title={t('overview')} subtitle={t('pageSubOverview')} />
      <ClmHero
        eyebrow={t('activeVehicle')}
        title={title}
        plate={vehicle.formattedRegistrationNumber}
        car={<CarArt make={vehicle.make} model={vehicle.model} color={vehicle.color} />}
        carAlt={title}
        pills={[
          { label: t('licenseValidShort'), tone: toneForKind(status.license.kind) },
          { label: t('testValidShort'), tone: toneForKind(status.test.kind) },
          { label: t('insuranceDisconnected'), tone: 'bad' },
        ]}
        meta={[
          { label: t('hand'), value: vehicle.ownershipSequence != null ? String(vehicle.ownershipSequence) : t('unknown') },
          { label: t('color'), value: vehicle.color ?? t('unknown') },
          { label: t('roadEntry'), value: formatOverviewDate(vehicle.registrationDate, locale, t('unknown')) },
        ]}
      />
      <div className="Clm-grid">
        <ClmStatCard
          title={t('license')}
          value={t(`status_${status.license.kind}`)}
          note={`${t('validUntil')} ${formatOverviewDate(vehicle.registrationExpiry, locale, t('unknown'))}`}
          iconSrc={status.license.kind === STATUS_KIND_HEALTHY ? SVG_STATUS_OK : SVG_STATUS_ALERT}
        />
        <ClmStatCard
          title={t('test')}
          value={formatOverviewDate(vehicle.nextTestDate, locale, t('unknown'))}
          note={`${t('lastTestOn')} ${formatOverviewDate(vehicle.lastTestDate, locale, t('unknown'))}`}
          iconSrc={status.test.kind === STATUS_KIND_HEALTHY ? SVG_STATUS_OK : SVG_STATUS_ALERT}
        />
        <ClmStatCard
          title={t('insurance')}
          value={t('noInsuranceOfficial')}
          note={t('insuranceHelpNote')}
          iconSrc={SVG_STATUS_ALERT}
          noteTone="bad"
        />
        <ClmStatCard
          title={t('thisMonth')}
          value={formatCurrency(expenseSummary.currentMonth, CURRENCY_ILS)}
          note={topCategory ? `${t(`expense_${topCategory.category}`)} · ${monthNote}` : monthNote}
          iconSrc={SVG_EMPTY_REPORT}
        />
      </div>
      <ClmSectionTitle title={t('insurance')} />
      <ClmList>
        <ClmRow
          iconSrc={SVG_STATUS_ALERT}
          title={t('noInsuranceOfficial')}
          subtitle={t('providerNote_mandatory_insurance')}
          action={<OfficialLink href={INSURANCE_OFFICIAL_URL} label={t('officialSite')} />}
        />
      </ClmList>
      <ClmButton kind="outline" onClick={() => navigate(ROUTE_SERVICES)}>{t('services')}</ClmButton>
      <OverviewRecalls recalls={recalls} />
      <ClmSectionTitle title={t('leftover')} />
      {visibleTasks.length === ZERO ? (
        <ClmEmpty iconSrc={SVG_EMPTY_VEHICLE} title={t('noTasks')} body={t('leftoverHelp')} />
      ) : (
        <ClmList>
          {visibleTasks.map((task) => (
            <TaskRow key={task.id} task={task} onOpen={setOpenTask} />
          ))}
        </ClmList>
      )}
      <ClmButton kind="outline" onClick={() => navigate(ROUTE_TASKS)}>{t('viewAll')}</ClmButton>
      <TaskDrawer task={openTask} onClose={() => setOpenTask(null)} />
    </div>
  );
}
