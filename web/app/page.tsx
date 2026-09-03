import { config } from '@/lib/config';
import CameraGrid from '@/components/CameraGrid';

export const dynamic = 'force-dynamic';

export default function Home() {
  return <CameraGrid groups={config.cameraGroups} pollIntervalMs={config.pollIntervalMs} />;
}
