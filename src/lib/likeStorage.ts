import { useSyncExternalStore } from "react";
import type { Post } from "@/types/post";

// followStorage와 같은 방식으로 좋아요 상태를 localStorage에 저장합니다.
const STORAGE_PREFIX = "instagram:like:";
const CHANGE_EVENT = "instagram:like-change";

// 브라우저가 저장을 거부하면 현재 탭에서만 변경 상태를 유지합니다.
const unsavedLikes = new Map<string, boolean>();

export function getLikeState(postId: string, initialValue: boolean): boolean {
  if (typeof window === "undefined") return initialValue;

  const key = `${STORAGE_PREFIX}${postId}`;
  const unsavedValue = unsavedLikes.get(key);

  if (unsavedValue !== undefined) return unsavedValue;

  try {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue === "true") return true;
    if (storedValue === "false") return false;
  } catch {
    // 저장소를 읽을 수 없으면 목데이터의 초기 상태를 사용합니다.
  }

  return initialValue;
}

export function setLikeState(postId: string, isLiked: boolean): void {
  if (typeof window === "undefined") return;

  const key = `${STORAGE_PREFIX}${postId}`;

  try {
    window.localStorage.setItem(key, String(isLiked));
    unsavedLikes.delete(key);
  } catch {
    unsavedLikes.set(key, isLiked);
  }

  // storage 이벤트는 다른 탭에서만 발생하므로 현재 탭에도 변경을 알립니다.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeLikeState(onChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key !== null && !event.key.startsWith(STORAGE_PREFIX)) return;

    if (event.key === null) {
      unsavedLikes.clear();
    } else {
      unsavedLikes.delete(event.key);
    }

    onChange();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/**
 * 게시물의 좋아요 상태와 좋아요 수를 함께 다룹니다. Client Component에서 사용합니다.
 * 좋아요 수는 목데이터 값에 현재 상태와 초기 상태의 차이만 반영합니다.
 */
export function usePostLike(post: Post) {
  const isLiked = useSyncExternalStore(
    subscribeLikeState,
    () => getLikeState(post.id, post.isLikedByMe),
    // 서버와 첫 클라이언트 렌더링은 같은 초기값을 사용합니다.
    () => post.isLikedByMe,
  );

  const likeCount = post.likeCount + Number(isLiked) - Number(post.isLikedByMe);

  function toggleLike() {
    setLikeState(post.id, !getLikeState(post.id, post.isLikedByMe));
  }

  return { isLiked, likeCount, toggleLike };
}
