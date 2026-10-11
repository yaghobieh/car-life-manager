import React from 'react';
import { Box } from '@forgedevstack/bear';
import { renderArtSvg } from '@pages/Landing/Landing.art';
import { GALLERY_MAIN_INDEX, GALLERY_THUMB_INDICES } from '../../LandingItemDetail.const';
import type { LandingItemDetailGalleryProps } from '../../LandingItemDetail.types';

export function LandingItemDetailGallery(props: LandingItemDetailGalleryProps) {
  const {
    item,
    selectedGalleryThumb,
    setSelectedGalleryThumb,
    itemTitle,
  } = props;

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
      <Box
        className="art"
        dangerouslySetInnerHTML={{ __html: renderArtSvg(item, selectedGalleryThumb) }}
      />
    );
  };

  return (
    <Box className="gallery">
      <Box className="gallery__main">
        {renderMainMedia()}
      </Box>
      <Box className="thumbs">
        {GALLERY_THUMB_INDICES.map((i: number) => (
          <Box
            as="button"
            key={i}
            type="button"
            className={selectedGalleryThumb === i ? 'is-active' : ''}
            onClick={() => setSelectedGalleryThumb(i)}
            aria-label={`Image ${i + 1}`}
          >
            {i === GALLERY_MAIN_INDEX && item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={`${itemTitle} ${i + 1}`}
                className="art card__img"
              />
            ) : (
              <Box
                className="art"
                dangerouslySetInnerHTML={{ __html: renderArtSvg(item, i) }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
