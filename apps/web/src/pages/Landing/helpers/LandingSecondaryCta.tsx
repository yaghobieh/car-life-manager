import { Button } from '@forgedevstack/bear';
import type { LandingSecondaryCtaProps } from '../Landing.types';

export function LandingSecondaryCta(props: LandingSecondaryCtaProps) {
  const { hidden, label, onClick } = props;
  if (hidden) return null;
  return (
    <Button variant="ghost" onClick={onClick}>
      {label}
    </Button>
  );
}
