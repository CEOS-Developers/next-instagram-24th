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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // layout 은 Server Component 이므로 데이터를 바로 읽어서 내려줄 수 있습니다.
  const currentUser = getCurrentUser();

  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-neutral-900">
        {/* 메뉴 강조는 주소를 알아야 하므로, 알기 전에는 강조 없는 메뉴를 먼저 보여줌 */}
        <Suspense fallback={<NavigationView currentUser={currentUser} pathname={null} />}>
          <Navigation currentUser={currentUser} />
        </Suspense>

        <main className="pb-12 md:pb-0 md:pl-[72px] xl:pl-[244px]">{children}</main>
      </body>
    </html>
  );
}
