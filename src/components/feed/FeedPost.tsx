"use client";

import Link from "next/link";
import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from "lucide-react";

import PostGallery from "@/components/post/PostGallery";
import Avatar from "@/components/Avatar";
import type { Post } from "@/data/posts";
import { usePostInteractions } from "@/hooks/usePostInteractions";

type FeedPostProps = {
  post: Post;
  isFirst?: boolean;
};

const actionClass =
  "grid size-8 cursor-pointer place-items-center rounded-md transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function FeedPost({ post, isFirst = false }: FeedPostProps) {
  const { liked, saved, toggleLike, toggleSave } =
    usePostInteractions(post.id);

  const postHref = `/posts/${post.id}`;
  const profileHref = `/${post.authorUsername}`;

  return (
    <article className="border-b border-neutral-200 pb-6">
      <header className="mb-3 flex items-center justify-between px-3 sm:px-0">
        <Link href={profileHref} className="flex min-w-0 items-center gap-3">
          <Avatar className="size-8" />
          <span className="truncate text-sm font-semibold">
            {post.authorUsername}
          </span>
        </Link>

        <Ellipsis aria-hidden="true" className="size-5" />
      </header>

      <PostGallery
        key={post.id}
        images={post.images}
        variant="feed"
        eager={isFirst}
      />

      <div className="px-3 sm:px-0">
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="좋아요"
            aria-pressed={liked}
            onClick={toggleLike}
            className={`${actionClass} ${liked ? "text-[#ff3040]" : ""}`}
          >
            <Heart
              aria-hidden="true"
              className="size-6"
              fill={liked ? "currentColor" : "none"}
            />
          </button>

          <Link
            href={postHref}
            scroll={false}
            aria-label="댓글 보기"
            className={actionClass}
          >
            <MessageCircle aria-hidden="true" className="size-6" />
          </Link>

          <span aria-hidden="true" className="grid size-8 place-items-center">
            <Send className="size-6" />
          </span>

          <button
            type="button"
            aria-label="게시물 저장"
            aria-pressed={saved}
            onClick={toggleSave}
            className={`${actionClass} ml-auto`}
          >
            <Bookmark
              aria-hidden="true"
              className="size-6"
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        </div>

        <p className="mt-2 text-sm font-semibold">
          좋아요 {(post.likeCount + Number(liked)).toLocaleString("ko-KR")}개
        </p>

        <p className="mt-2 text-sm whitespace-pre-wrap wrap-break-word">
          <Link href={profileHref} className="mr-2 font-semibold">
            {post.authorUsername}
          </Link>
          {post.caption}
        </p>

        <time
          dateTime={post.publishedAt}
          className="mt-1 block text-xs text-neutral-500"
        >
          {dateFormatter.format(new Date(post.publishedAt))}
        </time>
      </div>
    </article>
  );
}
