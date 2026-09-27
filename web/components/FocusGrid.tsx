'use client';

import css from 'styled-jsx/css';
import { useCameraFeed } from '@/hooks/useCameraFeed';
import { CameraTile } from './CameraTile';

// Scoped <style jsx> can't reach CameraTile's root, so sizing is passed in as a resolved className.
const mainTile = css.resolve`
  div {
    width: var(--main-w);
    height: var(--main-h);
  }
`;

const subTile = css.resolve`
  div {
    width: var(--sub-w);
    height: var(--sub-h);
  }
`;

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
      <CameraTile id={main} fullscreenId={fullscreenId} imgRefs={imgRefs} toggle={toggle} className={mainTile.className} />
      <div className="focus-others">
        {others.map((id) => (
          <CameraTile
            key={id}
            id={id}
            fullscreenId={fullscreenId}
            imgRefs={imgRefs}
            toggle={toggle}
            className={subTile.className}
          />
        ))}
      </div>
      {mainTile.styles}
      {subTile.styles}
      <style jsx>{`
        .focus {
          --gap: 2px;
          --sub-h: calc((100vh - 3 * var(--gap)) / 4);
          --sub-w: calc(var(--sub-h) * 16 / 9);
          --main-w: min(calc(100vw - var(--sub-w) - var(--gap)), calc(100vh * 16 / 9));
          --main-h: calc(var(--main-w) * 9 / 16);
          display: flex;
          width: 100vw;
          height: 100vh;
          justify-content: center;
          align-items: center;
          gap: var(--gap);
        }

        .focus-others {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
        }
      `}</style>
    </div>
  );
}
