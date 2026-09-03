'use client';

import type { CSSProperties } from 'react';
import { useCameraFeed } from '@/hooks/useCameraFeed';
import { CameraTile } from './CameraTile';

export default function CameraGrid({ groups, pollIntervalMs }: { groups: number[][]; pollIntervalMs: number }) {
  const cameras = groups.flat();
  const { fullscreenId, imgRefs, toggle } = useCameraFeed(cameras, pollIntervalMs);
  const maxRowSize = Math.max(...groups.map((group) => group.length));

  return (
    <div
      className="grid"
      style={{ '--max-row-size': maxRowSize, '--row-count': groups.length } as CSSProperties}
    >
      {groups.map((group, rowIndex) => (
        <div className="row" key={rowIndex}>
          {group.map((id) => (
            <CameraTile key={id} id={id} fullscreenId={fullscreenId} imgRefs={imgRefs} toggle={toggle} />
          ))}
        </div>
      ))}
    </div>
  );
}
