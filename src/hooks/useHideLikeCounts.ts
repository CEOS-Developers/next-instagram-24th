"use client";

import { useSyncExternalStore } from "react";
import { currentUser } from "@/data/profiles";

const storageKey = `instagram:hide-like-counts:${currentUser.username}`;
const listeners = new Set<() => void>();
let memoryPreference: boolean | undefined;

function getSnapshot() {
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
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === null) listener();
  }

  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function setHideLikeCounts(hide: boolean) {
  try {
    window.localStorage.setItem(storageKey, String(hide));
    memoryPreference = undefined;
  } catch {
    memoryPreference = hide;
  }

  listeners.forEach((listener) => listener());
}

export function useHideLikeCounts() {
  const hideLikeCounts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { hideLikeCounts, setHideLikeCounts };
}
