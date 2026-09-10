import { Button } from '@forgedevstack/bear';
import { resolveBearId, useBearId } from '@hooks';
import type { LandingProductOpenButtonProps } from '../Landing.types';

export function LandingProductOpenButton(props: LandingProductOpenButtonProps) {
  const { id, testId, label, to, onOpen } = props;
  const generatedId = useBearId('LandingProductOpenButton');
  const domId = resolveBearId(id, generatedId);

  return (
    <Button id={domId} data-testid={testId} variant="primary" onClick={() => onOpen(to)}>
      {label}
    </Button>
  );
}
