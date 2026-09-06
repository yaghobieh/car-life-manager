import { RECALL_TASK_SOURCE_PREFIX, type ServiceProviderInfo, type Task } from '@clm/shared';
import {
  BADGE_SUCCESS,
  BADGE_WARNING,
  PROVIDER_STATUS_CONNECTED,
  PROVIDER_STATUS_OFFICIAL,
} from '@const';

const HYPHEN = '-';
const UNDERSCORE = '_';

export function providerLocaleKey(prefix: string, providerId: string): string {
  return `${prefix}_${providerId.split(HYPHEN).join(UNDERSCORE)}`;
}

export function providerDisplayName(
  providerId: string,
  fallback: string,
  t: (key: string) => string,
): string {
  const key = providerLocaleKey('provider', providerId);
  const label = t(key);
  return label === key ? fallback : label;
}

export function providerDisplayNote(
  providerId: string,
  fallback: string,
  t: (key: string) => string,
): string {
  const key = providerLocaleKey('providerNote', providerId);
  const label = t(key);
  return label === key ? fallback : label;
}

export function taskDisplayTitle(task: Task, t: (key: string) => string): string {
  if (task.category === 'recall') {
    const recallId = task.source.startsWith(RECALL_TASK_SOURCE_PREFIX)
      ? task.source.slice(RECALL_TASK_SOURCE_PREFIX.length)
      : task.title;
    return `${t('taskTitle_recall')} ${recallId}`;
  }
  const key = `taskTitle_${task.category}`;
  const label = t(key);
  return label === key ? task.title : label;
}

export function statusKindLabel(kind: string, t: (key: string) => string): string {
  const key = `status_${kind}`;
  const label = t(key);
  return label === key ? kind : label;
}

export function serviceStatusKey(status: string): string {
  if (status === PROVIDER_STATUS_OFFICIAL) return 'officialPublic';
  if (status === PROVIDER_STATUS_CONNECTED) return 'connected';
  return 'notSupported';
}

export function serviceBadgeVariant(status: string): typeof BADGE_SUCCESS | typeof BADGE_WARNING {
  if (status === PROVIDER_STATUS_OFFICIAL || status === PROVIDER_STATUS_CONNECTED) {
    return BADGE_SUCCESS;
  }
  return BADGE_WARNING;
}

export function translatedService(
  service: ServiceProviderInfo,
  t: (key: string) => string,
): ServiceProviderInfo {
  return {
    ...service,
    name: providerDisplayName(service.providerId, service.name, t),
    note: providerDisplayNote(service.providerId, service.note, t),
  };
}
