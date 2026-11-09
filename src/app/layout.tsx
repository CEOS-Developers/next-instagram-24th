import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppNavigation } from "@/components/layout/AppNavigation";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Suspense } from "react";

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
  description: "인스타그램 클론 프로젝트",
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <AppNavigation />
          <BottomNavigation />
        </Suspense>

        <div className="flex min-h-screen flex-1 flex-col pb-16 pl-0 md:pb-0 md:pl-20">
          {children}
        </div>

        {modal}
      </body>
    </html>
  );
}
