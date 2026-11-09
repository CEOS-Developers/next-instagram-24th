"use client";

import { Heart, MessageCircle } from "lucide-react";
import { usePostInteractions } from "@/hooks/usePostInteractions";

export default function PostGridStats({ postId, likeCount }: { postId: string; likeCount: number }) {
  const { liked, comments } = usePostInteractions(postId);

  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 bg-black/60 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none sm:gap-6 sm:text-base">
      <span className="flex items-center gap-1.5">
        <Heart aria-hidden="true" className="size-4 sm:size-5" fill="currentColor" />
        <span className="sr-only">좋아요 </span>
        {(likeCount + Number(liked)).toLocaleString("ko-KR")}
      </span>
      <span className="flex items-center gap-1.5">
        <MessageCircle aria-hidden="true" className="size-4 sm:size-5" fill="currentColor" />
        <span className="sr-only">댓글 </span>
        {comments.length.toLocaleString("ko-KR")}
      </span>
    </span>
  );
}
