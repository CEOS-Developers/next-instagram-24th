"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Plus, Search, Send, SquarePlay } from "lucide-react";
import { FaHouse } from "react-icons/fa6";

import Avatar from "@/components/Avatar";
import { currentUser } from "@/data/profiles";

const MENU_ITEMS = [
  { label: "홈", Icon: House, href: "/" },
  { label: "검색", Icon: Search },
  { label: "릴스", Icon: SquarePlay },
  { label: "만들기", Icon: Plus },
  { label: "메시지", Icon: Send },
];

const ITEM_CLASS =
  "flex min-w-0 items-center justify-center";

const LINK_CLASS =
  `${ITEM_CLASS} focus-visible:outline-2 focus-visible:-outline-offset-4`;

export function BottomNavigation() {
  const pathname = usePathname();
  const profileHref = `/${currentUser.username}`;
  const isProfileActive = pathname === profileHref;

  return (
    <nav
      aria-label="하단 주 메뉴"
      className="fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-6 border-t border-neutral-200 bg-white text-neutral-950 md:hidden"
    >
      {MENU_ITEMS.map(({ label, Icon, href }) => {
        const isActive = href !== undefined && pathname === href;

        const icon =
          href === "/" && isActive ? (
            <FaHouse size={24} />
          ) : (
            <Icon size={24} />
          );

        return href ? (
          <Link
            key={label}
            href={href}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className={LINK_CLASS}
          >
            <span aria-hidden="true">{icon}</span>
          </Link>
        ) : (
          <span
            key={label}
            aria-hidden="true"
            className={ITEM_CLASS}
          >
            {icon}
          </span>
        );
      })}

      <Link
        href={profileHref}
        aria-label="프로필"
        aria-current={isProfileActive ? "page" : undefined}
        className={LINK_CLASS}
      >
        <Avatar
          className={`size-7 ${
            isProfileActive ? "ring-2 ring-neutral-950" : ""
          }`}
        />
      </Link>
    </nav>
  );
}