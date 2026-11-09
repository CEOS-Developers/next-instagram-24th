"use client";

import { useSyncExternalStore } from "react";
import { currentUser } from "@/data/profiles";

type PostAction = "liked" | "saved";

const storageKey = `instagram:post-interactions:${currentUser.username}`;
const emptySnapshot = "{}";
const listeners = new Set<() => void>();
let fallbackSnapshot: string | undefined;

function getSnapshot() {
  if (fallbackSnapshot !== undefined) return fallbackSnapshot;

  try {
    return window.localStorage.getItem(storageKey) ?? emptySnapshot;
  } catch {
    return emptySnapshot;
  }
}

function getServerSnapshot() {
  return emptySnapshot;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readInteractions(snapshot: string): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(snapshot);
    return isRecord(value) ? value : {};
  } catch {
    return {};
  }
}

function getPostInteraction(interactions: Record<string, unknown>, postId: string) {
  const value = Object.hasOwn(interactions, postId) ? interactions[postId] : undefined;
  return isRecord(value) ? value : {};
}

function toggleAction(postId: string, action: PostAction) {
  const interactions = readInteractions(getSnapshot());
  const previous = getPostInteraction(interactions, postId);
  const snapshot = JSON.stringify({
    ...interactions,
    [postId]: { ...previous, [action]: previous[action] !== true },
  });

  try {
    window.localStorage.setItem(storageKey, snapshot);
    fallbackSnapshot = undefined;
  } catch {
    fallbackSnapshot = snapshot;
  }

  listeners.forEach((listener) => listener());
}

export function usePostInteractions(postId: string) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const post = getPostInteraction(readInteractions(snapshot), postId);

  return {
    liked: post.liked === true,
    saved: post.saved === true,
    toggleLike: () => toggleAction(postId, "liked"),
    toggleSave: () => toggleAction(postId, "saved"),
  };
}
