function parseIds(value: string | undefined): number[] {
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
    .map((key) => parseIds(process.env[key]))
    .filter((group) => group.length > 0);
}

const groups = allGroups();

export const config = {
  workerUrl: process.env.WORKER_URL ?? 'http://worker:4001',
  targetCameras: parseIds(process.env.TARGET_CAMERAS),
  focusMain: groups[0]?.[0],
  focusOthers: groups.slice(1).flat(),
  pollIntervalMs: Number(process.env.POLL_INTERVAL ?? '1') * 1000,
};
