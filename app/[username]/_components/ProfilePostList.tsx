"use client";

import { useEffect, useRef, useState } from "react";
import PostGrid from "@/components/PostGrid";
import PostGridSkeleton from "@/components/PostGridSkeleton";
import type { ProfilePostPage } from "@/types/post";

type ProfilePostListProps = {
  username: string;
  initialPage: ProfilePostPage;
};

export default function ProfilePostList({ username, initialPage }: ProfilePostListProps) {
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
          const response = await fetch(
            `/api/profile-posts?username=${encodeURIComponent(username)}&offset=${nextOffset}`,
          );
          if (!response.ok) throw new Error();
          const page: ProfilePostPage = await response.json();
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
  }, [username, nextOffset, loading, error]);

  return (
    <>
      <PostGrid posts={posts} />

      {loading && (
        <div role="status" aria-label="게시물 불러오는 중">
          <PostGridSkeleton />
        </div>
      )}
      {error && (
        <p className="py-6 text-center text-sm text-[#a8a8a8]">
          게시물을 불러오지 못했어요.
        </p>
      )}

      {nextOffset !== null && <div ref={bottomRef} className="h-1" />}
    </>
  );
}