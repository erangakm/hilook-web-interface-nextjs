import { config } from '@/lib/config';
import CameraGrid from '@/components/CameraGrid';

export default function Home() {
  return <CameraGrid cameras={config.targetCameras} />;
}
