'use client';

import { useCameraFeed } from '@/hooks/useCameraFeed';
import { CameraTile } from './CameraTile';

export default function FocusGrid({
  main,
  others,
  pollIntervalMs,
}: {
  main: number;
  others: number[];
  pollIntervalMs: number;
}) {
  const cameras = [main, ...others];
  const { fullscreenId, imgRefs, toggle } = useCameraFeed(cameras, pollIntervalMs);

  return (
    <div className="focus">
      <CameraTile id={main} fullscreenId={fullscreenId} imgRefs={imgRefs} toggle={toggle} className="cam-main" />
      <div className="focus-others">
        {others.map((id) => (
          <CameraTile key={id} id={id} fullscreenId={fullscreenId} imgRefs={imgRefs} toggle={toggle} />
        ))}
      </div>
    </div>
  );
}
