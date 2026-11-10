"use client";

import Icon from "@/components/ui/Icon";
import { useAddedComments } from "@/lib/commentStorage";
import { usePostLike } from "@/lib/likeStorage";
import type { Post } from "@/types/post";

export type PostThumbnailStatsProps = {
  post: Post;
  /** 목업 데이터의 댓글 수입니다. 내가 작성한 댓글 수는 여기에 더해집니다. */
  commentCount: number;
};

/** 썸네일 호버 시 보이는 좋아요·댓글 수입니다. 상세에서 누른 좋아요와 작성한 댓글을 반영합니다. */
export default function PostThumbnailStats({ post, commentCount }: PostThumbnailStatsProps) {
  const { likeCount } = usePostLike(post);
  const totalCommentCount = commentCount + useAddedComments(post.id).length;

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
        {totalCommentCount.toLocaleString()}
      </span>
    </div>
  );
}
