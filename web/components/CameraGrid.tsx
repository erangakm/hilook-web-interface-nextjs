'use client';

import { useEffect, useRef, useState } from 'react';

export default function CameraGrid({ cameras }: { cameras: number[] }) {
  const [fullscreenId, setFullscreenId] = useState<number | null>(null);
  const imgRefs = useRef<Record<number, HTMLImageElement | null>>({});

  useEffect(() => {
    if (fullscreenId !== null) return;
    const interval = setInterval(() => {
      cameras.forEach((id) => {
        const img = imgRefs.current[id];
        if (!img) return;
        const next = new Image();
        next.onload = () => {
          img.src = next.src;
        };
        next.src = `/api/snapshot/${id}?t=${Date.now()}`;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [fullscreenId, cameras]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (fullscreenId === null) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') navigate(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') navigate(-1);
      if (e.key === 'Escape') setFullscreenId(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreenId]);

  function navigate(direction: number) {
    if (fullscreenId === null) return;
    const idx = cameras.indexOf(fullscreenId);
    const next = cameras[(idx + direction + cameras.length) % cameras.length];
    setFullscreenId(next);
  }

  function toggle(camId: number) {
    setFullscreenId((current) => (current === null ? camId : null));
  }

  return (
    <div className="grid">
      {cameras.map((id) => {
        const isFullscreen = fullscreenId === id;
        const isHidden = fullscreenId !== null && !isFullscreen;
        return (
          <div
            key={id}
            className={['cam', isFullscreen && 'fullscreen', isHidden && 'hidden'].filter(Boolean).join(' ')}
            onDoubleClick={() => toggle(id)}
          >
            <div className="label">CAM {id}</div>
            <img
              ref={(el) => {
                imgRefs.current[id] = el;
              }}
              src={isFullscreen ? `/api/stream/${id}` : `/api/snapshot/${id}`}
              alt={`Camera ${id}`}
            />
          </div>
        );
      })}
    </div>
  );
}
