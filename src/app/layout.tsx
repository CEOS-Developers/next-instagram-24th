import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";
import MobileNavigation from "@/components/MobileNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instagram",
  description: "사진과 일상을 공유하는 인스타그램 클론 프로젝트",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-screen bg-white text-black">
          <Sidebar />
          <Suspense fallback={null}>
            <MobileNavigation />
          </Suspense>
          <main className="min-w-0 flex-1 pt-14 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pt-0 md:pb-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
