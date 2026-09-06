import { useState } from 'react';
import { Flex, Select, Typography, useIsDesktop } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  EMPTY_STRING,
  FLEX_GAP_SM,
  ROUTE_SERVICES,
  ROUTE_SETTINGS,
  SVG_BELL,
  SVG_BELL_SIZE,
  SVG_LOGO_MARK,
  SVG_LOGO_SIZE,
  SVG_NAV_SIZE,
} from '@const';
import { ClmBanner, ClmPlate } from '@common';
import { useAppState } from '@hooks';
import { connectedServiceCount } from '../../pages/Services/Services.utils';
import { NAV_ITEMS } from './AppShell.const';
import { AppShellMenu } from './AppShellMenu';
import { AppShellSearch } from './components/AppShellSearch';
import { AppShellSidebar } from './components/AppShellSidebar';
import {
  activeNavId,
  isMoreNavActive,
  mobilePrimaryItems,
  sidebarGroups,
  userInitials,
  vehicleShortName,
} from './AppShell.utils';

export function AppShell() {
  const { vehicles, currentId, select, user, dashboard } = useAppState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const t = useTranslate();
  const isDesktop = useIsDesktop();
  const [menuOpen, setMenuOpen] = useState(BOOLEAN_FALSE);
  const [query, setQuery] = useState(EMPTY_STRING);
  const [bannerOpen, setBannerOpen] = useState(BOOLEAN_TRUE);
  const current = vehicles.find((item) => item.id === currentId);
  const activeId = activeNavId(pathname, NAV_ITEMS);
  const primaryItems = mobilePrimaryItems(NAV_ITEMS);
  const moreActive = isMoreNavActive(activeId);
  const groups = sidebarGroups(NAV_ITEMS, t);
  const initials = userInitials(user?.name, user?.email);
  const connectedCount = connectedServiceCount(dashboard?.services ?? []);
  const showBanner = bannerOpen && connectedCount === 0;

  function goTo(to: string) {
    setMenuOpen(BOOLEAN_FALSE);
    navigate(to);
  }

  return (
    <div className="Clm-app">
      {isDesktop && (
        <AppShellSidebar
          groups={groups}
          activeId={activeId}
          onNavigate={goTo}
          footer={t('officialFooter')}
        />
      )}
      <div className="Clm-main">
        <header className="Clm-topbar">
          {isDesktop ? (
            <>
              <AppShellSearch query={query} onQueryChange={setQuery} />
              {current && (
                <div className="Clm-vehicle-select">
                  <Select
                    aria-label={t('selectVehicle')}
                    value={current.id}
                    onChange={select}
                    renderValue={() => (
                      <Flex align="center" gap={FLEX_GAP_SM}>
                        <ClmPlate plate={current.formattedRegistrationNumber} compact />
                        <Typography>{vehicleShortName(current)}</Typography>
                      </Flex>
                    )}
                    options={vehicles.map((vehicle) => ({
                      value: vehicle.id,
                      label: vehicleShortName(vehicle),
                    }))}
                  />
                </div>
              )}
              <div className="Clm-topbar-spacer" />
              <button type="button" className="Clm-icon-btn" aria-label={t('notifications')} onClick={() => navigate(ROUTE_SETTINGS)}>
                <img src={SVG_BELL} alt="" width={SVG_BELL_SIZE} height={SVG_BELL_SIZE} />
              </button>
              <button type="button" className="Clm-user-chip" onClick={() => navigate(ROUTE_SETTINGS)}>
                <span>{user?.name || t('account')}</span>
                <span className="Clm-avatar">{initials || '·'}</span>
              </button>
            </>
          ) : (
            <>
              <div className="Clm-logo">
                <img src={SVG_LOGO_MARK} alt={t('brand')} width={SVG_LOGO_SIZE} height={SVG_LOGO_SIZE} />
              </div>
              <div className="Clm-topbar-spacer" />
              <button type="button" className="Clm-icon-btn" aria-label={t('menu')} onClick={() => setMenuOpen(BOOLEAN_TRUE)}>☰</button>
              <button type="button" className="Clm-icon-btn" aria-label={t('notifications')} onClick={() => navigate(ROUTE_SETTINGS)}>
                <img src={SVG_BELL} alt="" width={SVG_BELL_SIZE} height={SVG_BELL_SIZE} />
              </button>
            </>
          )}
        </header>
        {!isDesktop && <div className="Clm-content" style={{ paddingBottom: 0 }}><AppShellSearch query={query} onQueryChange={setQuery} /></div>}
        <div className="Clm-content">
          {showBanner && (
            <ClmBanner
              title={t('bannerConnectionsTitle')}
              body={t('bannerConnectionsBody')}
              actionLabel={t('bannerConnectionsCta')}
              onAction={() => navigate(ROUTE_SERVICES)}
              onClose={() => setBannerOpen(BOOLEAN_FALSE)}
              closeLabel={t('close')}
            />
          )}
          <Outlet />
        </div>
        {!isDesktop && (
          <nav className="Clm-mobile-bar">
            {primaryItems.map((item) => (
              <button key={item.id} type="button" onClick={() => goTo(item.to)}>
                <img src={item.iconSrc} alt="" width={SVG_NAV_SIZE} height={SVG_NAV_SIZE} />
                <div>{t(item.shortLabelKey ?? item.labelKey)}</div>
              </button>
            ))}
            <button type="button" onClick={() => setMenuOpen(BOOLEAN_TRUE)}>
              {t('more')}
              {moreActive ? ' ·' : ''}
            </button>
          </nav>
        )}
      </div>
      <AppShellMenu
        isOpen={menuOpen}
        items={NAV_ITEMS}
        activeId={activeId}
        onClose={() => setMenuOpen(BOOLEAN_FALSE)}
        onNavigate={goTo}
      />
    </div>
  );
}
