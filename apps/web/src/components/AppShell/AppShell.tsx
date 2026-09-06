import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Typography,
  useIsDesktop,
} from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { BearIcons, MenuIcon, UserIcon } from '@forgedevstack/bear-icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  COLOR_BG,
  COLOR_CARD,
  COLOR_NAVY_DEEP,
  COLOR_WHITE,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  ROUTE_ONBOARDING,
  ROUTE_SETTINGS,
  SIDEBAR_WIDTH,
  ZERO,
} from '@const';
import { LocaleSelect } from '@components/LocaleSelect';
import { Logo } from '@components/Logo';
import { useAppState } from '@hooks';
import { NAV_ITEMS } from './AppShell.const';
import { AppShellMenu } from './AppShellMenu';
import { activeNavId, isMoreNavActive, mobilePrimaryItems, navButtonVariant, vehicleOptionLabel } from './AppShell.utils';

export function AppShell() {
  const { vehicles, currentId, select, user } = useAppState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const t = useTranslate();
  const isDesktop = useIsDesktop();
  const [menuOpen, setMenuOpen] = useState(BOOLEAN_FALSE);
  const current = vehicles.find((item) => item.id === currentId);
  const activeId = activeNavId(pathname, NAV_ITEMS);
  const primaryItems = mobilePrimaryItems(NAV_ITEMS);
  const moreActive = isMoreNavActive(activeId);

  function goTo(to: string) {
    setMenuOpen(BOOLEAN_FALSE);
    navigate(to);
  }

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
          <Box as="header" bg={COLOR_CARD} px={isDesktop ? 6 : 3} py={isDesktop ? 4 : 3} shadow="sm">
            {isDesktop ? (
              <Flex align="center" justify="between" gap={FLEX_GAP_MD}>
                <Input aria-label={t('search')} placeholder={t('search')} radius="pill" fullWidth />
                <Flex align="center" gap={FLEX_GAP_MD}>
                  <LocaleSelect />
                  <Button variant="ghost" iconOnly aria-label={t('notifications')}>
                    <BearIcons.Communication.BellIcon />
                  </Button>
                  {user?.name && <Typography>{user.name}</Typography>}
                  <Button variant="ghost" iconOnly aria-label={t('account')} onClick={() => navigate(ROUTE_SETTINGS)}>
                    <UserIcon />
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <Flex direction="column" gap={FLEX_GAP_SM}>
                <Flex align="center" justify="between" gap={FLEX_GAP_SM}>
                  <Logo compact />
                  <Flex align="center" gap={FLEX_GAP_SM}>
                    <Button variant="ghost" iconOnly aria-label={t('menu')} onClick={() => setMenuOpen(BOOLEAN_TRUE)}>
                      <MenuIcon />
                    </Button>
                    <Button variant="ghost" iconOnly aria-label={t('notifications')}>
                      <BearIcons.Communication.BellIcon />
                    </Button>
                    <Button variant="ghost" iconOnly aria-label={t('account')} onClick={() => navigate(ROUTE_SETTINGS)}>
                      <UserIcon />
                    </Button>
                  </Flex>
                </Flex>
                <Input aria-label={t('search')} placeholder={t('search')} radius="pill" fullWidth />
              </Flex>
            )}
          </Box>
          <Box as="main" p={isDesktop ? 6 : 3} className="bear-flex-1">
            <Flex
              direction={isDesktop ? 'row' : 'column'}
              justify="between"
              align={isDesktop ? 'center' : 'stretch'}
              gap={FLEX_GAP_MD}
              className="bear-mb-4"
            >
              {current && (
                <Select
                  aria-label={t('selectVehicle')}
                  value={current.id}
                  onChange={select}
                  fullWidth={!isDesktop}
                  options={vehicles.map((vehicle) => ({
                    value: vehicle.id,
                    label: vehicleOptionLabel(vehicle),
                  }))}
                />
              )}
              <Button variant="primary" fullWidth={!isDesktop} onClick={() => navigate(ROUTE_ONBOARDING)}>
                {t('addVehicle')}
              </Button>
            </Flex>
            <Outlet />
          </Box>
          {!isDesktop && (
            <Box as="nav" bg={COLOR_NAVY_DEEP} px={2} py={2} className="bear-sticky bear-bottom-0">
              <Flex justify="around" align="center">
                {primaryItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={navButtonVariant(item.id === activeId)}
                    compact
                    disableElevation
                    style={{ borderWidth: ZERO }}
                    onClick={() => goTo(item.to)}
                  >
                    <Typography color={COLOR_WHITE}>{t(item.shortLabelKey ?? item.labelKey)}</Typography>
                  </Button>
                ))}
                <Button
                  variant={navButtonVariant(moreActive)}
                  compact
                  disableElevation
                  style={{ borderWidth: ZERO }}
                  onClick={() => setMenuOpen(BOOLEAN_TRUE)}
                >
                  <Typography color={COLOR_WHITE}>{t('more')}</Typography>
                </Button>
              </Flex>
            </Box>
          )}
        </Flex>
      </Flex>
      <AppShellMenu
        isOpen={menuOpen}
        items={NAV_ITEMS}
        activeId={activeId}
        onClose={() => setMenuOpen(BOOLEAN_FALSE)}
        onNavigate={goTo}
      />
    </Box>
  );
}
