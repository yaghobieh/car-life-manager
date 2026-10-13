import React from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import { Box, Flex, Typography } from '@forgedevstack/bear';
import { SvgIcon } from '../../Landing.art';
import type { LandingNavbarProps } from './LandingNavbar.types';

export function LandingNavbar({
  routePath,
  user,
  carsCount,
  apartmentsCount,
  favoritesCount,
  userMenuOpen,
  setUserMenuOpen,
  userMenuRef,
  mobileMenuOpen,
  setMobileMenuOpen,
  themeMode,
  cycleTheme,
  setLoginModalOpen,
  showToast,
  goTo,
}: LandingNavbarProps) {
  const t = useTranslate();

  const handleNavClick = (path: string) => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    goTo(path);
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    showToast(t('landing_logoutSuccess'));
  };

  const handleLoginClick = () => {
    setUserMenuOpen(false);
    setLoginModalOpen(true);
  };

  const getThemeBadgeLabel = () => {
    switch (themeMode) {
      case 'light':
        return t('landing_themeLightBadge');
      case 'dark':
        return t('landing_themeDarkBadge');
      case 'system':
      default:
        return t('landing_themeSystemBadge');
    }
  };

  const renderThemeIcon = () => {
    switch (themeMode) {
      case 'light':
        return <SvgIcon name="sun" />;
      case 'dark':
        return <SvgIcon name="moon" />;
      case 'system':
      default:
        return <SvgIcon name="device" />;
    }
  };

  const userInitial = user?.name ? user.name.slice(0, 1) : 'ג';
  const userName = user?.name || t('landing_guest');
  const userEmail = user?.email || t('landing_notConnected');

  return (
    <header className="site-header">
      <div className="container">
        <a
          href="#/"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('/');
          }}
          aria-label={t('landing_brand')}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true" width="34" height="34">
            <rect width="32" height="32" rx="10" fill="#0B7A75" />
            <path
              d="M7 15 16 8l9 7"
              stroke="#fff"
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="21" r="4.2" fill="#FFB627" />
          </svg>
          {t('landing_brand')}
        </a>

        <nav
          className={`nav ${mobileMenuOpen ? 'is-open' : ''}`}
          id="nav"
          aria-label={t('landing_menu')}
        >
          <a
            href="#/apartments"
            className={routePath === 'apartments' ? 'is-active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/apartments');
            }}
          >
            <SvgIcon name="home" />
            {t('landing_apartments')}
          </a>
          <a
            href="#/cars"
            className={routePath === 'cars' ? 'is-active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/cars');
            }}
          >
            <SvgIcon name="car" />
            {t('landing_cars')}
          </a>
          <a
            href="#/favorites"
            className={routePath === 'favorites' ? 'is-active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/favorites');
            }}
          >
            <SvgIcon name="heart" />
            {t('landing_favorites')}
          </a>
          <a
            href="#/generals"
            className={routePath === 'generals' ? 'is-active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/generals');
            }}
          >
            <SvgIcon name="shield" />
            {t('landing_generals')}
          </a>
        </nav>

        <div className="head-actions" ref={userMenuRef}>
          <a
            className="btn btn--ghost btn--icon"
            href="#/favorites"
            aria-label={t('landing_favorites')}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/favorites');
            }}
          >
            <SvgIcon name="heart" />
            {favoritesCount > 0 && (
              <span className="fav-count" id="favCount">
                {favoritesCount}
              </span>
            )}
          </a>

          <button
            type="button"
            className="btn btn--ghost hide-sm"
            id="loginBtn"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-expanded={userMenuOpen}
          >
            <SvgIcon name="user" />
            {user ? user.name || t('landing_myAccount') : t('landing_login')}
          </button>

          {userMenuOpen && (
            <div className="user-dropdown-menu" role="menu">
              <div className="user-dropdown-header">
                <div className="user-dropdown-avatar">{userInitial}</div>
                <div className="user-dropdown-info">
                  <div className="user-dropdown-name">{userName}</div>
                  <div className="user-dropdown-sub">{userEmail}</div>
                </div>
              </div>

              <div className="user-dropdown-divider" />

              <button
                type="button"
                className="user-dropdown-item"
                onClick={cycleTheme}
              >
                <span className="user-dropdown-item-left">
                  {renderThemeIcon()}
                  <span>{t('landing_themeLabel')}</span>
                </span>
                <span className="user-dropdown-theme-badge">{getThemeBadgeLabel()}</span>
              </button>

              <div className="user-dropdown-divider" />

              {user ? (
                <button
                  type="button"
                  className="user-dropdown-item user-dropdown-item--danger"
                  onClick={handleLogout}
                >
                  <SvgIcon name="logout" />
                  <span>{t('landing_logout')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="user-dropdown-item"
                  onClick={handleLoginClick}
                >
                  <SvgIcon name="user" />
                  <span>{t('landing_loginToSystem')}</span>
                </button>
              )}
            </div>
          )}

          <a
            className="btn"
            href="#/post"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/post');
            }}
          >
            <SvgIcon name="plus" />
            {t('landing_postAd')}
          </a>

          <button
            type="button"
            className="btn btn--ghost btn--icon menu-btn"
            id="menuBtn"
            aria-label={t('landing_menu')}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <SvgIcon name="menu" />
          </button>
        </div>
      </div>
    </header>
  );
}
