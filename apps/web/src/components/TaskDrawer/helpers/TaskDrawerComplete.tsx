import { Button } from '@forgedevstack/bear';
import type { TaskDrawerCompleteProps } from '../TaskDrawer.types';

export function TaskDrawerComplete(props: TaskDrawerCompleteProps) {
  const { done, busy, label, loadingText, onComplete } = props;
  if (done) return null;
  return (
    <Button variant="primary" loading={busy} loadingText={loadingText} onClick={onComplete}>
      {label}
    </Button>
  );
}
