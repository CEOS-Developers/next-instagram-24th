"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import IconButton from "@/components/ui/IconButton";
import { formatDate, formatFullDate } from "@/lib/formatTime";
import { usePostLike } from "@/lib/likeStorage";
import type { Post } from "@/types/post";

export type PostActionsProps = {
  post: Post;
  /** 댓글 버튼을 누르면 포커스를 옮길 댓글 입력창의 id입니다. */
  commentInputId?: string;
};

export default function PostActions({ post, commentInputId }: PostActionsProps) {
  const { isLiked, likeCount, toggleLike } = usePostLike(post);
  // 저장은 UI만 구현합니다. 새로고침하면 초기화됩니다.
  const [isSaved, setIsSaved] = useState(false);

  function focusCommentInput() {
    if (commentInputId) document.getElementById(commentInputId)?.focus();
  }

  return (
    <div>
      <div className="-mx-2 flex items-center">
        <IconButton
          aria-label={isLiked ? "좋아요 취소" : "좋아요"}
          aria-pressed={isLiked}
          onClick={toggleLike}
          className="enabled:hover:bg-transparent enabled:active:scale-90"
        >
          <Icon
            name="heart"
            filled={isLiked}
            className={isLiked ? "text-like-active" : "hover:text-text-secondary"}
          />
        </IconButton>

        <IconButton
          aria-label="댓글 달기"
          onClick={focusCommentInput}
          className="enabled:hover:bg-transparent"
        >
          <Icon name="comment" className="hover:text-text-secondary" />
        </IconButton>

        <IconButton
          aria-label={isSaved ? "저장 취소" : "저장"}
          aria-pressed={isSaved}
          onClick={() => setIsSaved((value) => !value)}
          className="ml-auto enabled:hover:bg-transparent"
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className={isSaved ? "" : "hover:text-text-secondary"}
          >
            <path d="M19 21 12 15.5 5 21V3h14v18Z" />
          </svg>
        </IconButton>
      </div>

      <p className="mt-1 text-body font-semibold text-text-primary" aria-live="polite">
        좋아요 {likeCount.toLocaleString()}개
      </p>

      <time
        dateTime={post.createdAt}
        title={formatFullDate(post.createdAt)}
        className="mt-1 block text-caption text-text-secondary"
      >
        {formatDate(post.createdAt)}
      </time>
    </div>
  );
}
