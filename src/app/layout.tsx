import './globals.css';

import type { Metadata } from 'next';

import Sidebar from '@/components/common/Sidebar';

export const metadata: Metadata = {
  title: 'Instagram',
  description: 'Next.js로 만든 Instagram 클론',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full">
        <Sidebar />
        <main className="flex-1 pl-18">{children}</main>
      </body>
    </html>
  );
}
