import { useState } from 'react';
import { useIsDesktop } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  BRAND_PROPERTY_ACCENT,
  BRAND_PROPERTY_LEAD,
  ROUTE_PLATFORM,
  ROUTE_PROPERTY,
  ROUTE_SETTINGS,
  SVG_BELL,
  SVG_BELL_SIZE,
  LOGO_PROPERTY,
  SVG_LOGO_SIZE,
  SVG_NAV_SIZE,
} from '@const';
import { useAppState } from '@hooks';
import { AppShellMenu } from '../AppShell/AppShellMenu';
import { AppShellSidebar } from '../AppShell/components/AppShellSidebar';
import { activeNavId, sidebarGroups, userInitials } from '../AppShell/AppShell.utils';
import { PROPERTY_NAV_ITEMS } from './PropertyShell.const';

export function PropertyShell() {
  const { user } = useAppState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const t = useTranslate();
  const isDesktop = useIsDesktop();
  const [menuOpen, setMenuOpen] = useState(BOOLEAN_FALSE);
  const activeId = activeNavId(pathname, PROPERTY_NAV_ITEMS, ROUTE_PROPERTY);
  const groups = sidebarGroups(PROPERTY_NAV_ITEMS, t);
  const initials = userInitials(user?.name, user?.email);

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
          footer={t('propertyFooter')}
          brandLead={BRAND_PROPERTY_LEAD}
          brandAccent={BRAND_PROPERTY_ACCENT}
          brandMark={LOGO_PROPERTY}
          tagline={t('propertyTagline')}
          onBrandClick={() => goTo(ROUTE_PLATFORM)}
          productsLabel={t('allProducts')}
          onProductsClick={() => goTo(ROUTE_PLATFORM)}
        />
      )}
      <div className="Clm-main">
        <header className="Clm-topbar">
          {isDesktop ? (
            <>
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
              <button type="button" className="Clm-logo" onClick={() => goTo(ROUTE_PLATFORM)}>
                <img src={LOGO_PROPERTY} alt={t('platformBrand')} width={SVG_LOGO_SIZE} height={SVG_LOGO_SIZE} />
              </button>
              <div className="Clm-topbar-spacer" />
              <button type="button" className="Clm-icon-btn" aria-label={t('menu')} onClick={() => setMenuOpen(BOOLEAN_TRUE)}>☰</button>
            </>
          )}
        </header>
        <div className="Clm-content">
          <Outlet />
        </div>
        {!isDesktop && (
          <nav className="Clm-mobile-bar">
            {PROPERTY_NAV_ITEMS.map((item) => (
              <button key={item.id} type="button" onClick={() => goTo(item.to)}>
                <img src={item.iconSrc} alt="" width={SVG_NAV_SIZE} height={SVG_NAV_SIZE} />
                <div>{t(item.shortLabelKey ?? item.labelKey)}</div>
              </button>
            ))}
          </nav>
        )}
      </div>
      <AppShellMenu
        isOpen={menuOpen}
        items={PROPERTY_NAV_ITEMS}
        activeId={activeId}
        onClose={() => setMenuOpen(BOOLEAN_FALSE)}
        onNavigate={goTo}
        productsLabel={t('allProducts')}
        onProductsClick={() => goTo(ROUTE_PLATFORM)}
      />
    </div>
  );
}
