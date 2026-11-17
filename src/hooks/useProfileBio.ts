"use client";

import { useSyncExternalStore } from "react";
import { currentUser } from "@/data/profiles";

export const MAX_BIO_LENGTH = 150;

const storageKey = `instagram:profile-bio:${currentUser.username}`;
const listeners = new Set<() => void>();

function getSnapshot() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function getServerSnapshot() {
  return null;
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

function readBio(snapshot: string | null, initialBio: string) {
  if (snapshot === null) return initialBio;

  try {
    const value: unknown = JSON.parse(snapshot);
    if (typeof value === "string" && value.length <= MAX_BIO_LENGTH) return value;
  } catch {
    // 잘못된 저장값 대신 기존 프로필의 소개글을 표시합니다.
  }

  return initialBio;
}

function saveBio(bio: string) {
  if (bio.length > MAX_BIO_LENGTH) return false;

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(bio));
  } catch {
    return false;
  }

  listeners.forEach((listener) => listener());
  return true;
}

export function useProfileBio(initialBio: string) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { bio: readBio(snapshot, initialBio), saveBio };
}
