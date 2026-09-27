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
  className,
}: {
  id: number;
  fullscreenId: number | null;
  imgRefs: MutableRefObject<Record<number, HTMLImageElement | null>>;
  toggle: (id: number) => void;
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
      <img
        ref={(el) => {
          imgRefs.current[id] = el;
        }}
        src={isFullscreen ? `/api/stream/${id}` : `/api/snapshot/${id}`}
        alt={`Camera ${id}`}
      />
      <style jsx>{`
        .cam {
          border: 1px solid #222;
          position: relative;
          background: #111;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease-in-out;
          z-index: 1;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          display: block;
          transition: all 0.3s ease-in-out;
        }

        .label {
          position: absolute;
          top: 5px;
          left: 5px;
          background: rgba(0, 0, 0, 0.8);
          padding: 2px 5px;
          font-size: 12px;
          z-index: 10;
        }

        .fullscreen {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          /* !important beats the sizing class FocusGrid passes in via className */
          width: min(100vw, calc(100vh * 16 / 9)) !important;
          height: min(100vh, calc(100vw * 9 / 16)) !important;
          z-index: 1000;
          background: #000;
          border: none;
          margin: 0;
        }

        .hidden {
          opacity: 0;
          pointer-events: none;
          position: absolute;
          z-index: -1;
        }
      `}</style>
    </div>
  );
}
