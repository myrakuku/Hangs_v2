import type { Metadata, Viewport } from 'next';
import '../globals.css';


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        {children}
      </body>
    </html>
  );
}
