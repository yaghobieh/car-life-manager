import { Badge, Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import {
  CARD_RADIUS_XL,
  COLOR_MUTED,
  EXPENSE_CATEGORY_INSURANCE,
  EXPENSE_CATEGORY_PARKING,
  EXPENSE_CATEGORY_TOLLS,
  FLEX_GAP_LG,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  PROVIDER_STATUS_OFFICIAL,
  QUERY_CATEGORY,
  ROUTE_EXPENSES,
  ZERO,
} from '@const';
import { EmptyState } from '@components/EmptyState';
import { ProviderMark } from '@components/ProviderMark';
import { useAppState } from '@hooks';
import { serviceBadgeVariant, serviceStatusKey, translatedService } from '@locales';

function receiptCategory(category: string): string {
  if (category === 'toll') return EXPENSE_CATEGORY_TOLLS;
  if (category === 'insurance') return EXPENSE_CATEGORY_INSURANCE;
  return EXPENSE_CATEGORY_PARKING;
}

export function Services() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const navigate = useNavigate();
  const services = dashboard?.services ?? [];
  const official = services.filter((service) => service.status === PROVIDER_STATUS_OFFICIAL);
  const others = services.filter((service) => service.status !== PROVIDER_STATUS_OFFICIAL);

  if (services.length === ZERO) {
    return (
      <Card className="Bear-Services" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <EmptyState title={t('noServices')} body={t('noServicesBody')} />
      </Card>
    );
  }

  return (
    <Card className="Bear-Services" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Typography color={COLOR_MUTED}>{t('servicesHubHelp')}</Typography>
        {[...official, ...others].map((service) => {
          const item = translatedService(service, t);
          const isOfficial = service.status === PROVIDER_STATUS_OFFICIAL;
          return (
            <Flex key={service.providerId} justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
              <Flex align="center" gap={FLEX_GAP_SM}>
                <ProviderMark providerId={service.providerId} name={item.name} />
                <Flex direction="column" gap={FLEX_GAP_MD}>
                  <Typography weight="bold">{item.name}</Typography>
                  <Typography color={COLOR_MUTED}>{item.note}</Typography>
                </Flex>
              </Flex>
              <Flex align="center" gap={FLEX_GAP_SM} wrap="wrap">
                <Badge variant={serviceBadgeVariant(service.status)} pill>
                  {t(serviceStatusKey(service.status))}
                </Badge>
                {service.officialUrl && (
                  <Button
                    variant="ghost"
                    compact
                    onClick={() => window.open(service.officialUrl ?? '', '_blank', 'noreferrer')}
                  >
                    {t('officialSite')}
                  </Button>
                )}
                {!isOfficial && (
                  <Button
                    variant="secondary"
                    compact
                    onClick={() => navigate(`${ROUTE_EXPENSES}?${QUERY_CATEGORY}=${receiptCategory(service.category)}`)}
                  >
                    {t('logReceipt')}
                  </Button>
                )}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Card>
  );
}
