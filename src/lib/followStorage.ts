const STORAGE_PREFIX = "instagram:follow:";
const CHANGE_EVENT = "instagram:follow-change";

// 브라우저가 저장을 거부하면 현재 탭에서만 변경 상태를 유지합니다.
const unsavedFollowing = new Map<string, boolean>();

export function getFollowState(userId: string, initialValue: boolean): boolean {
  if (typeof window === "undefined") return initialValue;

  const key = `${STORAGE_PREFIX}${userId}`;
  const unsavedValue = unsavedFollowing.get(key);

  if (unsavedValue !== undefined) return unsavedValue;

  try {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue === "true") return true;
    if (storedValue === "false") return false;
  } catch {
    // 저장소를 읽을 수 없으면 목데이터의 초기 상태를 사용합니다.
  }

  return initialValue;
}

export function setFollowState(userId: string, isFollowing: boolean): void {
  if (typeof window === "undefined") return;

  const key = `${STORAGE_PREFIX}${userId}`;

  try {
    window.localStorage.setItem(key, String(isFollowing));
    unsavedFollowing.delete(key);
  } catch {
    unsavedFollowing.set(key, isFollowing);
  }

  // storage 이벤트는 다른 탭에서만 발생하므로 현재 탭에도 변경을 알립니다.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeFollowState(onChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key !== null && !event.key.startsWith(STORAGE_PREFIX)) return;

    if (event.key === null) {
      unsavedFollowing.clear();
    } else {
      unsavedFollowing.delete(event.key);
    }

    onChange();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}
