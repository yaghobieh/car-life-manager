import { PROVIDER_STATUS_CONNECTED } from '@const';

export function connectedServiceCount(services: Array<{ status: string }>): number {
  return services.filter((service) => service.status === PROVIDER_STATUS_CONNECTED).length;
}
