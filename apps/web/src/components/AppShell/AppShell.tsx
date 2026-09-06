import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Select,
  Sidebar,
  Typography,
  useIsDesktop,
} from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { BearIcons, MenuIcon } from '@forgedevstack/bear-icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  COLOR_BG,
  COLOR_CARD,
  COLOR_MUTED_2,
  COLOR_NAVY_DEEP,
  COLOR_WHITE,
  EMPTY_STRING,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  ROUTE_ONBOARDING,
  ROUTE_SETTINGS,
  SIDEBAR_WIDTH,
  ZERO,
} from '@const';
import { LocaleSelect } from '@components/LocaleSelect';
import { Logo } from '@components/Logo';
import { PlateBadge } from '@components/PlateBadge';
import { ClerkSignedInButton } from '../../auth/ClerkAuthControls';
import { useAppState } from '@hooks';
import { NAV_ITEMS } from './AppShell.const';
import { AppShellMenu } from './AppShellMenu';
import { AppShellSearch } from './components/AppShellSearch';
import {
  activeNavId,
  isMoreNavActive,
  mobilePrimaryItems,
  navButtonVariant,
  sidebarGroups,
  userInitials,
  vehicleOptionLabel,
} from './AppShell.utils';

export function AppShell() {
  const { vehicles, currentId, select, user } = useAppState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const t = useTranslate();
  const isDesktop = useIsDesktop();
  const [menuOpen, setMenuOpen] = useState(BOOLEAN_FALSE);
  const [query, setQuery] = useState(EMPTY_STRING);
  const current = vehicles.find((item) => item.id === currentId);
  const activeId = activeNavId(pathname, NAV_ITEMS);
  const primaryItems = mobilePrimaryItems(NAV_ITEMS);
  const moreActive = isMoreNavActive(activeId);
  const groups = sidebarGroups(NAV_ITEMS, t);
  const initials = userInitials(user?.name, user?.email);

  function goTo(to: string) {
    setMenuOpen(BOOLEAN_FALSE);
    navigate(to);
  }

  const sidebarItems = groups.map((group) => ({
    id: group.id,
    label: group.label,
    children: group.items.map((item) => ({
      id: item.id,
      label: t(item.labelKey),
      onClick: () => navigate(item.to),
    })),
  }));

  return (
    <Box bg={COLOR_BG} className="Bear-AppShell bear-min-h-screen">
      <Flex className="bear-min-h-screen">
        {isDesktop && (
          <Sidebar
            items={sidebarItems}
            activeItemId={activeId}
            onItemClick={(item) => {
              const match = NAV_ITEMS.find((nav) => nav.id === item.id);
              if (match) navigate(match.to);
            }}
            header={<Logo onDark />}
            footer={(
              <Typography color={COLOR_MUTED_2}>{t('officialFooter')}</Typography>
            )}
            width={SIDEBAR_WIDTH}
            fullHeight
            activeVariant="indicator"
            className="Bear-AppShell__sidebar"
            style={{ background: COLOR_NAVY_DEEP, color: COLOR_WHITE }}
          />
        )}
        <Flex direction="column" className="bear-flex-1">
          <Box as="header" bg={COLOR_CARD} px={isDesktop ? 6 : 3} py={isDesktop ? 4 : 3} shadow="sm">
            {isDesktop ? (
              <Flex align="center" gap={FLEX_GAP_MD}>
                <AppShellSearch query={query} onQueryChange={setQuery} />
                {current && (
                  <Select
                    aria-label={t('selectVehicle')}
                    value={current.id}
                    onChange={select}
                    renderValue={() => (
                      <Flex align="center" gap={FLEX_GAP_SM}>
                        <PlateBadge plate={current.formattedRegistrationNumber} />
                        <Typography>{vehicleOptionLabel(current)}</Typography>
                      </Flex>
                    )}
                    options={vehicles.map((vehicle) => ({
                      value: vehicle.id,
                      label: vehicleOptionLabel(vehicle),
                    }))}
                  />
                )}
                <Box className="bear-flex-1" />
                <LocaleSelect showLabel={BOOLEAN_FALSE} />
                <Button variant="ghost" iconOnly aria-label={t('notifications')} onClick={() => navigate(ROUTE_SETTINGS)}>
                  <BearIcons.Communication.BellIcon />
                </Button>
                <ClerkSignedInButton />
                <Flex align="center" gap={FLEX_GAP_SM}>
                  {user?.name && <Typography weight="bold">{user.name}</Typography>}
                  <Button variant="ghost" iconOnly aria-label={t('account')} onClick={() => navigate(ROUTE_SETTINGS)}>
                    <Avatar initials={initials || undefined} size="sm" alt={t('account')} />
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
                    <Button variant="ghost" iconOnly aria-label={t('notifications')} onClick={() => navigate(ROUTE_SETTINGS)}>
                      <BearIcons.Communication.BellIcon />
                    </Button>
                    <Button variant="ghost" iconOnly aria-label={t('account')} onClick={() => navigate(ROUTE_SETTINGS)}>
                      <Avatar initials={initials || undefined} size="sm" alt={t('account')} />
                    </Button>
                  </Flex>
                </Flex>
                <AppShellSearch query={query} onQueryChange={setQuery} />
              </Flex>
            )}
          </Box>
          <Box as="main" p={isDesktop ? 6 : 3} className="bear-flex-1">
            {!isDesktop && current && (
              <Flex className="bear-mb-4" gap={FLEX_GAP_MD} wrap="wrap">
                <Select
                  aria-label={t('selectVehicle')}
                  value={current.id}
                  onChange={select}
                  fullWidth
                  renderValue={() => (
                    <Flex align="center" gap={FLEX_GAP_SM}>
                      <PlateBadge plate={current.formattedRegistrationNumber} />
                      <Typography>{vehicleOptionLabel(current)}</Typography>
                    </Flex>
                  )}
                  options={vehicles.map((vehicle) => ({
                    value: vehicle.id,
                    label: vehicleOptionLabel(vehicle),
                  }))}
                />
                <Button variant="primary" fullWidth onClick={() => navigate(ROUTE_ONBOARDING)}>
                  {t('addVehicle')}
                </Button>
              </Flex>
            )}
            {isDesktop && (
              <Flex justify="end" className="bear-mb-4">
                <Button variant="primary" onClick={() => navigate(ROUTE_ONBOARDING)}>
                  {t('addVehicle')}
                </Button>
              </Flex>
            )}
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
