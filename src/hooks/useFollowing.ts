"use client";

import { useSyncExternalStore } from "react";
import { currentUser, profiles } from "@/data/profiles";

const storageKey = `instagram:following:${currentUser.username}`;
const initialSnapshot = JSON.stringify(currentUser.followingUsernames);
const followableUsernames = new Set(
  profiles.filter((profile) => profile.username !== currentUser.username)
    .map((profile) => profile.username),
);
const listeners = new Set<() => void>();
let memorySnapshot = initialSnapshot;
let storageUnavailable = false;

function getSnapshot() {
  if (storageUnavailable) return memorySnapshot;

  try {
    return window.localStorage.getItem(storageKey) ?? initialSnapshot;
  } catch {
    return memorySnapshot;
  }
}

function getServerSnapshot() {
  return initialSnapshot;
}

function readFollowing(snapshot: string): string[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (Array.isArray(value)) {
      return [...new Set(value.filter(
        (username): username is string =>
          typeof username === "string" && followableUsernames.has(username),
      ))];
    }
  } catch {
    // 저장된 값이 잘못되었으면 목 데이터의 초기 상태로 돌아갑니다.
  }

  return currentUser.followingUsernames;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) listener();
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function toggleFollow(username: string) {
  if (!followableUsernames.has(username)) return;

  const following = readFollowing(getSnapshot());
  const nextFollowing = following.includes(username)
    ? following.filter((name) => name !== username)
    : [...following, username];
  memorySnapshot = JSON.stringify(nextFollowing);

  try {
    window.localStorage.setItem(storageKey, memorySnapshot);
  } catch {
    // 브라우저가 저장을 막아도 현재 화면에서는 전환할 수 있습니다.
    storageUnavailable = true;
  }

  listeners.forEach((listener) => listener());
}

export function useFollowing() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    followingUsernames: readFollowing(snapshot),
    toggleFollow,
  };
}
