import { Badge, Flex, Typography } from '@forgedevstack/bear';
import { COLOR_MUTED, FLEX_GAP_MD, FLEX_GAP_SM } from '@const';
import { ProviderMark } from '@components/ProviderMark';
import { SourceBadge } from '@components/SourceBadge';
import { resolveBearId, useBearId } from '@hooks';
import type { ServiceItemProps } from '../../Services.types';
import { ServiceConfirmBlock } from './helpers/ServiceConfirmBlock';
import { ServiceOfficialButton } from './helpers/ServiceOfficialButton';
import { ServiceReceiptButton } from './helpers/ServiceReceiptButton';

export function ServiceItem(props: ServiceItemProps) {
  const { service, name, note, statusLabel, statusVariant, isOfficial, officialSiteLabel, logReceiptLabel, onOfficialSite, onLogReceipt } = props;
  const generatedId = useBearId('ServiceItem');
  const domId = resolveBearId(undefined, generatedId);

  return (
    <Flex id={domId} className="Bear-ServiceItem" direction="column" gap={FLEX_GAP_SM}>
      <Flex justify="between" align="center" wrap="wrap" gap={FLEX_GAP_SM}>
        <Flex align="center" gap={FLEX_GAP_SM}>
          <ProviderMark providerId={service.providerId} name={name} />
          <Flex direction="column" gap={FLEX_GAP_MD}>
            <Typography weight="bold">{name}</Typography>
            <Typography color={COLOR_MUTED}>{note}</Typography>
            <SourceBadge source={service.source} updatedAt={service.confirmedByUserAt} />
          </Flex>
        </Flex>
        <Flex align="center" gap={FLEX_GAP_SM} wrap="wrap">
          <Badge variant={statusVariant} pill>
            {statusLabel}
          </Badge>
          <ServiceOfficialButton href={service.officialUrl} label={officialSiteLabel} onOpen={onOfficialSite} />
          <ServiceReceiptButton hidden={isOfficial} label={logReceiptLabel} onClick={onLogReceipt} />
        </Flex>
      </Flex>
      <ServiceConfirmBlock {...props} />
    </Flex>
  );
}
