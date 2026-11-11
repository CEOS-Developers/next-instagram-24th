"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { defaultUsername } from "@/app/_lib/profile";

function HeaderUsername() {
  const { username } = useParams<{ username: string }>();

  return <span className="truncate">{username ?? defaultUsername}</span>;
}

export default function ProfileHeader() {
  return (
    <header className="sticky top-0 z-10 grid h-[44px] shrink-0 grid-cols-[24px_minmax(0,1fr)_24px] items-center gap-3 bg-background px-[16px] md:hidden">
      <button
        type="button"
        disabled
        aria-label="설정"
        className="flex items-center justify-center enabled:cursor-pointer disabled:cursor-not-allowed"
      >
        <Image
          src="/icons/option.svg"
          alt=""
          width={24}
          height={24}
          className="dark:invert"
        />
      </button>
      <button
        type="button"
        disabled
        className="flex min-w-0 items-center justify-center gap-1 font-semibold enabled:cursor-pointer disabled:cursor-not-allowed"
      >
        <Suspense fallback={<span className="truncate">{defaultUsername}</span>}>
          <HeaderUsername />
        </Suspense>
        <Image
          src="/icons/arrow.svg"
          alt=""
          width={16}
          height={16}
          className="shrink-0 rotate-180 dark:invert"
        />
      </button>
      <button
        type="button"
        disabled
        aria-label="Threads"
        className="flex items-center justify-center enabled:cursor-pointer disabled:cursor-not-allowed"
      >
        <Image
          src="/icons/thread.svg"
          alt=""
          width={24}
          height={24}
          className="dark:invert"
        />
      </button>
    </header>
  );
}
