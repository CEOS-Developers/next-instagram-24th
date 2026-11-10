"use client";

import Icon from "@/components/ui/Icon";
import { usePostLike } from "@/lib/likeStorage";
import type { Post } from "@/types/post";

export type PostThumbnailStatsProps = {
  post: Post;
  commentCount: number;
};

/** 썸네일 호버 시 보이는 좋아요·댓글 수입니다. 좋아요는 상세에서 누른 상태를 반영합니다. */
export default function PostThumbnailStats({ post, commentCount }: PostThumbnailStatsProps) {
  const { likeCount } = usePostLike(post);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center gap-7 bg-black/30 text-body font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <span className="flex items-center gap-1.5">
        <Icon name="heart" size={20} filled />
        {likeCount.toLocaleString()}
      </span>
      <span className="flex items-center gap-1.5">
        <Icon name="comment" size={20} className="fill-current" />
        {commentCount.toLocaleString()}
      </span>
    </div>
  );
}
