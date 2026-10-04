export interface AppConfig {
  projectName: string;
  developerMode: boolean;
  enableMockMode: boolean;
  apiBaseUrl: string;
}

export const appConfig: AppConfig = {
  projectName: 'Tavo',
  developerMode: import.meta.env.DEV || import.meta.env.VITE_DEV_MODE === 'true',
  enableMockMode: import.meta.env.VITE_MOCK_MODE !== 'false',
  apiBaseUrl: import.meta.env.VITE_API_URL || '',
};

export const IS_DEV_MODE = appConfig.developerMode;
export const IS_MOCK_ENABLED = appConfig.enableMockMode;
