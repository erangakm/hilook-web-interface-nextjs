import { spawn } from 'child_process';
import { Readable } from 'stream';
import { config } from './config';

const SOI = Buffer.from([0xff, 0xd8]);
const EOI = Buffer.from([0xff, 0xd9]);

/** ffmpeg's mjpeg muxer emits a raw JPEG bitstream, not HTTP multipart — we split on JPEG markers and wrap each frame ourselves. */
export function createMjpegStream(camId: number): Readable {
  const rtspUrl =
    `rtsp://${encodeURIComponent(config.camUser)}:${encodeURIComponent(config.camPass)}` +
    `@${config.camIp}:554/Streaming/Channels/${camId}0${config.camStream}`;

  const ffmpeg = spawn(
    'ffmpeg',
    ['-rtsp_transport', 'tcp', '-i', rtspUrl, '-f', 'mjpeg', '-q:v', '5', '-r', '25', 'pipe:1'],
    { stdio: ['ignore', 'pipe', 'ignore'] },
  );

  const out = new Readable({ read() {} });
  let buf = Buffer.alloc(0);

  ffmpeg.stdout.on('data', (chunk: Buffer) => {
    buf = Buffer.concat([buf, chunk]);
    for (;;) {
      const start = buf.indexOf(SOI);
      if (start === -1) {
        buf = Buffer.alloc(0);
        break;
      }
      const end = buf.indexOf(EOI, start + 2);
      if (end === -1) {
        if (start > 0) buf = buf.subarray(start);
        break;
      }
      const frame = buf.subarray(start, end + 2);
      out.push(Buffer.concat([Buffer.from('--frame\r\nContent-Type: image/jpeg\r\n\r\n'), frame, Buffer.from('\r\n')]));
      buf = buf.subarray(end + 2);
    }
  });

  ffmpeg.on('close', () => out.push(null));
  ffmpeg.on('error', () => out.push(null));
  out.on('close', () => ffmpeg.kill('SIGKILL'));

  return out;
}
