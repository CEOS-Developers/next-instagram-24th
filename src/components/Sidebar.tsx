"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import SidebarMenu from "@/components/SidebarMenu";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const widthClassName = collapsed ? "md:w-18 xl:w-18" : "md:w-18 xl:w-60";
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside className={`hidden ${widthClassName} shrink-0 md:block motion-safe:transition-[width] motion-safe:duration-200`}>
      <div className={`fixed inset-y-0 left-0 z-10 flex ${widthClassName} flex-col overflow-x-hidden overflow-y-auto border-r border-gray-200 bg-white px-3 pt-6 pb-4 text-[#0f1419] motion-safe:transition-[width] motion-safe:duration-200`}>
        <div className={`mb-12 flex min-h-13 items-center justify-center ${collapsed ? "" : "xl:justify-between"}`}>
          <Link
            href="/"
            aria-label="Instagram 홈"
            className={`${collapsed ? "xl:hidden" : ""} block w-fit rounded-lg p-3 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2`}
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
          <button
            type="button"
            onClick={() => setCollapsed((previous) => !previous)}
            aria-expanded={!collapsed}
            aria-controls="sidebar-menu"
            aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
            title={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
            className="hidden shrink-0 rounded-lg p-2.5 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 xl:block"
          >
            <ToggleIcon size={24} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <Suspense fallback={<div className="flex-1" />}>
          <SidebarMenu collapsed={collapsed} />
        </Suspense>
      </div>
    </aside>
  );
}
