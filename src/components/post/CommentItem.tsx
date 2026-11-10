"use client";

import { useState, type Ref } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Icon from "@/components/ui/Icon";
import type { CommentWithAuthor } from "@/lib/posts";
import RelativeTime from "./RelativeTime";

export type CommentItemProps = CommentWithAuthor & {
  ref?: Ref<HTMLLIElement>;
  /** false면 아바타와 이름에 프로필 링크를 걸지 않습니다. */
  linkToProfile?: boolean;
};

export default function CommentItem({
  ref,
  comment,
  author,
  linkToProfile = true,
}: CommentItemProps) {
  const profileHref = `/${encodeURIComponent(author.username)}`;
  // 댓글 좋아요는 UI만 구현합니다. 새로고침하면 초기화됩니다.
  const [isLiked, setIsLiked] = useState(false);

  return (
    <li ref={ref} className="flex gap-3">
      {linkToProfile ? (
        <Link href={profileHref} tabIndex={-1} aria-hidden="true" className="shrink-0">
          <Avatar src={author.avatarUrl} alt="" size="sm" />
        </Link>
      ) : (
        <Avatar src={author.avatarUrl} alt="" size="sm" />
      )}

      <div className="min-w-0 flex-1 pt-1.5">
        <p className="whitespace-pre-wrap wrap-anywhere text-body text-text-primary">
          {linkToProfile ? (
            <Link
              href={profileHref}
              className="mr-1 font-semibold hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {author.username}
            </Link>
          ) : (
            <span className="mr-1 font-semibold">{author.username}</span>
          )}
          {comment.content}
        </p>

        <div className="mt-2 flex items-center gap-3 text-caption text-text-secondary">
          <RelativeTime dateTime={comment.createdAt} />
          {isLiked && <span className="font-semibold">좋아요 1개</span>}
          {/* 답글은 UI만 구현합니다. */}
          <button type="button" className="cursor-pointer font-semibold hover:text-text-primary">
            답글 달기
          </button>
        </div>
      </div>

      <button
        type="button"
        aria-label={isLiked ? "댓글 좋아요 취소" : "댓글 좋아요"}
        aria-pressed={isLiked}
        onClick={() => setIsLiked((value) => !value)}
        className="mt-2 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center self-start focus-visible:outline-2 focus-visible:outline-brand"
      >
        <Icon
          name="heart"
          size={12}
          filled={isLiked}
          className={isLiked ? "text-like-active" : "text-text-primary hover:text-text-secondary"}
        />
      </button>
    </li>
  );
}
