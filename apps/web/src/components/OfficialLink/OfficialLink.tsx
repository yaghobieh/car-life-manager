import { Button } from '@forgedevstack/bear';
import { WINDOW_BLANK, WINDOW_NOREFERRER } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { OfficialLinkProps } from './OfficialLink.types';

export function OfficialLink(props: OfficialLinkProps) {
  const { href, label, id, testId } = props;
  const generatedId = useBearId('OfficialLink');
  const domId = resolveBearId(id, generatedId);

  return (
    <Button
      id={domId}
      data-testid={testId}
      className="Bear-OfficialLink"
      variant="ghost"
      compact
      onClick={() => window.open(href, WINDOW_BLANK, WINDOW_NOREFERRER)}
    >
      {label}
    </Button>
  );
}
