import { useCallback, useSyncExternalStore } from "react";
import { defaultUsername } from "./profile";

const changeEvents = {
  like: "next-instagram:like-change",
  bookmark: "next-instagram:bookmark-change",
};

type PostAction = keyof typeof changeEvents;

const inMemoryActions = new Map<string, boolean>();

function getStorageKey(action: PostAction, postId: string) {
  return `next-instagram:${defaultUsername}:${action}:${postId}`;
}

function readAction(key: string) {
  const inMemory = inMemoryActions.get(key);
  if (inMemory !== undefined) return inMemory;

  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function subscribeToAction(action: PostAction, onChange: () => void) {
  const changeEvent = changeEvents[action];
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function usePostAction(action: PostAction, postId: string) {
  const storageKey = getStorageKey(action, postId);
  const subscribe = useCallback(
    (onChange: () => void) => subscribeToAction(action, onChange),
    [action],
  );

  const isActive = useSyncExternalStore(
    subscribe,
    () => readAction(storageKey),
    () => false,
  );

  function toggle() {
    const nextValue = !readAction(storageKey);
    try {
      window.localStorage.setItem(storageKey, nextValue ? "1" : "0");
      inMemoryActions.delete(storageKey);
    } catch {
      inMemoryActions.set(storageKey, nextValue);
    }
    window.dispatchEvent(new Event(changeEvents[action]));
  }

  return [isActive, toggle] as const;
}

function subscribeToBookmarks(onChange: () => void) {
  return subscribeToAction("bookmark", onChange);
}

export function useBookmarkedPostIds(postIds: string[]) {
  const snapshot = useSyncExternalStore(
    subscribeToBookmarks,
    () => JSON.stringify(postIds.filter((id) => readAction(getStorageKey("bookmark", id)))),
    () => "[]",
  );
  return new Set<string>(JSON.parse(snapshot));
}
