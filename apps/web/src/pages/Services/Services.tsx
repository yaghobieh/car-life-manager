import { useState } from 'react';
import { Badge, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import type { ServiceAnswer } from '@clm/shared';
import { api } from '@api';
import {
  CARD_RADIUS_XL,
  COLOR_MUTED,
  EMPTY_STRING,
  FLEX_GAP_LG,
  PROVIDER_STATUS_OFFICIAL,
  PROVIDER_STATUS_USER_CONFIRMED,
  QUERY_CATEGORY,
  ROUTE_EXPENSES,
  WINDOW_BLANK,
  WINDOW_NOREFERRER,
  ZERO,
} from '@const';
import { EmptyState } from '@components/EmptyState';
import { PageHeader } from '@components/PageHeader';
import { useAppState } from '@hooks';
import { serviceBadgeVariant, serviceStatusKey, translatedService } from '@locales';
import { ServiceItem } from './components/ServiceItem';
import { connectedServiceCount, receiptCategory, SERVICE_ANSWERS } from './Services.utils';

export function Services() {
  const { dashboard, currentId, refresh } = useAppState();
  const t = useTranslate();
  const navigate = useNavigate();
  const [busyId, setBusyId] = useState(EMPTY_STRING);
  const services = dashboard?.services ?? [];
  const official = services.filter((service) => service.status === PROVIDER_STATUS_OFFICIAL);
  const others = services.filter((service) => service.status !== PROVIDER_STATUS_OFFICIAL);

  async function confirm(providerId: string, answer: ServiceAnswer) {
    if (!currentId) return;
    setBusyId(providerId);
    try {
      await api.confirmService(currentId, providerId, answer);
      await refresh();
    } finally {
      setBusyId(EMPTY_STRING);
    }
  }

  if (services.length === ZERO) {
    return (
      <Card className="Bear-Services" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <EmptyState title={t('noServices')} body={t('noServicesBody')} />
      </Card>
    );
  }

  return (
    <Flex className="Bear-Services" direction="column" gap={FLEX_GAP_LG}>
      <PageHeader title={t('services')} subtitle={t('pageSubServices')} />
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Flex justify="between" align="center" wrap="wrap" gap={FLEX_GAP_LG}>
          <Typography color={COLOR_MUTED}>{t('connectedNone')}</Typography>
          <Badge variant="neutral" pill>
            {connectedServiceCount(services)} {t('connections')}
          </Badge>
        </Flex>
        <Typography color={COLOR_MUTED}>{t('servicesHubHelp')}</Typography>
        {[...official, ...others].map((service) => {
          const item = translatedService(service, t);
          return (
            <ServiceItem
              key={service.providerId}
              service={service}
              name={item.name}
              note={item.note}
              statusLabel={t(serviceStatusKey(service.status))}
              statusVariant={serviceBadgeVariant(service.status)}
              busy={busyId === service.providerId}
              isOfficial={service.status === PROVIDER_STATUS_OFFICIAL}
              confirmed={service.status === PROVIDER_STATUS_USER_CONFIRMED}
              officialSiteLabel={t('officialSite')}
              logReceiptLabel={t('logReceipt')}
              confirmedHelp={t('userConfirmedHelp')}
              notVerifiedHelp={t('notVerifiedAuto')}
              confirmLabel={t('confirmService')}
              checkLaterLabel={t('checkLater')}
              savingLabel={t('saving')}
              answers={SERVICE_ANSWERS.map((answer) => ({ value: answer.value, label: t(answer.labelKey) }))}
              onConfirm={(answer) => void confirm(service.providerId, answer)}
              onOfficialSite={() => window.open(service.officialUrl ?? EMPTY_STRING, WINDOW_BLANK, WINDOW_NOREFERRER)}
              onLogReceipt={() => navigate(`${ROUTE_EXPENSES}?${QUERY_CATEGORY}=${receiptCategory(service.category)}`)}
            />
          );
        })}
      </Flex>
    </Card>
    </Flex>
  );
}
