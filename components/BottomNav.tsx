import Image from "next/image";
import Link from "next/link";
import { myPageHref, profileImage } from "@/app/_lib/profile";

const navItems = [
  { label: "홈", src: "/icons/home.svg", href: "/" },
  { label: "검색", src: "/icons/search-icon.svg" },
  { label: "릴스", src: "/icons/reels.svg" },
  { label: "메시지", src: "/icons/message.svg" },
  { label: "내 프로필", src: profileImage, href: myPageHref },
];

const itemClassName = "flex h-12 w-full items-center justify-center";

export default function BottomNav() {
  return (
    <nav
      aria-label="하단 내비게이션"
      className="sticky bottom-0 z-10 shrink-0 border-t border-foreground/15 bg-background pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {navItems.map(({ label, src, href }) => {
          const isProfile = src === profileImage;
          const icon = (
            <Image
              src={src}
              alt=""
              width={24}
              height={24}
              className={
                isProfile
                  ? "size-[24px] rounded-full border border-foreground object-cover"
                  : "dark:invert"
              }
            />
          );

          return (
            <li key={label}>
              {href ? (
                <Link
                  href={href}
                  aria-label={label}
                  className={`${itemClassName} cursor-pointer`}
                >
                  {icon}
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-label={label}
                  className={`${itemClassName} enabled:cursor-pointer disabled:cursor-not-allowed`}
                >
                  {icon}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
