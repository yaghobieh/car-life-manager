import React, { useRef, useCallback } from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import { Button } from '@forgedevstack/bear';
import { SvgIcon, renderArtSvg } from '@pages/Landing/Landing.art';
import {
  ANGLE_FRONT,
  ANGLE_RIGHT,
  ANGLE_BACK,
  ANGLE_LEFT,
  PERSPECTIVE_PX,
  SCALE_FACTOR,
  ANGLE_QUADRANT_DEG,
  ART_INDEX_MODULO,
  FULL_CIRCLE_DEG,
} from '../../LandingItemDetail.const';
import type { LandingItemDetail360ViewerProps } from '../../LandingItemDetail.types';

export function LandingItemDetail360Viewer({
  item,
  view360Angle,
  setView360Angle,
  autoRotate360,
  toggleAutoRotate360,
  rotate360Left,
  rotate360Right,
}: LandingItemDetail360ViewerProps) {
  const t = useTranslate();
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);

  const normalizedAngle = Math.round(((view360Angle % FULL_CIRCLE_DEG) + FULL_CIRCLE_DEG) % FULL_CIRCLE_DEG);
  const current360ArtIndex = Math.abs(Math.floor(view360Angle / ANGLE_QUADRANT_DEG)) % ART_INDEX_MODULO;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startAngleRef.current = view360Angle;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [view360Angle]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      const newAngle = (startAngleRef.current - deltaX + FULL_CIRCLE_DEG) % FULL_CIRCLE_DEG;
      setView360Angle(newAngle);
    },
    [setView360Angle]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="view-360-container">
      <div className="view-360-header">
        <span className="badge badge--brand">
          <SvgIcon name="view360" /> {t('landing_view360')} — {normalizedAngle}°
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="btn btn--ghost btn--sm"
          onClick={toggleAutoRotate360}
        >
          ↻ {autoRotate360 ? t('landing_stopAutoRotate') : t('landing_autoRotate')}
        </Button>
      </div>

      <div
        className="view-360-canvas-box"
        style={{
          transform: `perspective(${PERSPECTIVE_PX}px) rotateY(${view360Angle}deg) scale(${SCALE_FACTOR})`,
          transition: autoRotate360 ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
          touchAction: 'none',
          cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="view-360-art-wrap"
          dangerouslySetInnerHTML={{
            __html: renderArtSvg(item, current360ArtIndex),
          }}
        />
      </div>

      <div className="view-360-actions">
        <Button variant="ghost" size="sm" className="btn btn--ghost btn--sm" onClick={rotate360Left}>
          {t('landing_rotateLeft')}
        </Button>
        <Button variant="ghost" size="sm" className="btn btn--ghost btn--sm" onClick={() => setView360Angle(ANGLE_FRONT)}>
          {t('landing_angleFront')}
        </Button>
        <Button variant="ghost" size="sm" className="btn btn--ghost btn--sm" onClick={() => setView360Angle(ANGLE_RIGHT)}>
          {t('landing_angleSide')}
        </Button>
        <Button variant="ghost" size="sm" className="btn btn--ghost btn--sm" onClick={() => setView360Angle(ANGLE_BACK)}>
          {t('landing_angleBack')}
        </Button>
        <Button variant="ghost" size="sm" className="btn btn--ghost btn--sm" onClick={() => setView360Angle(ANGLE_LEFT)}>
          {t('landing_angleSide2')}
        </Button>
        <Button variant="ghost" size="sm" className="btn btn--ghost btn--sm" onClick={rotate360Right}>
          {t('landing_rotateRight')}
        </Button>
      </div>
    </div>
  );
}
