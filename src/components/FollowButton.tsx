"use client";

import { useSyncExternalStore } from "react";

function subscribe(update: () => void) {
  window.addEventListener("storage", update);
  window.addEventListener("follow-change", update);
  return () => {
    window.removeEventListener("storage", update);
    window.removeEventListener("follow-change", update);
  };
}

const fallback = new Map<string, boolean>();
function read(key: string) {
  try { return fallback.get(key) ?? (localStorage.getItem(key) === "1"); }
  catch { return fallback.get(key) ?? false; }
}

// 팔로우 상태를 읽고 바꾸는 hook (버튼과 팔로워 수가 같은 상태를 공유)
export function useFollowing(userId: string) {
  const key = "instagram:follow:" + userId;
  const following = useSyncExternalStore(subscribe, () => read(key), () => false);
  function toggle() {
    const next = !read(key);
    try {
      if (next) localStorage.setItem(key, "1");
      else localStorage.removeItem(key);
      fallback.delete(key);
    } catch { fallback.set(key, next); }
    window.dispatchEvent(new Event("follow-change"));
  }
  return { following, toggle };
}

export default function FollowButton({ userId, wide = false }: { userId: string; wide?: boolean }) {
  const { following, toggle } = useFollowing(userId);
  return <button type="button" aria-pressed={following} onClick={toggle}
    className={wide
      ? `flex-1 cursor-pointer rounded-xl py-2.5 font-semibold transition-colors ${following ? "bg-neutral-100 hover:bg-neutral-200" : "bg-indigo-500 text-white hover:bg-indigo-600"}`
      : `shrink-0 cursor-pointer py-2 text-xs font-semibold ${following ? "text-neutral-600" : "text-sky-600"}`}>
    {following ? "팔로잉" : "팔로우"}
  </button>;
}
