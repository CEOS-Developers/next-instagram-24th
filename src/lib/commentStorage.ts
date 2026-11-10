import { useSyncExternalStore } from "react";
import type { Comment } from "@/types/comment";

// 내가 작성한 댓글을 게시물별로 localStorage에 저장합니다.
const STORAGE_PREFIX = "instagram:comments:";
const CHANGE_EVENT = "instagram:comments-change";
const EMPTY: Comment[] = [];

// 브라우저가 저장을 거부하면 현재 탭에서만 댓글을 유지합니다.
const unsavedComments = new Map<string, Comment[]>();
// useSyncExternalStore는 값이 바뀌지 않으면 같은 배열을 돌려받아야 해서 읽은 결과를 기억해 둡니다.
const snapshotCache = new Map<string, { raw: string | null; value: Comment[] }>();

function storageKey(postId: string) {
  return `${STORAGE_PREFIX}${postId}`;
}

function parseComments(raw: string | null): Comment[] {
  if (!raw) return EMPTY;

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Comment[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function getAddedComments(postId: string): Comment[] {
  if (typeof window === "undefined") return EMPTY;

  const key = storageKey(postId);
  const unsaved = unsavedComments.get(key);
  if (unsaved) return unsaved;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    // 저장소를 읽을 수 없으면 추가한 댓글이 없는 것으로 봅니다.
  }

  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw) return cached.value;

  const value = parseComments(raw);
  snapshotCache.set(key, { raw, value });
  return value;
}

export function addComment(comment: Comment): void {
  if (typeof window === "undefined") return;

  const key = storageKey(comment.postId);
  const next = [...getAddedComments(comment.postId), comment];

  try {
    window.localStorage.setItem(key, JSON.stringify(next));
    unsavedComments.delete(key);
  } catch {
    unsavedComments.set(key, next);
  }

  // storage 이벤트는 다른 탭에서만 발생하므로 현재 탭에도 변경을 알립니다.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeComments(onChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key !== null && !event.key.startsWith(STORAGE_PREFIX)) return;

    if (event.key === null) {
      unsavedComments.clear();
    } else {
      unsavedComments.delete(event.key);
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

/** 게시물에 내가 추가한 댓글 목록입니다. Client Component에서 사용합니다. */
export function useAddedComments(postId: string): Comment[] {
  return useSyncExternalStore(
    subscribeComments,
    () => getAddedComments(postId),
    // 서버와 첫 클라이언트 렌더링에서는 추가한 댓글이 없습니다.
    () => EMPTY,
  );
}
