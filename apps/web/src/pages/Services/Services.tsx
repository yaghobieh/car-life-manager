import { useTranslate } from '@forgedevstack/lingo/react';
import {
  PROVIDER_STATUS_OFFICIAL,
  SVG_STATUS_ALERT,
  WINDOW_BLANK,
  WINDOW_NOREFERRER,
  ZERO,
} from '@const';
import { ClmButton, ClmEmpty, ClmList, ClmPageHead, ClmRow, ClmSectionTitle, ClmStatusPill } from '@common';
import { OfficialLink } from '@components/OfficialLink';
import { useAppState } from '@hooks';
import { translatedService } from '@locales';
import { serviceTone, serviceToneLabelKey } from './Services.utils';

export function Services() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const services = dashboard?.services ?? [];
  const official = services.filter((service) => service.status === PROVIDER_STATUS_OFFICIAL);
  const roads = services.filter((service) => service.category === 'toll' || service.category === 'parking');
  const insurance = services.filter((service) => service.category === 'insurance');

  function openOfficial(url: string | null) {
    if (!url) return;
    window.open(url, WINDOW_BLANK, WINDOW_NOREFERRER);
  }

  if (services.length === ZERO) {
    return (
      <div className="Bear-Services">
        <ClmPageHead title={t('services')} subtitle={t('pageSubServices')} />
        <ClmEmpty iconSrc={SVG_STATUS_ALERT} title={t('noServices')} body={t('noServicesBody')} />
      </div>
    );
  }

  return (
    <div className="Bear-Services">
      <ClmPageHead title={t('services')} subtitle={t('pageSubServices')} />
      <ClmSectionTitle title={t('officialAuthorities')} />
      <div className="Clm-grid">
        {official.map((service) => {
          const item = translatedService(service, t);
          return (
            <article key={`pill-${service.providerId}`} className="Clm-card">
              <div className="Clm-card-head">
                <span className="Clm-card-title">{item.name}</span>
                <ClmStatusPill tone={serviceTone(service.status, service.category)} label={t(serviceToneLabelKey(service.status, service.category))} />
              </div>
              <div className="Clm-card-note">{item.note}</div>
            </article>
          );
        })}
      </div>
      <ClmSectionTitle title={t('tollAndParking')} />
      <div className="Clm-grid">
        {roads.map((service) => {
          const item = translatedService(service, t);
          const tone = serviceTone(service.status, service.category);
          return (
            <article key={service.providerId} className="Clm-card">
              <div className="Clm-card-head">
                <span className="Clm-card-title">{item.name}</span>
                <ClmStatusPill tone={tone} label={t(serviceToneLabelKey(service.status, service.category))} />
              </div>
              <div className={tone === 'bad' ? 'Clm-card-note Clm-card-note--bad' : 'Clm-card-note'}>{item.note}</div>
            </article>
          );
        })}
      </div>
      <ClmSectionTitle title={t('insurance')} />
      <ClmList>
        {insurance.map((service) => {
          const item = translatedService(service, t);
          return (
            <ClmRow
              key={service.providerId}
              iconSrc={SVG_STATUS_ALERT}
              title={item.name}
              subtitle={(
                <>
                  {item.note}
                  {service.officialUrl ? (
                    <>
                      {' · '}
                      <OfficialLink href={service.officialUrl} label={t('officialSite')} />
                    </>
                  ) : null}
                </>
              )}
              action={<ClmButton onClick={() => openOfficial(service.officialUrl)}>{t('connect')}</ClmButton>}
            />
          );
        })}
      </ClmList>
    </div>
  );
}
