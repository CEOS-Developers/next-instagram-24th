"use client";

import Link from "next/link";
import { useState } from "react";
import PostAuthorHeader from "@/components/post/PostAuthorHeader";
import PostImageCarousel from "@/components/post/PostImageCarousel";
import Icon from "@/components/ui/Icon";
import IconButton from "@/components/ui/IconButton";
import { useAddedComments } from "@/lib/commentStorage";
import { usePostLike } from "@/lib/likeStorage";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";

export type FeedPostCardProps = {
  post: Post;
  author: User;
  /** 목업 데이터의 댓글 수입니다. 내가 작성한 댓글 수는 여기에 더해집니다. */
  commentCount: number;
};

const CAPTION_PREVIEW_LENGTH = 40;

const linkFocusClassName =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function FeedPostCard({ post, author, commentCount }: FeedPostCardProps) {
  const { isLiked, likeCount, toggleLike } = usePostLike(post);
  const totalCommentCount = commentCount + useAddedComments(post.id).length;
  // 저장은 상세 화면과 같이 UI만 구현합니다.
  const [isSaved, setIsSaved] = useState(false);
  const [isCaptionOpen, setIsCaptionOpen] = useState(false);

  const profileHref = `/${encodeURIComponent(author.username)}`;
  const postHref = `${profileHref}/post/${post.id}`;
  const isCaptionFolded = !isCaptionOpen && post.caption.length > CAPTION_PREVIEW_LENGTH;

  return (
    <article aria-label={`${author.username}님의 게시물`} className="border-b border-border pb-5">
      <header className="flex h-[54px] items-center">
        <PostAuthorHeader author={author} createdAt={post.createdAt} />
      </header>

      <PostImageCarousel
        images={[{ url: post.imageUrl, alt: post.imageAlt }, ...(post.extraImages ?? [])]}
        sizes="470px"
        className="aspect-square rounded-sm border border-border"
      />

      <div className="-mx-2 mt-1 flex items-center">
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

        <Link
          href={postHref}
          aria-label={`댓글 ${totalCommentCount}개 보기`}
          className={`flex h-10 items-center gap-1 rounded-button px-2 text-body font-semibold text-text-primary hover:text-text-secondary ${linkFocusClassName}`}
        >
          <Icon name="comment" />
          {totalCommentCount > 0 && <span aria-hidden="true">{totalCommentCount}</span>}
        </Link>

        {/* 공유는 UI만 구현합니다. */}
        <IconButton aria-label="공유하기" className="enabled:hover:bg-transparent">
          <Icon name="share" className="hover:text-text-secondary" />
        </IconButton>

        <IconButton
          aria-label={isSaved ? "저장 취소" : "저장"}
          aria-pressed={isSaved}
          onClick={() => setIsSaved((value) => !value)}
          className="ml-auto enabled:hover:bg-transparent"
        >
          <Icon
            name="save"
            filled={isSaved}
            className={isSaved ? "" : "hover:text-text-secondary"}
          />
        </IconButton>
      </div>

      <p className="text-body font-semibold text-text-primary" aria-live="polite">
        좋아요 {likeCount.toLocaleString()}개
      </p>

      <p className="mt-1 whitespace-pre-wrap wrap-anywhere text-body text-text-primary">
        <Link
          href={profileHref}
          className={`mr-1 font-semibold hover:text-text-secondary ${linkFocusClassName}`}
        >
          {author.username}
        </Link>
        {isCaptionFolded ? `${post.caption.slice(0, CAPTION_PREVIEW_LENGTH)}...` : post.caption}
        {isCaptionFolded && (
          <button
            type="button"
            onClick={() => setIsCaptionOpen(true)}
            className={`ml-1 cursor-pointer text-text-secondary ${linkFocusClassName}`}
          >
            더 보기
          </button>
        )}
      </p>

      {totalCommentCount > 0 && (
        <Link
          href={postHref}
          className={`mt-1 inline-block text-body text-text-secondary ${linkFocusClassName}`}
        >
          댓글 {totalCommentCount}개 모두 보기
        </Link>
      )}
    </article>
  );
}
