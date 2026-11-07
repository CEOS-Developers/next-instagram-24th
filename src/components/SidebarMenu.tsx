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
import HomeIcon from "@/components/HomeIcon";
import { currentUser } from "@/data/profiles";

const menuItems: { label: string; icon: LucideIcon; href?: string }[] = [
  { label: "홈", icon: House, href: "/" },
  { label: "릴스", icon: Clapperboard },
  { label: "메시지", icon: Send },
  { label: "검색", icon: Search },
  { label: "알림", icon: Heart },
  { label: "만들기", icon: Plus },
  { label: "프로필", icon: CircleUserRound, href: `/${currentUser.username}` },
];

export default function SidebarMenu({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const itemClassName = `flex min-h-12 w-full items-center justify-center rounded-lg py-3 text-left text-base focus-visible:outline-2 focus-visible:outline-offset-2 ${collapsed ? "" : "xl:justify-start xl:gap-4 xl:px-3"}`;
  const labelClassName = collapsed ? "sr-only" : "sr-only xl:not-sr-only";

  return (
    <div id="sidebar-menu" className="flex min-h-0 flex-1 flex-col">
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
                    title={item.label}
                    className={`${itemClassName} hover:bg-gray-100 ${active ? "font-bold" : ""}`}
                  >
                    {item.icon === House ? (
                      <HomeIcon active={active} />
                    ) : (
                      <ItemIcon
                        size={24}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="shrink-0"
                      />
                    )}
                    <span className={labelClassName}>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    title={`${item.label}`}
                    className={`${itemClassName} cursor-not-allowed text-gray-500`}
                  >
                    <ItemIcon size={24} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    <span className={labelClassName}>{item.label}</span>
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
          title="더 보기"
          className={`${itemClassName} cursor-not-allowed text-gray-500`}
        >
          <Menu size={24} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
          <span className={labelClassName}>더 보기</span>
        </button>
        <button
          type="button"
          disabled
          title="Meta의 다른 앱"
          className={`${itemClassName} cursor-not-allowed text-gray-500`}
        >
          <LayoutGrid size={24} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
          <span className={labelClassName}>Meta의 다른 앱</span>
        </button>
      </div>
    </div>
  );
}
