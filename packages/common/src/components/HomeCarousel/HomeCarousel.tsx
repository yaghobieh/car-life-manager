import { HomeCard } from '@components/HomeCard';
import type { HomeCarouselProps } from './HomeCarousel.types';

export function HomeCarousel(props: HomeCarouselProps) {
  const { homes, onOpen } = props;

  return (
    <div className="Clm-carousel Bear-HomeCarousel">
      {homes.map((home) => (
        <HomeCard key={home.id} home={home} onOpen={onOpen} />
      ))}
    </div>
  );
}
