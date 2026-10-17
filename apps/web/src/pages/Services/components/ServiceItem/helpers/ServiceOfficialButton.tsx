import { Button } from '@forgedevstack/bear';

export function ServiceOfficialButton(props: { href?: string | null; label: string; onOpen: () => void }) {
  const { href, label, onOpen } = props;
  if (!href) return null;
  return (
    <Button variant="ghost" compact onClick={onOpen}>
      {label}
    </Button>
  );
}
