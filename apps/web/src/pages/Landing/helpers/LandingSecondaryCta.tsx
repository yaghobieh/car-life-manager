import { Button } from '@forgedevstack/bear';

export function LandingSecondaryCta(props: { hidden: boolean; label: string; onClick: () => void }) {
  const { hidden, label, onClick } = props;
  if (hidden) return null;
  return (
    <Button variant="ghost" onClick={onClick}>
      {label}
    </Button>
  );
}
