import { Box, Flex, Typography } from '@forgedevstack/bear';
import { COLOR_BLUE, COLOR_WHITE, LOGO_MARK_SIZE } from '@const';
import { LogoMarkSvg } from './helpers/LogoMarkSvg';
import type { LogoProps } from './Logo.types';

export function Logo({ compact = false }: LogoProps) {
  return (
    <Flex className="Bear-Logo" align="center" gap={2} aria-label="Car Life Manager">
      <Box
        className="Bear-Logo__mark"
        rounded="md"
        style={{
          width: LOGO_MARK_SIZE,
          height: LOGO_MARK_SIZE,
          background: COLOR_BLUE,
          display: 'grid',
          placeItems: 'center',
        }}
        aria-hidden="true"
      >
        <LogoMarkSvg />
      </Box>
      {compact ? null : (
        <Typography weight="extrabold" style={{ color: COLOR_WHITE }}>
          Car Life Manager
        </Typography>
      )}
    </Flex>
  );
}
