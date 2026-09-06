import { Box, Flex, Typography } from '@forgedevstack/bear';
import { COLOR_BLUE, COLOR_WHITE, FLEX_GAP_SM } from '@const';
import { LogoMarkSvg } from './helpers/LogoMarkSvg';
import type { LogoProps } from './Logo.types';

export function Logo({ compact = false }: LogoProps) {
  return (
    <Flex className="Bear-Logo" align="center" gap={FLEX_GAP_SM} aria-label="Car Life Manager">
      <Box
        className="Bear-Logo__mark bear-w-8 bear-h-8 bear-grid bear-place-items-center"
        rounded="md"
        bg={COLOR_BLUE}
        aria-hidden="true"
      >
        <LogoMarkSvg />
      </Box>
      {!compact && (
        <Typography weight="extrabold" color={COLOR_WHITE}>
          Car Life Manager
        </Typography>
      )}
    </Flex>
  );
}
