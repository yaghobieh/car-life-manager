import React from 'react';
import { renderArtSvg } from '../../../../Landing.art';
import { GALLERY_THUMB_INDICES } from '../../LandingItemDetail.const';
import type { LandingItemDetailGalleryProps } from '../../LandingItemDetail.types';

export function LandingItemDetailGallery({
  item,
  selectedGalleryThumb,
  setSelectedGalleryThumb,
  itemTitle,
}: LandingItemDetailGalleryProps) {
  return (
    <div className="gallery">
      <div className="gallery__main">
        {selectedGalleryThumb === 0 && item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={itemTitle}
            className="art card__img"
          />
        ) : (
          <div
            className="art"
            dangerouslySetInnerHTML={{ __html: renderArtSvg(item, selectedGalleryThumb) }}
          />
        )}
      </div>
      <div className="thumbs">
        {GALLERY_THUMB_INDICES.map((i: number) => (
          <button
            key={i}
            type="button"
            className={selectedGalleryThumb === i ? 'is-active' : ''}
            onClick={() => setSelectedGalleryThumb(i)}
            aria-label={`Image ${i + 1}`}
          >
            <div
              className="art"
              dangerouslySetInnerHTML={{ __html: renderArtSvg(item, i) }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
