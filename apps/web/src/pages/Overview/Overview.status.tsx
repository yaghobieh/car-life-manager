import { Box, Button, Card, Flex, Grid, Typography } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import {
  CARD_RADIUS_XL,
  COLOR_BLUE,
  COLOR_MUTED,
  COLOR_TILE,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  ROUTE_DOCUMENTS,
  STATUS_TILE_COLS,
  TYPO_SECTION_TITLE,
} from '@const';
import { statusKindLabel } from '@locales';
import type { OverviewStatusProps } from './Overview.types';
import { formatOverviewDate, statusKindColor } from './Overview.utils';

export function OverviewStatus(props: OverviewStatusProps) {
  const { licenseKind, testKind, registrationExpiry, nextTestDate, lastTestDate } = props;
  const navigate = useNavigate();
  const t = useTranslate();
  const { locale } = useLingoFormat();

  return (
    <Card className="Bear-Overview__status" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Typography variant={TYPO_SECTION_TITLE}>{t('generalStatus')}</Typography>
        <Grid cols={STATUS_TILE_COLS} gap={FLEX_GAP_SM}>
          <Box bg={COLOR_TILE} p={3} rounded="lg">
            <Typography color={COLOR_MUTED}>{t('license')}</Typography>
            <Typography color={statusKindColor(licenseKind)} weight="bold">
              {statusKindLabel(licenseKind, t)}
            </Typography>
            <Typography color={COLOR_MUTED}>
              {formatOverviewDate(registrationExpiry, locale, t('unknown'))}
            </Typography>
          </Box>
          <Box bg={COLOR_TILE} p={3} rounded="lg">
            <Typography color={COLOR_MUTED}>{t('test')}</Typography>
            <Typography color={statusKindColor(testKind)} weight="bold">
              {statusKindLabel(testKind, t)}
            </Typography>
            <Typography color={COLOR_MUTED}>
              {formatOverviewDate(nextTestDate, locale, t('unknown'))}
            </Typography>
            <Typography color={COLOR_MUTED}>
              {t('lastTest')}: {formatOverviewDate(lastTestDate, locale, t('unknown'))}
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
  );
}
