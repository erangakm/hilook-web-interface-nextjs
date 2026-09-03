import { config } from './config';
import { digestGet } from './digestAuth';
import { generateNoSignalFrame } from './noSignal';

const NO_SIGNAL = generateNoSignalFrame();
const frames = new Map<number, Buffer>(config.targetCameras.map((id) => [id, NO_SIGNAL]));

export function getSnapshot(camId: number): Buffer {
  return frames.get(camId) ?? NO_SIGNAL;
}

async function fetchSingle(camId: number): Promise<void> {
  const url = `http://${config.camIp}/ISAPI/Streaming/channels/${camId}01/picture`;
  try {
    const body = await digestGet(url, config.camUser, config.camPass, 1000);
    frames.set(camId, body.length > 1000 ? body : NO_SIGNAL);
  } catch {
    frames.set(camId, NO_SIGNAL);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function startPolling(): Promise<void> {
  for (;;) {
    for (const group of config.groups) {
      await Promise.all(group.map(fetchSingle));
      await sleep(config.pollIntervalMs);
    }
  }
}
