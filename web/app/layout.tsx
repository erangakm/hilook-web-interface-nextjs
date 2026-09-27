import 'bootstrap/dist/css/bootstrap.min.css';
import type { ReactNode } from 'react';
import StyledJsxRegistry from '@/lib/StyledJsxRegistry';

export const metadata = {
  title: 'HiLook Smart-View',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-monospace overflow-hidden vw-100 vh-100">
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}
