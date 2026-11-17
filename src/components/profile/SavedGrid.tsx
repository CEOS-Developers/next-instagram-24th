"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { isPostSaved, subscribeToSaves } from "../post/PostSave";
import PostGridItem from "../post/PostGridItem";
import type { Post } from "@/types";

export type SavedCandidate = { post: Post; commentCount: number };
const PAGE_SIZE = 4;

export default function SavedGrid({ items }: { items: SavedCandidate[] }) {
  // 문자열 스냅샷은 저장 상태가 그대로면 같은 값이다.
  const snapshot = useSyncExternalStore(subscribeToSaves,
    () => items.map(({ post }) => isPostSaved(post.id) ? "1" : "0").join(""),
    () => "");
  const saved = items.filter((_, index) => snapshot[index] === "1");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const marker = useRef<HTMLButtonElement>(null);
  const hasMore = limit < saved.length;

  useEffect(() => {
    if (!hasMore || !marker.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        setLimit(limit + PAGE_SIZE);
      }
    }, { rootMargin: "100px" });
    observer.observe(marker.current);
    return () => observer.disconnect();
  }, [hasMore, limit]);

  if (!saved.length) return <p className="py-16 text-center font-semibold">저장된 게시물이 없습니다</p>;
  return <>
    <ul className="grid grid-cols-3 gap-px xl:grid-cols-4">
      {saved.slice(0, limit).map(({ post, commentCount }) => (
        <li key={post.id}><PostGridItem post={post} commentCount={commentCount} /></li>
      ))}
    </ul>
    {hasMore && <button ref={marker} onClick={() => setLimit(limit + PAGE_SIZE)} className="mx-auto block p-4">더 보기</button>}
  </>;
}
