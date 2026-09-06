import { Box, Flex, Typography } from '@forgedevstack/bear';
import { COLOR_INK, COLOR_WHITE, FLEX_GAP_MD, LOADER_Z, SVG_LOADER_HEIGHT, SVG_LOADER_SCENE, SVG_LOADER_WIDTH } from '@const';
import { SvgAsset } from '@components/SvgAsset';
import { resolveBearId, useBearId } from '@hooks';
import type { AppLoaderProps } from './AppLoader.types';

export function AppLoader(props: AppLoaderProps) {
  const { label, id, testId } = props;
  const generatedId = useBearId('AppLoader');
  const domId = resolveBearId(id, generatedId);

  return (
    <Box
      id={domId}
      data-testid={testId}
      className="Bear-AppLoader bear-fixed bear-inset-0"
      bg={COLOR_INK}
      style={{ zIndex: LOADER_Z }}
    >
      <Flex className="bear-min-h-screen" align="center" justify="center" direction="column" gap={FLEX_GAP_MD}>
        <SvgAsset src={SVG_LOADER_SCENE} alt={label} width={SVG_LOADER_WIDTH} height={SVG_LOADER_HEIGHT} />
        <Typography color={COLOR_WHITE}>{label}</Typography>
      </Flex>
    </Box>
  );
}
