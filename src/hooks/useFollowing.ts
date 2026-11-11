'use client';

import { useMemo, useSyncExternalStore } from 'react';

/*
 * 내가 팔로우한 사용자 id 목록을 localStorage에 저장한다.
 * useSavedPosts와 같은 방식이라, 새로고침해도 유지되고
 * 피드·프로필 등 같은 화면의 다른 컴포넌트에도 바로 반영된다.
 */
const changeEvent = 'instagram:following-change';
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

/** viewerId: 지금 로그인한 사용자 id */
export default function useFollowing(viewerId: string) {
  const key = `instagram:following:${viewerId}`;
  const raw = useSyncExternalStore(
    subscribe,
    () => readSnapshot(key),
    () => null
  );
  const followingIds = useMemo(() => parseIds(raw), [raw]);

  const isFollowing = (userId: string) => followingIds.includes(userId);

  const toggleFollow = (userId: string) => {
    const previous = parseIds(readSnapshot(key));
    const next = previous.includes(userId)
      ? previous.filter((id) => id !== userId)
      : [...previous, userId];
    const serialized = JSON.stringify(next);
    try {
      window.localStorage.setItem(key, serialized);
      fallbackStorage.delete(key);
    } catch {
      fallbackStorage.set(key, serialized);
    }
    window.dispatchEvent(new Event(changeEvent));
  };

  return { followingIds, isFollowing, toggleFollow, isLoaded: raw !== null };
}
