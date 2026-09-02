import { config } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { camId: string } }) {
  const res = await fetch(`${config.workerUrl}/snapshot/${params.camId}`, { cache: 'no-store' });
  const body = await res.arrayBuffer();
  return new Response(body, { headers: { 'Content-Type': 'image/jpeg' } });
}
