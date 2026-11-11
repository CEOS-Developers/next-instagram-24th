'use client';

import { useMemo, useSyncExternalStore } from 'react';

const changeEvent = 'instagram:saved-posts-change';
const fallbackStorage = new Map<string, string>();

function readSnapshot(key: string) {
  try {
    return fallbackStorage.get(key) ?? window.localStorage.getItem(key) ?? '[]';
  } catch {
    return fallbackStorage.get(key) ?? '[]';
  }
}

function parseIds(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === 'string'))]
      : [];
  } catch {
    return [];
  }
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(changeEvent, callback);
  };
}

export default function useSavedPosts(userId: string) {
  const key = `instagram:saved-posts:${userId}`;
  const raw = useSyncExternalStore(
    subscribe,
    () => readSnapshot(key),
    () => null
  );
  const savedPostIds = useMemo(() => parseIds(raw), [raw]);

  const toggleSavedPost = (postId: string) => {
    const previous = parseIds(readSnapshot(key));
    const next = previous.includes(postId)
      ? previous.filter((id) => id !== postId)
      : [...previous, postId];
    const serialized = JSON.stringify(next);
    try {
      window.localStorage.setItem(key, serialized);
      fallbackStorage.delete(key);
    } catch {
      fallbackStorage.set(key, serialized);
    }
    window.dispatchEvent(new Event(changeEvent));
  };

  return { savedPostIds, toggleSavedPost, isLoaded: raw !== null };
}
