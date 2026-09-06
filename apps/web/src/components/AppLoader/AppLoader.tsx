import { Box, Flex, Typography } from '@forgedevstack/bear';
import { COLOR_INK, COLOR_MUTED_2, COLOR_WHITE, FLEX_GAP_MD, LOADER_Z } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import { LoaderCarSvg } from './helpers/LoaderCarSvg';
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
        <Box className="Bear-AppLoader__road" style={{ width: 280, height: 64, position: 'relative', overflow: 'hidden' }}>
          <Box
            className="Bear-AppLoader__lane"
            style={{
              position: 'absolute',
              top: '50%',
              insetInline: 0,
              height: 6,
              borderRadius: 3,
              backgroundImage: `repeating-linear-gradient(to left, ${COLOR_MUTED_2} 0 22px, transparent 22px 40px)`,
              opacity: 0.5,
              transform: 'translateY(-50%)',
            }}
          />
          <Box className="Bear-AppLoader__car" style={{ position: 'absolute', top: 18 }}>
            <LoaderCarSvg />
          </Box>
        </Box>
        <Typography color={COLOR_WHITE}>{label}</Typography>
      </Flex>
    </Box>
  );
}
