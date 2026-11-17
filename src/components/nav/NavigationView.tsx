import Link from "next/link";

import Avatar from "@/components/Avatar";
import type { User } from "@/types";

type NavigationViewProps = {
  currentUser: User;
  pathname: string | null; // null 이면 아무 메뉴도 강조하지 않음 (Suspense fallback 용)
};

// 화면에 그려지는 부분만 담당하는 컴포넌트 (hook 없음)
// - md 이상: 왼쪽 고정 사이드바
// - md 미만: 하단 탭바
// 사이드바 아이콘: 인스타그램 화면에서 잘라낸 이미지 (public/icons/nav/*.png, 투명 배경)
// <svg> 로 감싸서 globals.css 의 사이드바 아이콘 크기 규칙(.desktop-rail svg)이 그대로 적용되게 함
function NavIcon({ name }: { name: "home" | "reels" | "direct" | "search" | "heart" | "plus" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 56 56" className="size-7">
      <image href={`/icons/nav/${name}.png`} width="56" height="56" />
    </svg>
  );
}

export default function NavigationView({ currentUser, pathname }: NavigationViewProps) {
  const profileHref = `/${currentUser.username}`;
  const isHome = pathname === "/";
  const isProfile = pathname === profileHref;

  const items = [
    {
      href: "/",
      label: "홈",
      active: isHome,
      icon: <NavIcon name="home" />,
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

  const railItem = "rail-item relative grid size-11 shrink-0 place-items-center rounded-xl [&>svg]:size-7";
  // 사이드바에 마우스를 올리면 보이는 메뉴 이름 (globals.css 의 .rail-* 참고)
  const hoverText = (label: string, active = false) => (
    <span aria-hidden="true" className={`rail-label ${active ? "font-bold" : ""}`}>{label}</span>
  );
  const glyph = (path: string) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
  const shortcuts = [
    ["릴스", <NavIcon key="reels" name="reels" />],
    ["메시지", <NavIcon key="direct" name="direct" />],
    ["검색", <NavIcon key="search" name="search" />],
    ["알림", <NavIcon key="heart" name="heart" />],
    ["만들기", <NavIcon key="plus" name="plus" />],
  ] as const;
  const railLink = (item: (typeof items)[number]) => (
    <Link href={item.href} aria-label={item.label}
      aria-current={item.active ? "page" : undefined} className={railItem}>
      {item.icon}
      {hoverText(item.label, item.active)}
    </Link>
  );

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <nav className="desktop-rail fixed inset-y-0 left-0 z-20 hidden w-[72px] flex-col items-center overflow-y-auto bg-white py-4 md:flex">
        <Link href="/" aria-label="Instagram 홈" className={railItem + " mt-2"}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </Link>
        <div className="mt-[clamp(16px,8vh,88px)] flex shrink-0 flex-col items-center gap-[clamp(2px,1vh,10px)]">
          {railLink(items[0])}
          {shortcuts.map(([label, icon]) => (
            <span key={label} role="img" aria-label={label} className={railItem}>
              {icon}
              {label === "메시지" && <span aria-hidden="true" className="absolute top-5 left-6 rounded-full border-2 border-white bg-red-500 px-1 text-[10px] font-bold leading-4 text-white">9+</span>}
              {hoverText(label)}
            </span>
          ))}
          {railLink(items[1])}
        </div>
        <div className="mt-auto flex shrink-0 flex-col gap-2 pt-4">
          <span role="img" aria-label="더 보기" className={railItem}>
            {glyph("M3 5h18M3 12h18M3 19h18")}
            {hoverText("더 보기")}
          </span>
          <span role="img" aria-label="Meta의 다른 앱" className={railItem}>
            {glyph("M9 2h6v7H9z M2 14h7v7H2z M15 14h7v7h-7z")}
            {hoverText("Meta의 다른 앱")}
          </span>
        </div>
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
