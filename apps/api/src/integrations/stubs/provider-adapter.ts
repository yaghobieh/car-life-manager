import { getProviderAdapter, PROVIDER_CELLO, PROVIDER_HIGHWAY_6, PROVIDER_PANGO } from "../providers";

export { unsupportedAdapter } from "../providers";

export const pangoAdapter = getProviderAdapter(PROVIDER_PANGO);
export const celloAdapter = getProviderAdapter(PROVIDER_CELLO);
export const highway6Adapter = getProviderAdapter(PROVIDER_HIGHWAY_6);
