"use client";

import {
  CircleUserRound,
  Clapperboard,
  Heart,
  House,
  LayoutGrid,
  Menu,
  Plus,
  Search,
  Send,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems: { label: string; icon: LucideIcon; href?: string }[] = [
  { label: "홈", icon: House, href: "/" },
  { label: "릴스", icon: Clapperboard },
  { label: "메시지", icon: Send },
  { label: "검색", icon: Search },
  { label: "알림", icon: Heart },
  { label: "만들기", icon: Plus },
  { label: "프로필", icon: CircleUserRound, href: "/jxx_gro_ovy" },
];

const itemClassName =
  "flex min-h-12 w-full items-center gap-4 rounded-lg px-3 py-3 text-left text-base focus-visible:outline-2 focus-visible:outline-offset-2";

export default function SidebarMenu() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav aria-label="주요 메뉴">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            const ItemIcon = item.icon;

            return (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`${itemClassName} hover:bg-gray-100 ${active ? "font-bold" : ""}`}
                  >
                    {active && item.icon === House ? (
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                        className="shrink-0"
                      >
                        <path d="M10.1 3.2a3 3 0 0 1 3.8 0L20 8.3a3 3 0 0 1 1 2.3V19a2 2 0 0 1-2 2h-4v-6a3 3 0 0 0-6 0v6H5a2 2 0 0 1-2-2v-8.4a3 3 0 0 1 1-2.3Z" />
                      </svg>
                    ) : (
                      <ItemIcon
                        size={24}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="shrink-0"
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    title={`${item.label}: 준비 중`}
                    className={`${itemClassName} cursor-not-allowed text-gray-500`}
                  >
                    <ItemIcon size={24} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    <span>{item.label}</span>
                    <span className="sr-only"> (준비 중)</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-2 pt-8">
        <button
          type="button"
          disabled
          title="더 보기: 준비 중"
          className={`${itemClassName} cursor-not-allowed text-gray-500`}
        >
          <Menu size={24} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
          <span>더 보기</span>
          <span className="sr-only"> (준비 중)</span>
        </button>
        <button
          type="button"
          disabled
          title="Meta의 다른 앱: 준비 중"
          className={`${itemClassName} cursor-not-allowed text-gray-500`}
        >
          <LayoutGrid size={24} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
          <span>Meta의 다른 앱</span>
          <span className="sr-only"> (준비 중)</span>
        </button>
      </div>
    </div>
  );
}
