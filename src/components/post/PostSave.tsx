"use client";

import { useSyncExternalStore } from "react";
import { BookmarkIcon } from "@/components/icons";

// 게시물 저장(북마크) 버튼: 누르면 채워진 아이콘으로 바뀜
// 좋아요(PostLike)와 같은 방식으로 localStorage 에 저장해서 새로고침해도 유지됩니다.
const fallback = new Map<string, boolean>();
function read(key: string) {
  try { return fallback.get(key) ?? (localStorage.getItem(key) === "1"); }
  catch { return fallback.get(key) ?? false; }
}
function subscribe(update: () => void) {
  window.addEventListener("storage", update);
  window.addEventListener("post-save", update);
  return () => {
    window.removeEventListener("storage", update);
    window.removeEventListener("post-save", update);
  };
}

export function SaveButton({ id, className = "" }: { id: string; className?: string }) {
  const key = "instagram:save:" + id;
  const saved = useSyncExternalStore(subscribe, () => read(key), () => false);
  function toggle() {
    const next = !read(key);
    try {
      if (next) localStorage.setItem(key, "1");
      else localStorage.removeItem(key);
      fallback.delete(key);
    } catch { fallback.set(key, next); }
    window.dispatchEvent(new Event("post-save"));
  }
  return (
    <button type="button" onClick={toggle} aria-label={saved ? "저장 취소" : "저장"} aria-pressed={saved}
      className={`inline-flex cursor-pointer items-center justify-center motion-safe:transition-transform active:scale-90 ${saved ? "" : "hover:text-neutral-600"} ${className}`}>
      <BookmarkIcon filled={saved} className="size-6" />
    </button>
  );
}
