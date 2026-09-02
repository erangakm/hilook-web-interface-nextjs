import http from 'http';
import crypto from 'crypto';
import { URL } from 'url';

function md5(input: string): string {
  return crypto.createHash('md5').update(input).digest('hex');
}

function parseDigestHeader(header: string): Record<string, string> {
  const params: Record<string, string> = {};
  const re = /(\w+)=(?:"([^"]*)"|([^,]*))/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(header)) !== null) {
    params[match[1]] = match[2] ?? match[3];
  }
  return params;
}

/** Hikvision ISAPI only sends the digest challenge on the first request; no digest-fetch lib does this two-step over plain http.get. */
export function digestGet(urlStr: string, user: string, pass: string, timeoutMs: number): Promise<Buffer> {
  const url = new URL(urlStr);

  return new Promise((resolve, reject) => {
    const challengeReq = http.get(url, { timeout: timeoutMs }, (challengeRes) => {
      challengeRes.resume();
      const authHeader = challengeRes.headers['www-authenticate'];
      if (challengeRes.statusCode !== 401 || !authHeader) {
        reject(new Error(`unexpected status ${challengeRes.statusCode}`));
        return;
      }

      const params = parseDigestHeader(authHeader);
      const nc = '00000001';
      const cnonce = crypto.randomBytes(8).toString('hex');
      const qop = params.qop ?? 'auth';
      const ha1 = md5(`${user}:${params.realm}:${pass}`);
      const ha2 = md5(`GET:${url.pathname}`);
      const response = md5(`${ha1}:${params.nonce}:${nc}:${cnonce}:${qop}:${ha2}`);

      const authValue =
        `Digest username="${user}", realm="${params.realm}", nonce="${params.nonce}", ` +
        `uri="${url.pathname}", qop=${qop}, nc=${nc}, cnonce="${cnonce}", ` +
        `response="${response}", opaque="${params.opaque ?? ''}"`;

      const dataReq = http.get(url, { timeout: timeoutMs, headers: { Authorization: authValue } }, (dataRes) => {
        const chunks: Buffer[] = [];
        dataRes.on('data', (chunk) => chunks.push(chunk));
        dataRes.on('end', () => {
          if (dataRes.statusCode === 200) resolve(Buffer.concat(chunks));
          else reject(new Error(`status ${dataRes.statusCode}`));
        });
      });
      dataReq.on('error', reject);
      dataReq.on('timeout', () => dataReq.destroy(new Error('timeout')));
    });
    challengeReq.on('error', reject);
    challengeReq.on('timeout', () => challengeReq.destroy(new Error('timeout')));
  });
}
