"use client";

import Link from "next/link";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { usePostInteractions } from "@/hooks/usePostInteractions";

type PostActionsProps = {
  postId: string;
  baseLikeCount: number;
  commentLabel?: string;
  onComment?: () => void;
};

const buttonClassName =
  "grid size-9 cursor-pointer place-items-center rounded-lg hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2";

export default function PostActions({ postId, baseLikeCount, commentLabel = "댓글 보기", onComment }: PostActionsProps) {
  const { interactions, toggleLike, toggleSave } = usePostInteractions();
  const liked = interactions[postId]?.liked ?? false;
  const saved = interactions[postId]?.saved ?? false;

  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <button type="button" onClick={() => toggleLike(postId)} aria-label={liked ? "좋아요 취소" : "좋아요"} aria-pressed={liked} className={`${buttonClassName} ${liked ? "text-[#ff3040]" : "text-[#0c1014]"}`}>
          <Heart size={26} strokeWidth={1.8} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
        </button>
        {onComment ? (
          <button type="button" onClick={onComment} aria-label="댓글 작성" className={buttonClassName}>
            <MessageCircle size={26} strokeWidth={1.8} aria-hidden="true" />
          </button>
        ) : (
          <Link href={`/posts/${postId}`} scroll={false} aria-label={commentLabel} className={buttonClassName}>
            <MessageCircle size={26} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        )}
        <button type="button" disabled aria-label="게시물 공유" className="grid size-9 cursor-not-allowed place-items-center">
          <Send size={26} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => toggleSave(postId)} aria-label={saved ? "게시물 저장 취소" : "게시물 저장"} aria-pressed={saved} className={`${buttonClassName} ml-auto text-[#0c1014]`}>
          <Bookmark size={26} strokeWidth={1.8} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>
      <p className="text-sm font-semibold">좋아요 {baseLikeCount + Number(liked)}개</p>
    </>
  );
}
