import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Flex, Input, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { VehicleLookupResult } from '@clm/shared';
import { api } from '@api';
import {
  COLOR_BG,
  COLOR_MUTED,
  COLOR_NAVY_DEEP,
  DATA_SOURCE_DEVELOPMENT,
  DEFAULT_PLATE_EXAMPLE,
  FLEX_GAP_LG,
  ONBOARDING_STEP_CONFIRM,
  ONBOARDING_STEP_PLATE,
  ONBOARDING_STEP_WELCOME,
  PAGE_PADDING,
  ROUTE_HOME,
} from '@const';
import { Logo } from '@components/Logo';
import { useAppState } from '@hooks';
import { ONBOARDING_CARD_MAX_WIDTH } from './Onboarding.const';
import { lookupTitle, sliceDate } from './Onboarding.utils';

export function Onboarding() {
  const [step, setStep] = useState(ONBOARDING_STEP_WELCOME);
  const [plate, setPlate] = useState(DEFAULT_PLATE_EXAMPLE);
  const [lookup, setLookup] = useState<VehicleLookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { refresh } = useAppState();
  const t = useTranslate();

  async function findVehicle() {
    setBusy(true);
    setError(null);
    try {
      setLookup(await api.lookup(plate));
      setStep(ONBOARDING_STEP_CONFIRM);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('lookupFailed'));
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
    } catch (err) {
      setError(err instanceof Error ? err.message : t('genericError'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Flex
      className="Bear-Onboarding"
      align="center"
      justify="center"
      style={{ minHeight: '100vh', background: COLOR_BG, padding: PAGE_PADDING }}
    >
      <Card variant="elevated" padding="lg" style={{ width: '100%', maxWidth: ONBOARDING_CARD_MAX_WIDTH }}>
        <Flex direction="column" gap={FLEX_GAP_LG}>
          <Box style={{ background: COLOR_NAVY_DEEP, padding: PAGE_PADDING, borderRadius: 12 }}>
            <Logo />
          </Box>
          {step === ONBOARDING_STEP_WELCOME ? (
            <>
              <Typography variant="h1">{t('welcomeTitle')}</Typography>
              <Typography color={COLOR_MUTED}>{t('tagline')}</Typography>
              <Button variant="primary" onClick={() => setStep(ONBOARDING_STEP_PLATE)}>
                {t('addCar')}
              </Button>
            </>
          ) : null}
          {step === ONBOARDING_STEP_PLATE ? (
            <>
              <Typography variant="h1">{t('plateTitle')}</Typography>
              <Typography color={COLOR_MUTED}>{t('plateHelp')}</Typography>
              <Input
                label={t('plateTitle')}
                value={plate}
                onChange={(event) => setPlate(event.target.value)}
                placeholder={t('platePlaceholder')}
                fullWidth
              />
              {error ? <Typography color="danger" role="alert">{error}</Typography> : null}
              <Button variant="primary" loading={busy} loadingText={t('checking')} onClick={() => void findVehicle()}>
                {t('continue')}
              </Button>
              <Button variant="ghost" onClick={() => setStep(ONBOARDING_STEP_WELCOME)}>
                {t('back')}
              </Button>
            </>
          ) : null}
          {step === ONBOARDING_STEP_CONFIRM && lookup ? (
            <>
              <Typography variant="h1">{t('vehicleFound')}</Typography>
              <Typography>
                {lookupTitle(lookup.vehicle.make, lookup.vehicle.model, lookup.vehicle.modelYear, t('unknown'))}
              </Typography>
              <Typography color={COLOR_MUTED}>
                {t('source')}: {lookup.vehicle.dataSource}
                {' · '}
                {lookup.vehicle.dataProvenance === DATA_SOURCE_DEVELOPMENT ? t('development') : t('official')}
              </Typography>
              <Typography>{t('fuel')}: {lookup.vehicle.fuelType ?? t('unknown')}</Typography>
              <Typography>{t('roadEntry')}: {sliceDate(lookup.vehicle.registrationDate, t('unknown'))}</Typography>
              <Typography>{t('licenseExpiry')}: {sliceDate(lookup.vehicle.registrationExpiry, t('unknown'))}</Typography>
              <Typography>{t('lastTest')}: {sliceDate(lookup.vehicle.lastTestDate, t('unknown'))}</Typography>
              <Typography color={COLOR_MUTED}>{t('identityUnavailable')}</Typography>
              <Typography>{t('preparing')}</Typography>
              {error ? <Typography color="danger" role="alert">{error}</Typography> : null}
              <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void save()}>
                {t('goDashboard')}
              </Button>
            </>
          ) : null}
        </Flex>
      </Card>
    </Flex>
  );
}
