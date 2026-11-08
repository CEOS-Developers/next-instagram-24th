"use client";

import { useMemo, useSyncExternalStore } from "react";
import { currentUser } from "@/data/profiles";

export type PostComment = {
  id: string;
  username: string;
  text: string;
};

type PostInteraction = {
  liked: boolean;
  saved: boolean;
  comments: PostComment[];
};

type PostInteractions = Record<string, PostInteraction>;

const storageKey = `instagram:post-interactions:${currentUser.username}`;
const initialSnapshot = "{}";
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isComment(value: unknown): value is PostComment {
  return isRecord(value) && typeof value.id === "string" &&
    typeof value.username === "string" && typeof value.text === "string" &&
    value.text.trim().length > 0 && value.text.length <= 2200;
}

function readInteractions(snapshot: string): PostInteractions {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (isRecord(value)) {
      const result: PostInteractions = {};
      for (const [id, interaction] of Object.entries(value)) {
        if (!/^\d+$/.test(id) || !isRecord(interaction)) continue;
        result[id] = {
          liked: interaction.liked === true,
          saved: interaction.saved === true,
          comments: Array.isArray(interaction.comments)
            ? interaction.comments.filter(isComment) : [],
        };
      }
      return result;
    }
  } catch {
    // 손상된 저장 데이터는 비어 있는 초기 상태로 처리합니다.
  }
  return {};
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

function updatePost(id: string, update: (value: PostInteraction) => PostInteraction) {
  if (!/^\d+$/.test(id)) return;
  const interactions = readInteractions(getSnapshot());
  const previous = interactions[id] ?? { liked: false, saved: false, comments: [] };
  interactions[id] = update(previous);
  memorySnapshot = JSON.stringify(interactions);
  try {
    window.localStorage.setItem(storageKey, memorySnapshot);
  } catch {
    // 저장이 제한되어도 현재 열린 앱에서는 계속 사용할 수 있습니다.
    storageUnavailable = true;
  }
  listeners.forEach((listener) => listener());
}

function toggleLike(id: string) {
  updatePost(id, (value) => ({ ...value, liked: !value.liked }));
}

function toggleSave(id: string) {
  updatePost(id, (value) => ({ ...value, saved: !value.saved }));
}

function addComment(id: string, text: string) {
  const trimmedText = text.trim();
  if (!trimmedText || trimmedText.length > 2200) return false;
  const comment: PostComment = {
    id: crypto.randomUUID(),
    username: currentUser.username,
    text: trimmedText,
  };
  updatePost(id, (value) => ({ ...value, comments: [...value.comments, comment] }));
  return true;
}

export function usePostInteractions() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const interactions = useMemo(() => readInteractions(snapshot), [snapshot]);
  return { interactions, toggleLike, toggleSave, addComment };
}
