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
import {
  CATEGORY_INSURANCE,
  CATEGORY_PARKING,
  CATEGORY_TOLL,
  KEY_CONNECT,
  KEY_INSURANCE,
  KEY_NO_SERVICES,
  KEY_NO_SERVICES_BODY,
  KEY_OFFICIAL_AUTHORITIES,
  KEY_OFFICIAL_SITE,
  KEY_PAGE_SUB_SERVICES,
  KEY_SERVICES,
  KEY_TOLL_AND_PARKING,
  TONE_BAD,
} from './Services.const';
import { serviceTone, serviceToneLabelKey } from './Services.utils';

function openOfficialPortal(url: string | null): void {
  if (!url) {
    return;
  }
  window.open(url, WINDOW_BLANK, WINDOW_NOREFERRER);
}

export function Services() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const services = dashboard?.services ?? [];

  if (services.length === ZERO) {
    return (
      <div className="Bear-Services">
        <ClmPageHead title={t(KEY_SERVICES)} subtitle={t(KEY_PAGE_SUB_SERVICES)} />
        <ClmEmpty iconSrc={SVG_STATUS_ALERT} title={t(KEY_NO_SERVICES)} body={t(KEY_NO_SERVICES_BODY)} />
      </div>
    );
  }

  const official = services.filter((service) => service.status === PROVIDER_STATUS_OFFICIAL);
  const roads = services.filter((service) => service.category === CATEGORY_TOLL || service.category === CATEGORY_PARKING);
  const insurance = services.filter((service) => service.category === CATEGORY_INSURANCE);

  return (
    <div className="Bear-Services">
      <ClmPageHead title={t(KEY_SERVICES)} subtitle={t(KEY_PAGE_SUB_SERVICES)} />
      <ClmSectionTitle title={t(KEY_OFFICIAL_AUTHORITIES)} />
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
      <ClmSectionTitle title={t(KEY_TOLL_AND_PARKING)} />
      <div className="Clm-grid">
        {roads.map((service) => {
          const item = translatedService(service, t);
          const tone = serviceTone(service.status, service.category);
          const isBadTone = tone === TONE_BAD;
          const noteClass = isBadTone ? 'Clm-card-note Clm-card-note--bad' : 'Clm-card-note';

          return (
            <article key={service.providerId} className="Clm-card">
              <div className="Clm-card-head">
                <span className="Clm-card-title">{item.name}</span>
                <ClmStatusPill tone={tone} label={t(serviceToneLabelKey(service.status, service.category))} />
              </div>
              <div className={noteClass}>
                {item.note}
                {service.officialUrl ? (
                  <>
                    {' · '}
                    <OfficialLink href={service.officialUrl} label={t(KEY_OFFICIAL_SITE)} />
                  </>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
      <ClmSectionTitle title={t(KEY_INSURANCE)} />
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
                      <OfficialLink href={service.officialUrl} label={t(KEY_OFFICIAL_SITE)} />
                    </>
                  ) : null}
                </>
              )}
              action={<ClmButton onClick={() => openOfficialPortal(service.officialUrl)}>{t(KEY_CONNECT)}</ClmButton>}
            />
          );
        })}
      </ClmList>
    </div>
  );
}
