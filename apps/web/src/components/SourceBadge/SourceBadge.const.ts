import {
  SOURCE_CALCULATED,
  SOURCE_DOCUMENT,
  SOURCE_OFFICIAL,
  SOURCE_PROVIDER,
  SOURCE_UNKNOWN,
  SOURCE_USER,
} from '@const';

export const SOURCE_LABEL_KEYS: Record<string, string> = {
  [SOURCE_OFFICIAL]: 'sourceOfficial',
  [SOURCE_USER]: 'sourceUser',
  [SOURCE_DOCUMENT]: 'sourceDocument',
  [SOURCE_CALCULATED]: 'sourceCalculated',
  [SOURCE_PROVIDER]: 'sourceProvider',
  [SOURCE_UNKNOWN]: 'sourceUnknown',
};
