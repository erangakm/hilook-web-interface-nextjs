import { config } from '@/lib/config';
import FocusGrid from '@/components/FocusGrid';

export const dynamic = 'force-dynamic';

export default function Focus() {
  return <FocusGrid main={config.focusMain!} others={config.focusOthers} />;
}
