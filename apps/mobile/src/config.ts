/**
 * Tavo Mobile Configuration
 */

export const config = {
  projectName: 'Tavo',
  appName: 'Tavo Mobile',
  developerMode: true,
  enableMockMode: true,
  apiBase: process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:4173',
  defaultLanguage: 'he',
  isRtl: true,
};

export default config;
