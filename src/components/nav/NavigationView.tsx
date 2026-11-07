import Link from "next/link";

import Avatar from "@/components/Avatar";
import { HomeIcon } from "@/components/icons";
import type { User } from "@/types";

type NavigationViewProps = {
  currentUser: User;
  pathname: string | null; // null 이면 아무 메뉴도 강조하지 않음 (Suspense fallback 용)
};

// 화면에 그려지는 부분만 담당하는 컴포넌트 (hook 없음)
// - md 이상: 왼쪽 고정 사이드바
// - md 미만: 하단 탭바
export default function NavigationView({ currentUser, pathname }: NavigationViewProps) {
  const profileHref = `/${currentUser.username}`;
  const isHome = pathname === "/";
  const isProfile = pathname === profileHref;

  const items = [
    {
      href: "/",
      label: "홈",
      active: isHome,
      icon: <HomeIcon filled={isHome} className="size-6" />,
    },
    {
      href: profileHref,
      label: "프로필",
      active: isProfile,
      icon: (
        <Avatar
          user={currentUser}
          size={24}
          className={isProfile ? "rounded-full ring-2 ring-neutral-900" : ""}
        />
      ),
    },
  ];

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <nav className="fixed inset-y-0 left-0 z-20 hidden w-[72px] flex-col border-r border-neutral-200 bg-white px-3 pt-8 pb-5 md:flex xl:w-[244px]">
        <Link href="/" className="mb-8 px-3 py-3">
          <span className="hidden text-2xl font-semibold tracking-tight italic xl:inline">
            Instagram
          </span>
          <span className="text-2xl font-semibold italic xl:hidden">I</span>
        </Link>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-neutral-100"
              >
                {item.icon}
                <span className={`hidden xl:inline ${item.active ? "font-bold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 모바일 하단 탭바 */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex h-12 items-center justify-around border-t border-neutral-200 bg-white md:hidden">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={item.active ? "page" : undefined}
            className="flex h-full flex-1 items-center justify-center"
          >
            {item.icon}
          </Link>
        ))}
      </nav>
    </>
  );
}
