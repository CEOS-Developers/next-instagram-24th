import Link from "next/link";
import { Suspense } from "react";
import SidebarMenu from "@/components/SidebarMenu";

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0">
      <div className="fixed inset-y-0 left-0 z-10 flex w-60 flex-col overflow-y-auto border-r border-gray-200 bg-white px-3 pt-6 pb-4 text-[#0f1419]">
        <Link
          href="/"
          aria-label="Instagram 홈"
          className="mb-12 w-fit rounded-lg p-3 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </Link>

        <Suspense fallback={<div className="flex-1" />}>
          <SidebarMenu />
        </Suspense>
      </div>
    </aside>
  );
}
