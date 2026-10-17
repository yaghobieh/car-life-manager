import { EmptyState } from '@components/EmptyState';

export function ReminderEmpty(props: { visible: boolean; title: string; body: string }) {
  const { visible, title, body } = props;
  if (!visible) return null;
  return <EmptyState title={title} body={body} />;
}
