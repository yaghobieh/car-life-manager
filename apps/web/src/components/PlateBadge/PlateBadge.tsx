import { Box, Typography } from '@forgedevstack/bear';
import { COLOR_PLATE, COLOR_PLATE_INK, FONT_FAMILY_MONO } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { PlateBadgeProps } from './PlateBadge.types';

export function PlateBadge(props: PlateBadgeProps) {
  const { plate, id, testId } = props;
  const generatedId = useBearId('PlateBadge');
  const domId = resolveBearId(id, generatedId);

  return (
    <Box
      id={domId}
      data-testid={testId}
      className="Bear-PlateBadge"
      bg={COLOR_PLATE}
      px={2}
      py={1}
      rounded="sm"
    >
      <Typography color={COLOR_PLATE_INK} weight="bold" style={{ fontFamily: FONT_FAMILY_MONO, letterSpacing: '0.08em' }}>
        {plate}
      </Typography>
    </Box>
  );
}
