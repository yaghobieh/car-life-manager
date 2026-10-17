import React from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { LandingFooterProps } from './LandingFooter.types';

export function LandingFooter({
  onNavigate,
  onSetAptDealFilter,
  onSetCarFuelFilter,
  onShowToast,
}: LandingFooterProps) {
  const t = useTranslate();

  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="cols">
          <div>
            <a
              href="#/"
              className="logo"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
            >
              <svg viewBox="0 0 32 32" aria-hidden="true" width="32" height="32">
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
            <p>{t('landing_footerTagline')}</p>
          </div>

          <div>
            <h4>{t('landing_footerApts')}</h4>
            <ul>
              <li>
                <a
                  href="#/apartments"
                  onClick={(e) => {
                    e.preventDefault();
                    onSetAptDealFilter('sale');
                    onNavigate('/apartments');
                  }}
                >
                  {t('landing_footerAptsSale')}
                </a>
              </li>
              <li>
                <a
                  href="#/apartments"
                  onClick={(e) => {
                    e.preventDefault();
                    onSetAptDealFilter('rent');
                    onNavigate('/apartments');
                  }}
                >
                  {t('landing_footerAptsRent')}
                </a>
              </li>
              <li>
                <a
                  href="#/post"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/post');
                  }}
                >
                  {t('landing_footerPostApt')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t('landing_footerCars')}</h4>
            <ul>
              <li>
                <a
                  href="#/cars"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/cars');
                  }}
                >
                  {t('landing_footerAllCars')}
                </a>
              </li>
              <li>
                <a
                  href="#/cars"
                  onClick={(e) => {
                    e.preventDefault();
                    onSetCarFuelFilter('חשמלי');
                    onNavigate('/cars');
                  }}
                >
                  {t('landing_footerElectricCars')}
                </a>
              </li>
              <li>
                <a
                  href="#/post"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/post');
                  }}
                >
                  {t('landing_footerPostCar')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t('landing_footerInfo')}</h4>
            <ul>
              <li>
                <a
                  href="#/design"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/design');
                  }}
                >
                  {t('landing_footerDesign')}
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    onShowToast(t('landing_comingSoon'));
                  }}
                >
                  {t('landing_footerTerms')}
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    onShowToast(t('landing_comingSoon'));
                  }}
                >
                  {t('landing_footerPrivacy')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="legal">
          <span>{t('landing_footerLegal')}</span>
          <span>{t('landing_footerStandards')}</span>
        </div>
      </div>
    </footer>
  );
}
