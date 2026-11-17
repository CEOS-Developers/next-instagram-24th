import { useSyncExternalStore } from "react";
import { currentUser } from "@/mocks/users";

const STORAGE_PREFIX = "instagram:saved:";
const CHANGE_EVENT = "instagram:saved-change";
const EMPTY: string[] = [];

// 저장소 접근이 막히면 현재 탭에서 변경 상태를 유지합니다.
const unsavedPostIds = new Map<string, string[]>();
const snapshotCache = new Map<string, { raw: string | null; value: string[] }>();

function parsePostIds(raw: string | null): string[] {
  if (!raw) return EMPTY;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;

    return [...new Set(parsed.filter((id): id is string => typeof id === "string"))];
  } catch {
    return EMPTY;
  }
}

export function getSavedPostIds(userId = currentUser.id): string[] {
  if (typeof window === "undefined") return EMPTY;

  const key = `${STORAGE_PREFIX}${userId}`;
  const unsaved = unsavedPostIds.get(key);
  if (unsaved) return unsaved;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    // 읽을 수 없으면 저장된 게시물이 없는 것으로 봅니다.
  }

  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw) return cached.value;

  const value = parsePostIds(raw);
  snapshotCache.set(key, { raw, value });
  return value;
}

export function setPostSaved(postId: string, isSaved: boolean, userId = currentUser.id): void {
  if (typeof window === "undefined") return;

  const key = `${STORAGE_PREFIX}${userId}`;
  const previous = getSavedPostIds(userId);
  if (previous.includes(postId) === isSaved) return;

  // 가장 최근에 저장한 게시물을 앞에 둡니다.
  const next = isSaved ? [postId, ...previous] : previous.filter((id) => id !== postId);

  try {
    window.localStorage.setItem(key, JSON.stringify(next));
    unsavedPostIds.delete(key);
  } catch {
    unsavedPostIds.set(key, next);
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeSavedPosts(onChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key !== null && !event.key.startsWith(STORAGE_PREFIX)) return;

    if (event.key === null) {
      unsavedPostIds.clear();
    } else {
      unsavedPostIds.delete(event.key);
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

export function useSavedPostIds(userId = currentUser.id): string[] {
  return useSyncExternalStore(
    subscribeSavedPosts,
    () => getSavedPostIds(userId),
    // 서버와 hydration의 첫 렌더링에서는 같은 빈 목록을 사용합니다.
    () => EMPTY,
  );
}

export function usePostSave(postId: string) {
  const isSaved = useSavedPostIds().includes(postId);

  function toggleSave() {
    setPostSaved(postId, !getSavedPostIds().includes(postId));
  }

  return { isSaved, toggleSave };
}
