import { WINDOW_BLANK, WINDOW_NOREFERRER } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { OfficialLinkProps } from './OfficialLink.types';

export function OfficialLink(props: OfficialLinkProps) {
  const { href, label, id, testId } = props;
  const generatedId = useBearId('OfficialLink');
  const domId = resolveBearId(id, generatedId);

  return (
    <a
      id={domId}
      data-testid={testId}
      className="Bear-OfficialLink"
      href={href}
      target={WINDOW_BLANK}
      rel={WINDOW_NOREFERRER}
    >
      {label}
    </a>
  );
}
