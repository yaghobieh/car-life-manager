import { Button } from '@forgedevstack/bear';

export function ServiceReceiptButton(props: { hidden: boolean; label: string; onClick: () => void }) {
  const { hidden, label, onClick } = props;
  if (hidden) return null;
  return (
    <Button variant="secondary" compact onClick={onClick}>
      {label}
    </Button>
  );
}
