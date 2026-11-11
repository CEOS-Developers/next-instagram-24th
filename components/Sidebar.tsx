import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavigationItems, { NavigationItemsFallback } from "./NavigationItems";

const additionalItems = [
  { label: "더 보기", src: "/icons/menu.svg" },
  { label: "Meta의 다른 앱", src: "/icons/meta-apps.svg" },
];

export default function Sidebar() {
  return (
    <aside
      aria-label="사이드바"
      className="fixed inset-y-0 left-0 z-20 hidden w-18 flex-col gap-6 overflow-y-auto bg-background px-3 py-6 md:flex"
    >
      <div className="flex shrink-0 justify-center">
        <Link
          href="/"
          aria-label="Instagram 홈"
          className="flex size-12 items-center justify-center"
        >
          <Image
            src="/icons/insta.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 dark:invert"
          />
        </Link>
      </div>
      <div className="h-130.75 shrink-0 flex items-center">
        <nav aria-label="주 내비게이션">
          <Suspense fallback={<NavigationItemsFallback variant="sidebar" />}>
            <NavigationItems variant="sidebar" />
          </Suspense>
        </nav>
      </div>
      <div className="mt-auto flex shrink-0 flex-col gap-2">
        {additionalItems.map(({ label, src }) => (
          <button
            key={label}
            type="button"
            disabled
            aria-label={label}
            className="flex size-12 shrink-0 items-center justify-center enabled:cursor-pointer disabled:cursor-not-allowed"
          >
            <Image
              src={src}
              alt=""
              width={24}
              height={24}
              className="size-6 dark:invert"
            />
          </button>
        ))}
      </div>
    </aside>
  );
}
