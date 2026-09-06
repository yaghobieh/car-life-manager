import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Sidebar,
  Typography,
  useIsDesktop,
} from '@forgedevstack/bear';
import { LocaleSwitcher, useTranslate } from '@forgedevstack/lingo/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  COLOR_NAVY_DEEP,
  COLOR_WHITE,
  FLEX_GAP_MD,
  MOBILE_NAV_COUNT,
  ROUTE_ONBOARDING,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  ZERO,
} from '@const';
import { Logo } from '@components/Logo';
import { useAppState } from '@hooks';
import { NAV_ITEMS } from './AppShell.const';
import { activeNavId } from './AppShell.utils';

export function AppShell() {
  const { vehicles, currentId, select } = useAppState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const t = useTranslate();
  const isDesktop = useIsDesktop();
  const current = vehicles.find((item) => item.id === currentId);
  const items = NAV_ITEMS.map((item) => ({
    id: item.id,
    label: t(item.labelKey),
    onClick: () => navigate(item.to),
  }));

  return (
    <Flex className="Bear-AppShell bear-min-h-screen">
      {isDesktop && (
        <Box bg={COLOR_NAVY_DEEP} className="bear-min-h-screen">
          <Sidebar
            items={items}
            activeItemId={activeNavId(pathname, NAV_ITEMS)}
            width={SIDEBAR_WIDTH}
            collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
            position="right"
            fullHeight
            header={<Logo />}
          />
        </Box>
      )}
      <Flex direction="column" className="bear-flex-1">
        <Box as="header" p={4}>
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
            <Button variant="primary" onClick={() => navigate(ROUTE_ONBOARDING)}>
              {t('addVehicle')}
            </Button>
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
          </Flex>
          <Outlet />
        </Box>
        {!isDesktop && (
          <Box as="nav" bg={COLOR_NAVY_DEEP} p={2}>
            <Flex justify="around">
              {NAV_ITEMS.slice(ZERO, MOBILE_NAV_COUNT).map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  compact
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
  );
}
