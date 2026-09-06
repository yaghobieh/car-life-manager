import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Sidebar,
  useIsDesktop,
} from '@forgedevstack/bear';
import { LocaleSwitcher, useTranslate } from '@forgedevstack/lingo/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  COLOR_BG,
  COLOR_NAVY_DEEP,
  COLOR_WHITE,
  FLEX_GAP_MD,
  MOBILE_NAV_COUNT,
  MOBILE_NAV_PADDING,
  PAGE_PADDING,
  ROUTE_ONBOARDING,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  TOOLBAR_MARGIN,
  TOPBAR_PADDING,
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
    <Flex className="Bear-AppShell" style={{ minHeight: '100vh', background: COLOR_BG }}>
      {isDesktop ? (
        <Sidebar
          className="dark"
          items={items}
          activeItemId={activeNavId(pathname, NAV_ITEMS)}
          width={SIDEBAR_WIDTH}
          collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
          position="right"
          fullHeight
          header={<Logo />}
          style={{ background: COLOR_NAVY_DEEP, color: COLOR_WHITE, minHeight: '100vh' }}
        />
      ) : null}
      <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
        <Box as="header">
          <Flex align="center" justify="between" gap={FLEX_GAP_MD} style={{ padding: TOPBAR_PADDING }}>
            {isDesktop ? null : <Logo compact />}
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
        <Box as="main" style={{ padding: PAGE_PADDING, flex: 1 }}>
          <Flex justify="between" align="center" gap={FLEX_GAP_MD} style={{ marginBottom: TOOLBAR_MARGIN }}>
            <Button variant="primary" onClick={() => navigate(ROUTE_ONBOARDING)}>
              {t('addVehicle')}
            </Button>
            {current ? (
              <Select
                aria-label={t('selectVehicle')}
                value={current.id}
                onChange={select}
                options={vehicles.map((vehicle) => ({
                  value: vehicle.id,
                  label: vehicle.formattedRegistrationNumber,
                }))}
              />
            ) : null}
          </Flex>
          <Outlet />
        </Box>
        {isDesktop ? null : (
          <Box as="nav" style={{ background: COLOR_NAVY_DEEP, padding: MOBILE_NAV_PADDING, position: 'sticky', bottom: 0 }}>
            <Flex justify="around">
              {NAV_ITEMS.slice(0, MOBILE_NAV_COUNT).map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  compact
                  onClick={() => navigate(item.to)}
                  style={{ color: COLOR_WHITE }}
                >
                  {t(item.labelKey)}
                </Button>
              ))}
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
