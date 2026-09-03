function parseIntList(value: string | undefined): number[] {
  return (value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number);
}

function allGroups(): number[][] {
  return Object.keys(process.env)
    .filter((key) => /^GROUP_\d+$/.test(key))
    .sort((a, b) => Number(a.slice(6)) - Number(b.slice(6)))
    .map((key) => parseIntList(process.env[key]))
    .filter((group) => group.length > 0);
}

export const config = {
  camUser: process.env.CAM_USER ?? '',
  camPass: process.env.CAM_PASS ?? '',
  camIp: process.env.CAM_IP ?? '',
  camStream: process.env.CAM_STREAM ?? '1',
  pollIntervalMs: Number(process.env.POLL_INTERVAL ?? '1') * 1000,
  targetCameras: parseIntList(process.env.TARGET_CAMERAS),
  groups: allGroups(),
  port: Number(process.env.WORKER_PORT ?? '4001'),
};
