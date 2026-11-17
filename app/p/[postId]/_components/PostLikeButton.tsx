"use client";

import Image from "next/image";
import { useId, useSyncExternalStore } from "react";
import { defaultUsername } from "@/app/_lib/profile";

const likeChangeEvent = "next-instagram:like-change";
const inMemoryLikes = new Map<string, boolean>();

function readLike(key: string, initiallyLiked: boolean) {
  const inMemory = inMemoryLikes.get(key);
  if (inMemory !== undefined) return inMemory;

  try {
    const saved = window.localStorage.getItem(key);
    if (saved === "1") return true;
    if (saved === "0") return false;
  } catch {
    return initiallyLiked;
  }
  return initiallyLiked;
}

function subscribe(onChange: () => void) {
  window.addEventListener(likeChangeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(likeChangeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

type PostLikeButtonProps = {
  postId: string;
  initialLikes: number;
  initiallyLiked?: boolean;
};

export default function PostLikeButton({ postId, initialLikes, initiallyLiked = false }: PostLikeButtonProps) {
  const countId = useId();
  const storageKey = `next-instagram:${defaultUsername}:like:${postId}`;
  const isLiked = useSyncExternalStore(
    subscribe,
    () => readLike(storageKey, initiallyLiked),
    () => initiallyLiked,
  );
  const likes = initialLikes + Number(isLiked) - Number(initiallyLiked);

  function toggleLike() {
    const nextLiked = !readLike(storageKey, initiallyLiked);
    try {
      window.localStorage.setItem(storageKey, nextLiked ? "1" : "0");
      inMemoryLikes.delete(storageKey);
    } catch {
      inMemoryLikes.set(storageKey, nextLiked);
    }
    window.dispatchEvent(new Event(likeChangeEvent));
  }

  return (
    <button
      type="button"
      aria-label="좋아요"
      aria-pressed={isLiked}
      aria-describedby={countId}
      onClick={toggleLike}
      className="flex cursor-pointer items-center gap-1.5"
    >
      {isLiked ? (
        <span aria-hidden="true" className="size-6 bg-red-500 [mask:url(/icons/heart-filled.svg)_center/contain_no-repeat]" />
      ) : (
        <Image src="/icons/heart.svg" alt="" width={24} height={24} className="dark:invert" />
      )}
      <span id={countId} className="text-sm font-semibold">{likes}</span>
    </button>
  );
}
