import { Box, useIsDesktop } from '@forgedevstack/bear';
import {
  CAR_ART_HEIGHT,
  CAR_ART_HEIGHT_MOBILE,
  CAR_ART_PERSPECTIVE,
  CAR_ART_ROTATE_X,
  CAR_ART_ROTATE_Y,
  CAR_ART_VIEW_3D,
  CAR_COLOR_OVERLAY_ALPHA,
  COLOR_CAR_ART_END,
  COLOR_CAR_ART_START,
  SVG_CAR_ART,
  SVG_CAR_ART_HEIGHT,
  SVG_CAR_ART_WIDTH,
} from '@const';
import { SvgAsset } from '@components/SvgAsset';
import type { CarArtProps } from './CarArt.types';
import { vehicleImageSrc, vehiclePaintHex } from './CarArt.utils';

export function CarArt(props: CarArtProps) {
  const { make, model, color, view } = props;
  const src = vehicleImageSrc(make);
  const paint = vehiclePaintHex(color);
  const isDesktop = useIsDesktop();
  const is3d = view === CAR_ART_VIEW_3D;

  return (
    <Box
      className="Bear-CarArt"
      rounded="lg"
      aria-hidden="true"
      style={{
        height: isDesktop ? CAR_ART_HEIGHT : CAR_ART_HEIGHT_MOBILE,
        background: `linear-gradient(180deg, ${paint ?? COLOR_CAR_ART_START} 0%, ${COLOR_CAR_ART_END} 100%)`,
        display: 'grid',
        placeItems: 'end center',
        overflow: 'hidden',
        perspective: `${CAR_ART_PERSPECTIVE}px`,
      }}
    >
      <Box
        className="Bear-CarArt__stage"
        style={{
          width: '100%',
          height: '100%',
          transform: is3d
            ? `rotateY(${CAR_ART_ROTATE_Y}deg) rotateX(${CAR_ART_ROTATE_X}deg)`
            : undefined,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {src ? (
          <img
            className="Bear-CarArt__photo bear-w-full bear-h-full"
            src={src}
            alt={model ?? make ?? ''}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <SvgAsset src={SVG_CAR_ART} alt="" width={SVG_CAR_ART_WIDTH} height={SVG_CAR_ART_HEIGHT} />
        )}
        {paint && (
          <Box
            className="Bear-CarArt__paint"
            style={{
              position: 'absolute',
              inset: 0,
              background: paint,
              mixBlendMode: 'multiply',
              opacity: CAR_COLOR_OVERLAY_ALPHA,
              pointerEvents: 'none',
            }}
          />
        )}
      </Box>
    </Box>
  );
}
