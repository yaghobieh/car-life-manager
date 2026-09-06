import { Badge, Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { CARD_RADIUS_XL, COLOR_MUTED, FLEX_GAP_SM } from '@const';
import { EmptyState } from '@components/EmptyState';
import { ProviderMark } from '@components/ProviderMark';
import { useAppState } from '@hooks';

export function Services() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  return (
    <Card className="Bear-Services" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <EmptyState title={t('noServices')} body={t('noServicesBody')} />
      {(dashboard?.services ?? []).map((service) => (
        <Flex key={service.providerId} justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
          <Flex align="center" gap={FLEX_GAP_SM}>
            <ProviderMark providerId={service.providerId} name={service.name} />
            <div>
              <Typography weight="bold">{service.name}</Typography>
              <Typography color={COLOR_MUTED}>{service.note}</Typography>
              {service.officialUrl && (
                <a href={service.officialUrl} target="_blank" rel="noreferrer">{t('officialSite')}</a>
              )}
            </div>
          </Flex>
          <Badge variant="warning" pill>{t('notSupported')}</Badge>
        </Flex>
      ))}
    </Card>
  );
}
