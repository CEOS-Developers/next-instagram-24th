"use client";

import { useSyncExternalStore } from "react";
import { HeartIcon } from "@/components/icons";
import { formatCount } from "@/lib/format";

const memory = new Map<string, boolean>();
function read(key: string) {
  try { return memory.get(key) ?? (localStorage.getItem(key) === "1"); }
  catch { return memory.get(key) ?? false; }
}
function subscribe(update: () => void) {
  window.addEventListener("storage", update);
  window.addEventListener("post-like", update);
  return () => {
    window.removeEventListener("storage", update);
    window.removeEventListener("post-like", update);
  };
}
function usePostLike(id: string) {
  const key = "instagram:like:" + id;
  const liked = useSyncExternalStore(subscribe, () => read(key), () => false);
  function toggle() {
    const next = !read(key);
    try {
      if (next) localStorage.setItem(key, "1");
      else localStorage.removeItem(key);
      memory.delete(key);
    } catch { memory.set(key, next); }
    window.dispatchEvent(new Event("post-like"));
  }
  return { liked, toggle };
}

export function LikeButton({ id }: { id: string }) {
  const { liked, toggle } = usePostLike(id);
  return (
    <button type="button" onClick={toggle} aria-label="좋아요" aria-pressed={liked}
      className={`inline-flex cursor-pointer items-center justify-center rounded motion-safe:transition-transform active:scale-90 ${liked ? "text-red-500" : "hover:text-neutral-600"}`}>
      <HeartIcon filled={liked} className="size-6" />
    </button>
  );
}

export function LikeCount({ id, count }: { id: string; count: number }) {
  const { liked } = usePostLike(id);
  return <>{formatCount(count + Number(liked))}</>;
}
