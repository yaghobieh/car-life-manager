import { COPY_HOW_1, COPY_HOW_2, COPY_HOW_3 } from './mobile.const';

export type ActiveLandingTab = 'apt' | 'car';

export const LANDING_TAB_APT: ActiveLandingTab = 'apt';
export const LANDING_TAB_CAR: ActiveLandingTab = 'car';

export const STEPS = [COPY_HOW_1, COPY_HOW_2, COPY_HOW_3] as const;
