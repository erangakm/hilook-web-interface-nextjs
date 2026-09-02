export const config = {
  workerUrl: process.env.WORKER_URL ?? 'http://worker:4001',
  targetCameras: (process.env.TARGET_CAMERAS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number),
};
