import { config } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { camId: string } }) {
  const res = await fetch(`${config.workerUrl}/stream/${params.camId}`, { cache: 'no-store' });
  return new Response(res.body, {
    headers: { 'Content-Type': 'multipart/x-mixed-replace; boundary=frame' },
  });
}
