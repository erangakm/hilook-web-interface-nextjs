import { execFileSync } from 'child_process';

/** Generated via ffmpeg (already a runtime dependency) instead of embedding an image asset. */
export function generateNoSignalFrame(): Buffer {
  return execFileSync(
    'ffmpeg',
    ['-y', '-f', 'lavfi', '-i', 'color=c=black:s=640x360', '-frames:v', '1', '-f', 'mjpeg', 'pipe:1'],
    { maxBuffer: 10 * 1024 * 1024 },
  );
}
