import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";

import Navigation from "@/components/nav/Navigation";
import NavigationView from "@/components/nav/NavigationView";
import { getCurrentUser } from "@/lib/data";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Instagram",
    template: "%s • Instagram",
  },
  description: "CEOS 24기 Next.js 인스타그램 클론",
  // favicon: 브라우저마다 지원 형식이 달라서 여러 개를 함께 연결
  // - SVG: 크롬·파이어폭스 / PNG·ICO: SVG favicon 을 잘 못 쓰는 Safari / apple: 아이폰 홈 화면
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  // layout 은 Server Component 이므로 데이터를 바로 읽어서 내려줄 수 있습니다.
  const currentUser = getCurrentUser();

  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-neutral-900">
        {/* 메뉴 강조는 주소를 알아야 하므로, 알기 전에는 강조 없는 메뉴를 먼저 보여줌 */}
        <Suspense
          fallback={
            <NavigationView currentUser={currentUser} pathname={null} />
          }
        >
          <Navigation currentUser={currentUser} />
        </Suspense>

        <main className="pb-12 md:pb-0 md:px-[72px]">{children}</main>
        {modal}
      </body>
    </html>
  );
}
