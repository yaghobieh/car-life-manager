import { OfficialLink } from '@components/OfficialLink';
import type { TaskDrawerLinkProps } from '../TaskDrawer.types';

export function TaskDrawerLink(props: TaskDrawerLinkProps) {
  const { href, label } = props;
  if (!href) return null;
  return <OfficialLink href={href} label={label} />;
}
