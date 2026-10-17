import type { LandingProductActionProps } from '../Landing.types';
import { LandingProductDisabledNote } from './LandingProductDisabledNote';
import { LandingProductOpenButton } from './LandingProductOpenButton';

export function LandingProductAction(props: LandingProductActionProps) {
  const { enabled, label, note, to, onOpen } = props;
  if (!enabled) {
    return <LandingProductDisabledNote label={label} note={note} />;
  }
  return <LandingProductOpenButton label={label} to={to} onOpen={onOpen} />;
}
