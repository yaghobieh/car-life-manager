import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import {
  CARD_RADIUS_XL,
  COLOR_BG,
  COLOR_MUTED,
  COLOR_NAVY_DEEP,
  FLEX_GAP_LG,
  FLEX_GAP_MD,
  ROUTE_AUTH,
  ROUTE_HOME,
  TYPO_PAGE_TITLE,
  TYPO_SECTION_TITLE,
} from '@const';
import { LocaleSelect } from '@components/LocaleSelect';
import { Logo } from '@components/Logo';
import { useAppState } from '@hooks';
import { LandingFeatures } from './helpers/LandingFeatures';
import { LandingHow } from './helpers/LandingHow';
import { LandingLoading } from './helpers/LandingLoading';

export function Landing() {
  const { user, authReady, loading } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();

  if (!authReady || loading) {
    return <LandingLoading label={t('loading')} />;
  }

  if (user) return <Navigate to={ROUTE_HOME} replace />;

  return (
    <Box bg={COLOR_BG} className="Bear-Landing bear-min-h-screen">
      <Box className="bear-max-w-3xl bear-mx-auto bear-p-4">
        <Flex direction="column" gap={FLEX_GAP_LG}>
          <Flex justify="between" align="center">
            <Logo />
            <LocaleSelect />
          </Flex>
          <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
            <Flex direction="column" gap={FLEX_GAP_LG}>
              <Typography variant={TYPO_PAGE_TITLE} color={COLOR_NAVY_DEEP}>{t('landingHero')}</Typography>
              <Typography color={COLOR_MUTED}>{t('landingSub')}</Typography>
              <Flex gap={FLEX_GAP_MD} wrap="wrap">
                <Button variant="primary" onClick={() => navigate(ROUTE_AUTH)}>{t('addCar')}</Button>
                <Button variant="ghost" onClick={() => navigate(ROUTE_AUTH)}>{t('howItWorksCta')}</Button>
              </Flex>
            </Flex>
          </Card>
          <LandingHow title={t('howItWorks')} translate={t} />
          <LandingFeatures title={t('inOnePlace')} translate={t} />
          <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
            <Flex direction="column" gap={FLEX_GAP_MD}>
              <Typography variant={TYPO_SECTION_TITLE}>{t('trustTitle')}</Typography>
              <Typography color={COLOR_MUTED}>{t('trustBody')}</Typography>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </Box>
  );
}
