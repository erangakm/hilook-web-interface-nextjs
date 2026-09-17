'use client';

import type { MutableRefObject } from 'react';

const CAMERA_NAMES: Record<number, string> = {
  1: 'Driveway',
  2: 'Front',
  3: 'Side 180',
  4: 'Behind garage',
  5: 'Backyard',
};

export function CameraTile({
  id,
  fullscreenId,
  imgRefs,
  toggle,
  coverCameras,
  className,
}: {
  id: number;
  fullscreenId: number | null;
  imgRefs: MutableRefObject<Record<number, HTMLImageElement | null>>;
  toggle: (id: number) => void;
  coverCameras?: boolean;
  className?: string;
}) {
  const isFullscreen = fullscreenId === id;
  const isHidden = fullscreenId !== null && !isFullscreen;

  return (
    <div
      className={['cam', className, isFullscreen && 'fullscreen', isHidden && 'hidden'].filter(Boolean).join(' ')}
      onDoubleClick={() => toggle(id)}
    >
      <div className="label">{CAMERA_NAMES[id] ?? `CAM ${id}`}</div>
      {coverCameras ? (
        <div className="cam-covered">
          <span className="cam-covered-icon" aria-hidden="true">
            &#128683;
          </span>
          <span>Camera privacy mode on</span>
        </div>
      ) : (
        <img
          ref={(el) => {
            imgRefs.current[id] = el;
          }}
          src={isFullscreen ? `/api/stream/${id}` : `/api/snapshot/${id}`}
          alt={`Camera ${id}`}
        />
      )}
    </div>
  );
}
