import { Typography } from '@forgedevstack/bear';
import { COLOR_DANGER, COLOR_GREEN, EMPTY_STRING } from '@const';
import type { SettingsStatusProps } from '../Settings.types';

export function SettingsStatus(props: SettingsStatusProps) {
  const { errorKey, saved, errorText, savedText } = props;
  const hasError = errorKey !== EMPTY_STRING;
  if (!hasError && !saved) return null;
  const color = hasError ? COLOR_DANGER : COLOR_GREEN;
  const text = hasError ? errorText : savedText;
  return <Typography color={color} role={hasError ? 'alert' : undefined}>{text}</Typography>;
}
