'use client';

import { useCameraFeed } from '@/hooks/useCameraFeed';
import { CameraTile } from './CameraTile';

export default function FocusGrid({
  main,
  others,
  pollIntervalMs,
  coverCameras,
}: {
  main: number;
  others: number[];
  pollIntervalMs: number;
  coverCameras: boolean;
}) {
  const cameras = [main, ...others];
  const { fullscreenId, imgRefs, toggle } = useCameraFeed(cameras, pollIntervalMs, coverCameras);

  return (
    <div className="focus">
      <CameraTile
        id={main}
        fullscreenId={fullscreenId}
        imgRefs={imgRefs}
        toggle={toggle}
        coverCameras={coverCameras}
        className="cam-main"
      />
      <div className="focus-others">
        {others.map((id) => (
          <CameraTile
            key={id}
            id={id}
            fullscreenId={fullscreenId}
            imgRefs={imgRefs}
            toggle={toggle}
            coverCameras={coverCameras}
          />
        ))}
      </div>
    </div>
  );
}
