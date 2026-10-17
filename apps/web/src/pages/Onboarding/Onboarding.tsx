import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { VehicleLookupResult } from '@clm/shared';
import { api } from '@api';
import {
  CARD_RADIUS_XL,
  COLOR_BG,
  COLOR_MUTED,
  COLOR_NAVY_DEEP,
  DATA_SOURCE_DEVELOPMENT,
  DEFAULT_PLATE_EXAMPLE,
  FLEX_GAP_LG,
  ONBOARDING_STEP_CONFIRM,
  ONBOARDING_STEP_PLATE,
  ONBOARDING_STEP_WELCOME,
  ROUTE_HOME,
  ROUTE_ONBOARDING,
  TITLE_SEPARATOR,
  TYPO_PAGE_TITLE,
  ZERO,
} from '@const';
import { Logo } from '@components/Logo';
import { useAppState } from '@hooks';
import { authHref } from '../../Route.utils';
import { lookupTitle, resolveOnboardingStep, sliceDate } from './Onboarding.utils';

export function Onboarding() {
  const [step, setStep] = useState(ONBOARDING_STEP_WELCOME);
  const [plate, setPlate] = useState(DEFAULT_PLATE_EXAMPLE);
  const [lookup, setLookup] = useState<VehicleLookupResult | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { user, vehicles, loading, authReady, refresh } = useAppState();
  const t = useTranslate();
  const hasVehicles = vehicles.length > ZERO;
  const viewStep = resolveOnboardingStep(step, hasVehicles);

  if (!authReady || loading) {
    return (
      <Box bg={COLOR_BG} className="Bear-Onboarding bear-min-h-screen">
        <Flex className="bear-min-h-screen" align="center" justify="center">
          <Typography>{t('loading')}</Typography>
        </Flex>
      </Box>
    );
  }

  if (!user) return <Navigate to={authHref(ROUTE_ONBOARDING)} replace />;

  async function findVehicle() {
    setBusy(true);
    try {
      setLookup(await api.lookup(plate));
      setStep(ONBOARDING_STEP_CONFIRM);
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    setBusy(true);
    try {
      await api.addVehicle(plate);
      await refresh();
      navigate(ROUTE_HOME);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Box bg={COLOR_BG} className="Bear-Onboarding bear-min-h-screen">
      <Flex className="bear-min-h-screen bear-p-3" align="center" justify="center">
        <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL} className="bear-w-full bear-max-w-xl">
          <Flex direction="column" gap={FLEX_GAP_LG}>
          <Box bg={COLOR_NAVY_DEEP} p={4} rounded="lg">
            <Logo onDark />
          </Box>
          {viewStep === ONBOARDING_STEP_WELCOME && (
            <div>
              <Typography variant={TYPO_PAGE_TITLE}>{t('welcomeTitle')}</Typography>
              <Typography color={COLOR_MUTED}>{t('tagline')}</Typography>
              <Button variant="primary" fullWidth onClick={() => setStep(ONBOARDING_STEP_PLATE)}>
                {t('addCar')}
              </Button>
            </div>
          )}
          {viewStep === ONBOARDING_STEP_PLATE && (
            <div>
              <Typography variant={TYPO_PAGE_TITLE}>{t('plateTitle')}</Typography>
              <Typography color={COLOR_MUTED}>{t('plateHelp')}</Typography>
              <Input
                label={t('plateTitle')}
                value={plate}
                onChange={(event) => setPlate(event.target.value)}
                placeholder={t('platePlaceholder')}
                fullWidth
              />
              <Button variant="primary" fullWidth loading={busy} loadingText={t('checking')} onClick={() => void findVehicle()}>
                {t('continue')}
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => {
                  if (hasVehicles) navigate(ROUTE_HOME);
                  else setStep(ONBOARDING_STEP_WELCOME);
                }}
              >
                {t('back')}
              </Button>
            </div>
          )}
          {viewStep === ONBOARDING_STEP_CONFIRM && lookup && (
            <div>
              <Typography variant={TYPO_PAGE_TITLE}>{t('vehicleFound')}</Typography>
              <Typography>
                {lookupTitle(lookup.vehicle.make, lookup.vehicle.model, lookup.vehicle.modelYear, t('unknown'))}
              </Typography>
              <Typography color={COLOR_MUTED}>
                {t('source')}: {lookup.vehicle.dataSource}
                {TITLE_SEPARATOR}
                {lookup.vehicle.dataProvenance === DATA_SOURCE_DEVELOPMENT ? t('development') : t('official')}
              </Typography>
              <Typography>{t('fuel')}: {lookup.vehicle.fuelType ?? t('unknown')}</Typography>
              <Typography>{t('roadEntry')}: {sliceDate(lookup.vehicle.registrationDate, t('unknown'))}</Typography>
              <Typography>{t('licenseExpiry')}: {sliceDate(lookup.vehicle.registrationExpiry, t('unknown'))}</Typography>
              <Typography>{t('lastTest')}: {sliceDate(lookup.vehicle.lastTestDate, t('unknown'))}</Typography>
              <Typography color={COLOR_MUTED}>{t('identityUnavailable')}</Typography>
              <Typography>{t('preparing')}</Typography>
              <Button variant="primary" fullWidth loading={busy} loadingText={t('saving')} onClick={() => void save()}>
                {t('goDashboard')}
              </Button>
              <Button variant="ghost" fullWidth onClick={() => setStep(ONBOARDING_STEP_PLATE)}>
                {t('back')}
              </Button>
            </div>
          )}
          </Flex>
        </Card>
      </Flex>
    </Box>
  );
}
