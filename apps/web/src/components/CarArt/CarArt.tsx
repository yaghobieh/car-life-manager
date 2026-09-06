import { Box } from '@forgedevstack/bear';
import { CAR_ART_HEIGHT, COLOR_CAR_ART_END, COLOR_CAR_ART_START } from '@const';
import { CarArtSvg } from './helpers/CarArtSvg';

export function CarArt() {
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
      <CarArtSvg />
    </Box>
  );
}
