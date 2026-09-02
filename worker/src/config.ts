function parseIntList(value: string | undefined): number[] {
  return (value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number);
}

export const config = {
  camUser: process.env.CAM_USER ?? '',
  camPass: process.env.CAM_PASS ?? '',
  camIp: process.env.CAM_IP ?? '',
  camStream: process.env.CAM_STREAM ?? '1',
  pollIntervalMs: Number(process.env.POLL_INTERVAL ?? '1') * 1000,
  targetCameras: parseIntList(process.env.TARGET_CAMERAS),
  group1: parseIntList(process.env.GROUP_1),
  group2: parseIntList(process.env.GROUP_2),
  port: Number(process.env.WORKER_PORT ?? '4001'),
};
