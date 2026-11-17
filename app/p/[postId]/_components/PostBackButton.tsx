"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PostBackButton({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace(fallbackHref);
    }
  }

  return (
    <button type="button" aria-label="뒤로 가기" onClick={goBack} className="cursor-pointer">
      <Image
        src="/icons/arrow.svg"
        alt=""
        width={24}
        height={24}
        className="-rotate-90 dark:invert"
      />
    </button>
  );
}
