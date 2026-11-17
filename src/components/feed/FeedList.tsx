"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import FeedPostCard from "./FeedPostCard";
import FeedPostSkeleton from "./FeedPostSkeleton";

export type FeedItem = {
  post: Post;
  author: User;
  commentCount: number;
};

const PAGE_SIZE = 3;
// shortcut: 목데이터는 바로 준비돼서 스켈레톤이 보이도록 일부러 기다립니다. 실제 API를 붙이면 지웁니다.
const FAKE_DELAY_MS = 800;

export default function FeedList({ items }: { items: FeedItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const loadTimerRef = useRef<number | null>(null);
  const hasMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore || loadTimerRef.current !== null) return;

    setIsLoading(true);
    loadTimerRef.current = window.setTimeout(() => {
      loadTimerRef.current = null;
      setVisibleCount((count) => count + PAGE_SIZE);
      setIsLoading(false);
    }, FAKE_DELAY_MS);
  }, [isLoading, hasMore]);

  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMore,
    isLoading,
    hasMore,
  });

  useEffect(() => {
    return () => {
      if (loadTimerRef.current !== null) {
        window.clearTimeout(loadTimerRef.current);
        loadTimerRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <ul className="flex flex-col gap-4">
        {items.slice(0, visibleCount).map((item) => (
          <li key={item.post.id}>
            <FeedPostCard {...item} />
          </li>
        ))}
      </ul>

      <div role="status" className="mt-4">
        {isLoading && (
          <>
            <span className="sr-only">게시물을 불러오는 중이에요.</span>
            <FeedPostSkeleton />
          </>
        )}
      </div>

      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      {!hasMore && (
        <p className="py-8 text-center text-body text-text-secondary">
          모든 게시물을 확인했어요
        </p>
      )}
    </>
  );
}
