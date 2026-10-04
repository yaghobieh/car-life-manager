import { Button } from '@forgedevstack/bear';
import { renderArtSvg } from '@pages/Landing/Landing.art';
import { GALLERY_MAIN_INDEX, GALLERY_THUMB_INDICES } from '../../LandingItemDetail.const';
import type { LandingItemDetailGalleryProps } from '../../LandingItemDetail.types';

export function LandingItemDetailGallery({
  item,
  selectedGalleryThumb,
  setSelectedGalleryThumb,
  itemTitle,
}: LandingItemDetailGalleryProps) {
  const renderMainMedia = () => {
    if (selectedGalleryThumb === GALLERY_MAIN_INDEX && item.imageUrl) {
      return (
        <img
          src={item.imageUrl}
          alt={itemTitle}
          className="art card__img"
        />
      );
    }

    return (
      <div
        className="art"
        dangerouslySetInnerHTML={{ __html: renderArtSvg(item, selectedGalleryThumb) }}
      />
    );
  };

  return (
    <div className="gallery">
      <div className="gallery__main">
        {renderMainMedia()}
      </div>
      <div className="thumbs">
        {GALLERY_THUMB_INDICES.map((i: number) => (
          <Button
            key={i}
            variant="ghost"
            className={selectedGalleryThumb === i ? 'is-active' : ''}
            onClick={() => setSelectedGalleryThumb(i)}
            aria-label={`Image ${i + 1}`}
          >
            <div
              className="art"
              dangerouslySetInnerHTML={{ __html: renderArtSvg(item, i) }}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
