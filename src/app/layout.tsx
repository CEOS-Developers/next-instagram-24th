import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "프로필 | Instagram",
  description: "배고프다",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-surface font-sans text-body text-text-primary">
        {children}
      </body>
    </html>
  );
}
