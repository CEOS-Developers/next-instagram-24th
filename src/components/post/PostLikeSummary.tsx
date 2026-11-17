"use client";

import { useHideLikeCounts } from "@/hooks/useHideLikeCounts";

type PostLikeSummaryProps = {
  postId: string;
  likeCount: number;
  className?: string;
};

export default function PostLikeSummary({ postId, likeCount, className }: PostLikeSummaryProps) {
  const { hideLikeCounts } = useHideLikeCounts(postId);

  if (!hideLikeCounts) {
    return <p className={className}>좋아요 {likeCount.toLocaleString("ko-KR")}개</p>;
  }

  if (likeCount < 2) return null;

  return <p className={className}>여러 명이 좋아합니다</p>;
}
