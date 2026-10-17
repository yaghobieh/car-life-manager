import { useNavigate } from 'react-router-dom';
import { useTranslate } from '@forgedevstack/lingo/react';
import { ROUTE_AUTH, ROUTE_SETTINGS } from '@const';
import { LocaleSelect } from '@components/LocaleSelect';
import { Logo } from '@components/Logo';
import { ClmButton } from '@common';
import { useAppState } from '@hooks';
import { PLATFORM_PRODUCTS } from './Platform.const';
import { PlatformProductCard } from './helpers/PlatformProductCard';

export function Platform() {
  const { user, authReady } = useAppState();
  const navigate = useNavigate();
  const t = useTranslate();

  if (!authReady) {
    return null;
  }

  return (
    <div className="Clm-platform">
      <header className="Clm-platform-top">
        <div className="Clm-logo">
          <Logo onDark compact />
          <div className="Clm-logo-word">{t('platformBrand')}</div>
        </div>
        <div className="Clm-platform-actions">
          <LocaleSelect />
          {user ? (
            <ClmButton kind="outline" onClick={() => navigate(ROUTE_SETTINGS)}>{user.name || t('account')}</ClmButton>
          ) : (
            <ClmButton onClick={() => navigate(ROUTE_AUTH)}>{t('login')}</ClmButton>
          )}
        </div>
      </header>
      <main className="Clm-platform-main">
        <p className="Clm-platform-kicker">{t('platformKicker')}</p>
        <h1 className="Clm-page-title">{t('platformHero')}</h1>
        <p className="Clm-page-sub">{t('platformSub')}</p>
        <div className="Clm-product-grid">
          {PLATFORM_PRODUCTS.map((product) => (
            <PlatformProductCard key={product.id} product={product} onOpen={navigate} />
          ))}
        </div>
        <p className="Clm-platform-trust">{t('platformTrust')}</p>
      </main>
    </div>
  );
}
