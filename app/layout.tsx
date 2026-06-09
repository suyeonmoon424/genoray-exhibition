import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GENORAY Exhibition Image Generator',
  description: 'Generate exhibition promotional images for GENORAY',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
