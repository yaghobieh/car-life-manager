import { Box } from '@forgedevstack/bear';
import { CAR_ART_HEIGHT, COLOR_CAR_ART_END, COLOR_CAR_ART_START } from '@const';
import { CarArtSvg } from './helpers/CarArtSvg';
import type { CarArtProps } from './CarArt.types';
import { vehicleImageSrc } from './CarArt.utils';

export function CarArt({ make, model }: CarArtProps) {
  const src = vehicleImageSrc(make);

  return (
    <Box
      className="Bear-CarArt"
      rounded="lg"
      aria-hidden="true"
      style={{
        height: CAR_ART_HEIGHT,
        background: `linear-gradient(180deg, ${COLOR_CAR_ART_START} 0%, ${COLOR_CAR_ART_END} 100%)`,
        display: 'grid',
        placeItems: 'end center',
        overflow: 'hidden',
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
        <CarArtSvg />
      )}
    </Box>
  );
}
