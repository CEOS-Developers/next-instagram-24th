"use client";

import { useEffect, useRef, useState } from "react";
import PostCard from "@/components/PostCard";
import type { FeedPage } from "@/types/post";

type FeedListProps = {
  initialPage: FeedPage;
};

export default function FeedList({ initialPage }: FeedListProps) {
  const [posts, setPosts] = useState(initialPage.posts);
  const [nextOffset, setNextOffset] = useState(initialPage.nextOffset);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bottom = bottomRef.current;
    if (!bottom || nextOffset === null || loading || error) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setLoading(true);
        try {
          const response = await fetch(`/api/feed?offset=${nextOffset}`);
          if (!response.ok) throw new Error();
          const page: FeedPage = await response.json();
          setPosts((prev) => [...prev, ...page.posts]);
          setNextOffset(page.nextOffset);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(bottom);
    return () => observer.disconnect();
  }, [nextOffset, loading, error]);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {loading && <p className="py-6 text-center text-sm text-[#a8a8a8]">불러오는 중…</p>}
      {error && <p className="py-6 text-center text-sm text-[#a8a8a8]">게시물을 불러오지 못했어요.</p>}

      {/* 바닥 표시: 이게 화면에 들어오면 다음 페이지를 불러옴 */}
      {nextOffset !== null && <div ref={bottomRef} className="h-1" />}
    </>
  );
}