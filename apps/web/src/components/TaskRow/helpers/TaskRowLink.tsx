import { OfficialLink } from '@components/OfficialLink';
import type { TaskRowLinkProps } from '../TaskRow.types';

export function TaskRowLink(props: TaskRowLinkProps) {
  const { href, label } = props;
  if (!href) return null;
  return <OfficialLink href={href} label={label} />;
}
