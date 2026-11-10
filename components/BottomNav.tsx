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

const itemClassName = "box-border flex size-12 shrink-0 items-center justify-center p-3";

export default function BottomNav() {
  return (
    <nav
      aria-label="하단 내비게이션"
      className="sticky bottom-0 z-10 shrink-0 border-t border-foreground/15 bg-background pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="flex justify-evenly">
        {navItems.map(({ label, src, href }) => {
          const isProfile = src === profileImage;
          const image = (
            <Image
              src={src}
              alt={label}
              width={24}
              height={24}
              className={isProfile ? "size-6 rounded-full object-cover" : "dark:invert"}
            />
          );
          const icon = isProfile ? (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-foreground">
              {image}
            </span>
          ) : image;

          return (
            <li key={label} className={`flex justify-center ${isProfile ? "w-7" : "w-6"}`}>
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
