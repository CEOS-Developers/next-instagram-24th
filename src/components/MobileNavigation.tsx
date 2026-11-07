"use client";

import {
  ArrowLeft,
  AtSign,
  Ellipsis,
  ChevronDown,
  CircleUserRound,
  Clapperboard,
  Heart,
  House,
  Plus,
  Search,
  Send,
  Settings,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@/components/HomeIcon";
import { currentUser, profiles } from "@/data/profiles";
import { posts } from "@/data/posts";

const menuItems: { label: string; icon: LucideIcon; href?: string }[] = [
  { label: "홈", icon: House, href: "/" },
  { label: "검색", icon: Search },
  { label: "릴스", icon: Clapperboard },
  { label: "만들기", icon: Plus },
  { label: "메시지", icon: Send },
  { label: "프로필", icon: CircleUserRound, href: `/${currentUser.username}` },
];

const controlClassName =
  "grid size-11 shrink-0 place-items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2";

export default function MobileNavigation() {
  const pathname = usePathname();
  const profile = profiles.find((profile) => pathname === `/${profile.username}`);
  const post = posts.find((post) => pathname === `/posts/${post.id}`);

  return (
    <div className="md:hidden">
      <header className="fixed inset-x-0 top-0 z-20 h-14 border-b border-gray-200 bg-white px-3">
        {profile ? (
          <div className="grid h-full grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-2">
            {profile.username === currentUser.username ? (
              <button
                type="button"
                disabled
                aria-label="설정"
                title="설정"
                className={`${controlClassName} cursor-not-allowed`}
              >
                <Settings size={24} strokeWidth={1.8} aria-hidden="true" />
              </button>
            ) : (
              <Link
                href={`/${currentUser.username}`}
                aria-label="내 프로필로 돌아가기"
                className={controlClassName}
              >
                <ArrowLeft size={24} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            )}
            <div className="flex min-w-0 items-center justify-center gap-1">
              <span className="truncate text-base font-semibold">{profile.username}</span>
              {profile.username === currentUser.username && (
                <ChevronDown size={16} aria-hidden="true" className="shrink-0" />
              )}
            </div>
            <button
              type="button"
              disabled
              aria-label={profile.username === currentUser.username ? "Threads" : "더 보기"}
              title={profile.username === currentUser.username ? "Threads" : "더 보기"}
              className={`${controlClassName} cursor-not-allowed`}
            >
              {profile.username === currentUser.username ? (
                <AtSign size={24} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Ellipsis size={24} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
          </div>
        ) : post ? (
          <div className="grid h-full grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-2">
            <Link
              href={`/${post.authorUsername}`}
              aria-label="작성자 프로필로 돌아가기"
              className={controlClassName}
            >
              <ArrowLeft size={24} strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <span className="text-center text-base font-semibold">게시물</span>
          </div>
        ) : (
          <div className="flex h-full items-center justify-between">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              Instagram
            </Link>
            <button
              type="button"
              disabled
              aria-label="알림"
              title="알림"
              className={`${controlClassName} cursor-not-allowed`}
            >
              <Heart size={26} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        )}
      </header>

      <nav
        aria-label="하단 메뉴"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="flex h-14 items-center justify-around">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            const ItemIcon = item.icon;
            const icon = item.icon === House ? (
              <HomeIcon active={active} />
            ) : (
              <ItemIcon size={24} strokeWidth={active ? 2.4 : 1.8} aria-hidden="true" />
            );

            return (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    title={item.label}
                    className={`${controlClassName} hover:bg-gray-100`}
                  >
                    {icon}
                    <span className="sr-only">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    title={`${item.label}`}
                    className={`${controlClassName} cursor-not-allowed text-gray-500`}
                  >
                    {icon}
                    <span className="sr-only">{item.label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
