"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { hasInAppHistory } from "@/lib/navHistory";

// 게시물 상세 닫기 버튼 (✕ 또는 Esc 키)
// - 앱 안에서 들어왔으면 이전 화면(피드, 프로필 등)으로 돌아감
// - 주소로 바로 들어와서 돌아갈 곳이 없으면 fallbackHref(작성자 프로필)로 이동
export default function PostCloseButton({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (hasInAppHistory()) router.back();
      else router.push(fallbackHref);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, fallbackHref]);

  return (
    <button
      type="button"
      aria-label="닫기"
      title="닫기 (Esc)"
      onClick={() => (hasInAppHistory() ? router.back() : router.push(fallbackHref))}
      className="ml-auto grid size-8 cursor-pointer place-items-center rounded-full hover:bg-neutral-100"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}
