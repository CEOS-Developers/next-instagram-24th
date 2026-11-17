"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FeedPost from "@/components/feed/FeedPost";
import FeedPostSkeleton from "@/components/feed/FeedPostSkeleton";
import { fetchFeedPage, type FeedPage } from "@/data/feed";

export default function FeedList({ initialPage }: { initialPage: FeedPage }) {
  const [feed, setFeed] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const nextCursorRef = useRef(initialPage.nextCursor);

  const loadMore = useCallback(async () => {
    const cursor = nextCursorRef.current;
    if (cursor === null || requestRef.current) return;

    const request = new AbortController();
    requestRef.current = request;
    setIsLoading(true);
    setError("");

    try {
      const page = await fetchFeedPage(cursor, { signal: request.signal });
      if (request.signal.aborted) return;

      nextCursorRef.current = page.nextCursor;
      setFeed((previous) => ({
        items: [...previous.items, ...page.items],
        nextCursor: page.nextCursor,
      }));
    } catch {
      if (!request.signal.aborted) {
        setError("게시물을 불러오지 못했어요. 다시 시도해주세요.");
      }
    } finally {
      if (requestRef.current === request) {
        requestRef.current = null;
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    return () => requestRef.current?.abort();
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (
      !sentinel || feed.nextCursor === null || isLoading || error ||
      typeof IntersectionObserver === "undefined"
    ) return;

    let active = true;
    const observer = new IntersectionObserver((entries) => {
      if (active && entries.some((entry) => entry.isIntersecting)) {
        void loadMore();
      }
    }, { rootMargin: "300px 0px" });

    observer.observe(sentinel);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [feed.nextCursor, isLoading, error, loadMore]);

  return (
    <div className="space-y-8" aria-busy={isLoading}>
      {feed.items.map((post, index) => (
        <FeedPost key={post.id} post={post} isFirst={index === 0} />
      ))}

      {isLoading && (
        <div role="status">
          <span className="sr-only">게시물을 더 불러오는 중입니다.</span>
          <FeedPostSkeleton />
        </div>
      )}

      <div ref={sentinelRef} aria-hidden="true" className="h-px" />

      <div className="space-y-3 pb-4 text-center text-sm text-neutral-500">
        {error && <p role="alert">{error}</p>}
        {feed.nextCursor !== null ? (
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={isLoading}
            className="min-h-10 cursor-pointer rounded-xl bg-neutral-100 px-5 py-2 font-semibold text-neutral-800 hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:opacity-50"
          >
            {error ? "다시 시도" : isLoading ? "불러오는 중..." : "게시물 더 보기"}
          </button>
        ) : (
          <p role="status">{feed.items.length === 0 ? "아직 게시물이 없습니다." : "모든 게시물을 확인했어요."}</p>
        )}
      </div>
    </div>
  );
}
