import { Card } from '@forgedevstack/bear';
import { CARD_RADIUS_XL } from '@const';
import { EmptyState } from '@components/EmptyState';

export function VehicleFileEmpty(props: { title: string; body: string }) {
  const { title, body } = props;
  return (
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <EmptyState title={title} body={body} />
    </Card>
  );
}
