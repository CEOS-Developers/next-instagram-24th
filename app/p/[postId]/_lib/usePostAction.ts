import { useCallback, useSyncExternalStore } from "react";
import { defaultUsername } from "@/app/_lib/profile";

const inMemoryActions = new Map<string, boolean>();

function readAction(key: string) {
  const inMemory = inMemoryActions.get(key);
  if (inMemory !== undefined) return inMemory;

  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function usePostAction(action: "like" | "bookmark", postId: string) {
  const storageKey = `next-instagram:${defaultUsername}:${action}:${postId}`;
  const changeEvent = `next-instagram:${action}-change`;
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener(changeEvent, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(changeEvent, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [changeEvent]);

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
    window.dispatchEvent(new Event(changeEvent));
  }

  return [isActive, toggle] as const;
}
