import type { ServiceAnswer, ServiceProviderInfo } from '@clm/shared';
import type { serviceBadgeVariant } from '@locales';

export type ServicesPageProps = Record<string, never>;

export interface ServiceItemProps {
  service: ServiceProviderInfo;
  name: string;
  note: string;
  statusLabel: string;
  statusVariant: ReturnType<typeof serviceBadgeVariant>;
  busy: boolean;
  isOfficial: boolean;
  confirmed: boolean;
  officialSiteLabel: string;
  logReceiptLabel: string;
  confirmedHelp: string;
  notVerifiedHelp: string;
  confirmLabel: string;
  checkLaterLabel: string;
  savingLabel: string;
  answers: Array<{ value: ServiceAnswer; label: string }>;
  onConfirm: (answer: ServiceAnswer) => void;
  onOfficialSite: () => void;
  onLogReceipt: () => void;
}
