import type { PlatformProductActionProps } from '../Platform.types';
import { PlatformProductDisabledNote } from './PlatformProductDisabledNote';
import { PlatformProductOpenButton } from './PlatformProductOpenButton';

export function PlatformProductAction(props: PlatformProductActionProps) {
  const { enabled, label, note, to, onOpen } = props;
  if (!enabled) {
    return <PlatformProductDisabledNote label={label} note={note} />;
  }
  return <PlatformProductOpenButton label={label} to={to} onOpen={onOpen} />;
}
