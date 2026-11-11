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

const PREFIX = "instagram:follow:";

// 지금 내가 팔로우 중인 계정 수 (localStorage + 저장 실패 시 임시 기록)
function countFollowed() {
  const keys = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(PREFIX) && localStorage.getItem(key) === "1") keys.add(key);
    }
  } catch { /* localStorage 를 못 쓰는 환경이면 임시 기록만 사용 */ }
  for (const [key, value] of fallback) {
    if (value) keys.add(key);
    else keys.delete(key);
  }
  return keys.size;
}

// 내가 팔로우한 계정 수 hook (내 프로필의 "팔로잉" 숫자에 더해짐)
// 다른 프로필에서 팔로우 버튼을 누르면 follow-change 이벤트로 바로 다시 계산됩니다.
export function useFollowedCount() {
  return useSyncExternalStore(subscribe, countFollowed, () => 0);
}

// 팔로우 상태를 읽고 바꾸는 hook (버튼과 팔로워 수가 같은 상태를 공유)
export function useFollowing(userId: string) {
  const key = PREFIX + userId;
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
