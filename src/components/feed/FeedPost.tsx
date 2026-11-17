"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from "lucide-react";

import PostGallery from "@/components/post/PostGallery";
import Avatar from "@/components/Avatar";
import FeedPostSkeleton from "@/components/feed/FeedPostSkeleton";
import type { Post } from "@/data/posts";
import PostLikeSummary from "@/components/post/PostLikeSummary";
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

  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const isLoading = post.images.length > 0 && !isFirstImageLoaded;

  const postHref = `/posts/${post.id}`;
  const profileHref = `/${post.authorUsername}`;

  return (
    <div className="relative" aria-busy={isLoading}>
      <article className={`border-b border-neutral-200 pb-6${isLoading ? " invisible" : ""}`}>
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
          postId={post.id}
          images={post.images}
          variant="feed"
          eager={isFirst}
          onFirstImageSettled={() => setIsFirstImageLoaded(true)}
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

          <PostLikeSummary
            postId={post.id}
            likeCount={post.likeCount + Number(liked)}
            className="mt-2 text-sm font-semibold"
          />

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
      {isLoading && (
        <div className="absolute inset-x-0 top-0">
          <FeedPostSkeleton />
        </div>
      )}
    </div>
  );
}
