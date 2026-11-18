"use client";

import { useEffect, useRef } from "react";

export type UseInfiniteScrollOptions = {
  /** 다음 페이지를 불러오는 함수입니다. useCallback으로 고정해 전달합니다. */
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  rootMargin?: string;
};

export default function useInfiniteScroll({
  onLoadMore,
  isLoading,
  hasMore,
  rootMargin = "0px 0px 200px 0px",
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = sentinelRef.current;

    if (!target || isLoading || !hasMore) return;

    let requested = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || requested) return;

        // 로딩 상태가 반영되기 전에도 같은 관찰에서 중복 호출하지 않습니다.
        requested = true;
        observer.disconnect();
        onLoadMore();
      },
      { root: null, rootMargin, threshold: 0 },
    );

    observer.observe(target);

    // 로딩이 끝나면 다시 관찰하고, 해제 후 대기 중인 콜백도 무시합니다.
    return () => {
      requested = true;
      observer.disconnect();
    };
  }, [onLoadMore, isLoading, hasMore, rootMargin]);

  return sentinelRef;
}
