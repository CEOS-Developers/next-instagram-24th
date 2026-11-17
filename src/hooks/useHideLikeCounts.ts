"use client";

import { useSyncExternalStore } from "react";
import { currentUser } from "@/data/profiles";

const storagePrefix = `instagram:hide-like-counts:${currentUser.username}:`;
const preferenceChangeEvent = "instagram:like-count-visibility-change";
const memoryPreferences = new Map<string, boolean>();

function getSnapshot(storageKey: string) {
  const memoryPreference = memoryPreferences.get(storageKey);
  if (memoryPreference !== undefined) return memoryPreference;

  try {
    return window.localStorage.getItem(storageKey) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

function subscribe(listener: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === null || event.key.startsWith(storagePrefix)) listener();
  }

  window.addEventListener(preferenceChangeEvent, listener);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(preferenceChangeEvent, listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function setPreference(storageKey: string, hide: boolean) {
  try {
    if (hide) {
      window.localStorage.setItem(storageKey, "true");
    } else {
      window.localStorage.removeItem(storageKey);
    }
    memoryPreferences.delete(storageKey);
  } catch {
    memoryPreferences.set(storageKey, hide);
  }

  window.dispatchEvent(new Event(preferenceChangeEvent));
}

export function useHideLikeCounts(postId: string) {
  const storageKey = storagePrefix + postId;
  const hideLikeCounts = useSyncExternalStore(
    subscribe,
    () => getSnapshot(storageKey),
    getServerSnapshot,
  );

  return {
    hideLikeCounts,
    setHideLikeCounts: (hide: boolean) => setPreference(storageKey, hide),
  };
}
