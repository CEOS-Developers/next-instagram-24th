import { defaultUsername } from "@/app/_lib/profile";
import { profiles } from "@/data/profiles";
import { useSyncExternalStore } from "react";

const storagePrefix = `next-instagram:${defaultUsername}:follow:`;
const changeEvent = "next-instagram:follow-change";
const followableUsernames = profiles
  .map(({ username }) => username)
  .filter((username) => username !== defaultUsername);
const inMemoryFollows = new Map<string, boolean>();

function isFollowed(username: string) {
  const pending = inMemoryFollows.get(username);
  if (pending !== undefined) return pending;

  try {
    return window.localStorage.getItem(`${storagePrefix}${username}`) === "1";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot() {
  return followableUsernames.filter(isFollowed).join(",");
}

function getServerSnapshot() {
  return "";
}

export function useFollowedUsernames() {
  const storedUsernames = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return storedUsernames ? storedUsernames.split(",") : [];
}

export function toggleFollow(username: string) {
  if (username === defaultUsername) return;

  const nextValue = !isFollowed(username);
  try {
    const key = `${storagePrefix}${username}`;
    if (nextValue) {
      window.localStorage.setItem(key, "1");
    } else {
      window.localStorage.removeItem(key);
    }
    inMemoryFollows.delete(username);
  } catch {
    inMemoryFollows.set(username, nextValue);
  }
  window.dispatchEvent(new Event(changeEvent));
}
