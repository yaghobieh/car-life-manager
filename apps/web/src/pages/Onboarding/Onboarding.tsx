import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { VehicleLookupResult } from '@clm/shared';
import { api } from '@api';
import {
  COLOR_MUTED,
  COLOR_NAVY_DEEP,
  DATA_SOURCE_DEVELOPMENT,
  DEFAULT_PLATE_EXAMPLE,
  FLEX_GAP_LG,
  ONBOARDING_STEP_CONFIRM,
  ONBOARDING_STEP_PLATE,
  ONBOARDING_STEP_WELCOME,
  ROUTE_HOME,
  TITLE_SEPARATOR,
} from '@const';
import { Logo } from '@components/Logo';
import { useAppState } from '@hooks';
import { lookupTitle, sliceDate } from './Onboarding.utils';

export function Onboarding() {
  const [step, setStep] = useState(ONBOARDING_STEP_WELCOME);
  const [plate, setPlate] = useState(DEFAULT_PLATE_EXAMPLE);
  const [lookup, setLookup] = useState<VehicleLookupResult | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { refresh } = useAppState();
  const t = useTranslate();

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
    <Flex className="Bear-Onboarding bear-min-h-screen" align="center" justify="center">
      <Card variant="elevated" padding="lg" className="bear-w-full bear-max-w-xl">
        <Flex direction="column" gap={FLEX_GAP_LG}>
          <Box bg={COLOR_NAVY_DEEP} p={4} rounded="lg">
            <Logo />
          </Box>
          {step === ONBOARDING_STEP_WELCOME && (
            <div>
              <Typography variant="h1">{t('welcomeTitle')}</Typography>
              <Typography color={COLOR_MUTED}>{t('tagline')}</Typography>
              <Button variant="primary" onClick={() => setStep(ONBOARDING_STEP_PLATE)}>
                {t('addCar')}
              </Button>
            </div>
          )}
          {step === ONBOARDING_STEP_PLATE && (
            <div>
              <Typography variant="h1">{t('plateTitle')}</Typography>
              <Typography color={COLOR_MUTED}>{t('plateHelp')}</Typography>
              <Input
                label={t('plateTitle')}
                value={plate}
                onChange={(event) => setPlate(event.target.value)}
                placeholder={t('platePlaceholder')}
                fullWidth
              />
              <Button variant="primary" loading={busy} loadingText={t('checking')} onClick={() => void findVehicle()}>
                {t('continue')}
              </Button>
              <Button variant="ghost" onClick={() => setStep(ONBOARDING_STEP_WELCOME)}>
                {t('back')}
              </Button>
            </div>
          )}
          {step === ONBOARDING_STEP_CONFIRM && lookup && (
            <div>
              <Typography variant="h1">{t('vehicleFound')}</Typography>
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
              <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void save()}>
                {t('goDashboard')}
              </Button>
            </div>
          )}
        </Flex>
      </Card>
    </Flex>
  );
}
