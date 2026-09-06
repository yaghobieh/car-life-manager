import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Typography,
  useIsDesktop,
} from '@forgedevstack/bear';
import { LocaleSwitcher, useTranslate } from '@forgedevstack/lingo/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  COLOR_BG,
  COLOR_CARD,
  COLOR_NAVY_DEEP,
  COLOR_WHITE,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  MOBILE_NAV_COUNT,
  ROUTE_ONBOARDING,
  SIDEBAR_WIDTH,
  ZERO,
} from '@const';
import { Logo } from '@components/Logo';
import { useAppState } from '@hooks';
import { NAV_ITEMS } from './AppShell.const';
import { activeNavId, navButtonVariant } from './AppShell.utils';

export function AppShell() {
  const { vehicles, currentId, select } = useAppState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const t = useTranslate();
  const isDesktop = useIsDesktop();
  const current = vehicles.find((item) => item.id === currentId);
  const activeId = activeNavId(pathname, NAV_ITEMS);

  return (
    <Box bg={COLOR_BG} className="Bear-AppShell bear-min-h-screen">
      <Flex className="bear-min-h-screen">
        {isDesktop && (
          <Box
            as="aside"
            bg={COLOR_NAVY_DEEP}
            p={3}
            className="bear-min-h-screen"
            style={{ width: SIDEBAR_WIDTH }}
          >
            <Flex direction="column" gap={FLEX_GAP_MD} className="bear-h-full">
              <Logo onDark />
              <Flex direction="column" gap={FLEX_GAP_SM} className="bear-flex-1">
                {NAV_ITEMS.map((item) => (
                  <Button
                    key={item.id}
                    variant={navButtonVariant(item.id === activeId)}
                    fullWidth
                    disableElevation
                    className="bear-justify-start"
                    style={{ borderWidth: ZERO }}
                    onClick={() => navigate(item.to)}
                  >
                    {t(item.labelKey)}
                  </Button>
                ))}
              </Flex>
            </Flex>
          </Box>
        )}
        <Flex direction="column" className="bear-flex-1">
          <Box as="header" bg={COLOR_CARD} px={6} py={4} shadow="sm">
            <Flex align="center" justify="between" gap={FLEX_GAP_MD}>
              {!isDesktop && <Logo compact />}
              <Input aria-label={t('search')} placeholder={t('search')} radius="pill" fullWidth />
              <Flex align="center" gap={FLEX_GAP_MD}>
                <LocaleSwitcher />
                <Button variant="ghost" iconOnly aria-label={t('notifications')}>
                  🔔
                </Button>
                <Button variant="ghost" iconOnly aria-label={t('account')}>
                  👤
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box as="main" p={6} className="bear-flex-1">
            <Flex justify="between" align="center" gap={FLEX_GAP_MD} className="bear-mb-4">
              {current && (
                <Select
                  aria-label={t('selectVehicle')}
                  value={current.id}
                  onChange={select}
                  options={vehicles.map((vehicle) => ({
                    value: vehicle.id,
                    label: vehicle.formattedRegistrationNumber,
                  }))}
                />
              )}
              <Button variant="primary" onClick={() => navigate(ROUTE_ONBOARDING)}>
                {t('addVehicle')}
              </Button>
            </Flex>
            <Outlet />
          </Box>
          {!isDesktop && (
            <Box as="nav" bg={COLOR_NAVY_DEEP} p={2}>
              <Flex justify="around">
                {NAV_ITEMS.slice(ZERO, MOBILE_NAV_COUNT).map((item) => (
                  <Button
                    key={item.id}
                    variant={navButtonVariant(item.id === activeId)}
                    compact
                    disableElevation
                    onClick={() => navigate(item.to)}
                  >
                    <Typography color={COLOR_WHITE}>{t(item.labelKey)}</Typography>
                  </Button>
                ))}
              </Flex>
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
