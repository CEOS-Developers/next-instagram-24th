"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { getFeedPage } from "@/lib/data";
import PostCard from "./PostCard";

type Page = ReturnType<typeof getFeedPage>;

export default function HomeFeed({ initial }: { initial: Page }) {
  const [feed, setFeed] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const marker = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    if (feed.next === null || request.current) return;
    const controller = new AbortController();
    request.current = controller;
    setStatus("loading");
    try {
      const [response] = await Promise.all([
        fetch("/api/feed?offset=" + feed.next, { signal: controller.signal }),
        new Promise(resolve => setTimeout(resolve, 300)),
      ]);
      if (!response.ok) throw new Error();
      const page: Page = await response.json();
      if (controller.signal.aborted) return;
      setFeed(prev => ({ items: [...prev.items, ...page.items], next: page.next }));
      setStatus("idle");
    } catch {
      if (!controller.signal.aborted) setStatus("error");
    } finally {
      if (request.current === controller) request.current = null;
    }
  }, [feed.next]);

  useEffect(() => () => { request.current?.abort(); request.current = null; }, []);
  useEffect(() => {
    if (!marker.current || status !== "idle" || feed.next === null || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void load();
    }, { rootMargin: "100px" });
    observer.observe(marker.current);
    return () => observer.disconnect();
  }, [feed.next, load, status]);

  return (
    <div className="mx-auto flex max-w-[680px] flex-col gap-4 px-4 py-6 md:px-0 md:py-8">
      {feed.items.map(({ post, commentCount }, index) => (
        <PostCard key={`${index}-${post.id}`} post={post} commentCount={commentCount} preload={index === 0} />
      ))}
      <div ref={marker} className="py-5 text-center text-sm text-neutral-500">
        <span role="status">
          {status === "loading" && <><span aria-hidden className="mr-2 inline-block size-4 rounded-full border-2 border-neutral-200 border-t-neutral-600 align-middle motion-safe:animate-spin" />게시물 불러오는 중…</>}
          {status === "error" && "게시물을 불러오지 못했어요. "}
          {feed.next === null && "아직 게시물이 없어요."}
        </span>
        {feed.next !== null && status !== "loading" && (
          <button onClick={load} className="underline">{status === "error" ? "다시 시도" : "더 보기"}</button>
        )}
      </div>
    </div>
  );
}
