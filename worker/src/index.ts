import express from 'express';
import { config } from './config';
import { getSnapshot, startPolling } from './snapshotCache';
import { createMjpegStream } from './stream';

const app = express();

app.get('/snapshot/:camId', (req, res) => {
  res.set('Content-Type', 'image/jpeg');
  res.send(getSnapshot(Number(req.params.camId)));
});

app.get('/stream/:camId', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'multipart/x-mixed-replace; boundary=frame' });
  const stream = createMjpegStream(Number(req.params.camId));
  stream.pipe(res);
  req.on('close', () => stream.destroy());
});

startPolling();
app.listen(config.port, () => console.log(`worker listening on ${config.port}`));
