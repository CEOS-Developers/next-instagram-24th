import { posts, type Post } from "@/data/posts";
import { currentUser } from "@/data/profiles";

export const FEED_PAGE_SIZE = 3;

export type FeedPage = {
  items: Post[];
  nextCursor: number | null;
};

export function getFeedPage(cursor = 0): FeedPage {
  if (!Number.isInteger(cursor) || cursor < 0) {
    throw new RangeError("피드 위치는 0 이상의 정수여야 합니다.");
  }

  const feedPosts = posts
    .filter((post) => post.authorUsername !== currentUser.username)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const end = cursor + FEED_PAGE_SIZE;

  return {
    items: feedPosts.slice(cursor, end),
    nextCursor: end < feedPosts.length ? end : null,
  };
}

export async function fetchFeedPage(
  cursor: number,
  { signal }: { signal?: AbortSignal } = {},
): Promise<FeedPage> {
  // 백엔드 없이도 추가 페이지의 로딩 상태를 확인할 수 있도록 요청을 모의합니다.
  await new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("피드 요청이 취소되었습니다.", "AbortError"));
      return;
    }

    const timeout = setTimeout(() => {
      signal?.removeEventListener("abort", handleAbort);
      resolve();
    }, 400);

    function handleAbort() {
      clearTimeout(timeout);
      reject(new DOMException("피드 요청이 취소되었습니다.", "AbortError"));
    }

    signal?.addEventListener("abort", handleAbort, { once: true });
  });

  signal?.throwIfAborted();
  return getFeedPage(cursor);
}
