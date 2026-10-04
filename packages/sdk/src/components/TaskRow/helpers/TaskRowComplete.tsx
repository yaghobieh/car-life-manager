import { Button } from '@forgedevstack/bear';
import type { TaskRowCompleteProps } from '../TaskRow.types';

export function TaskRowComplete(props: TaskRowCompleteProps) {
  const { done, busy, label, loadingText, onComplete } = props;
  if (done) return null;
  return (
    <Button variant="secondary" compact loading={busy} loadingText={loadingText} onClick={onComplete}>
      {label}
    </Button>
  );
}
