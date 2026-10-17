import { Box, Flex, Typography } from '@forgedevstack/bear';
import { COLOR_BG } from '@const';
import type { LandingLoadingProps } from '../Landing.types';

export function LandingLoading(props: LandingLoadingProps) {
  const { label } = props;
  return (
    <Box bg={COLOR_BG} className="Bear-Landing bear-min-h-screen">
      <Flex className="bear-min-h-screen" align="center" justify="center">
        <Typography>{label}</Typography>
      </Flex>
    </Box>
  );
}
