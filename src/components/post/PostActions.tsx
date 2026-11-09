"use client";

import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { usePostInteractions } from "@/hooks/usePostInteractions";

const buttonClassName = "grid size-8 place-items-center rounded-md";
const activeButtonClassName = `${buttonClassName} cursor-pointer hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2`;

export default function PostActions({ postId, likeCount }: { postId: string; likeCount: number }) {
  const { liked, saved, toggleLike, toggleSave } = usePostInteractions(postId);

  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <button
          type="button"
          aria-label="좋아요"
          aria-pressed={liked}
          onClick={toggleLike}
          className={`${activeButtonClassName} ${liked ? "text-[#ff3040]" : ""}`}
        >
          <Heart aria-hidden="true" className="size-6" fill={liked ? "currentColor" : "none"} />
        </button>
        <button type="button" disabled aria-label="댓글 작성" className={buttonClassName}>
          <MessageCircle aria-hidden="true" className="size-6" />
        </button>
        <button
          type="button"
          aria-label="게시물 저장"
          aria-pressed={saved}
          onClick={toggleSave}
          className={`${activeButtonClassName} ml-auto`}
        >
          <Bookmark aria-hidden="true" className="size-6" fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <p className="font-semibold">좋아요 {(likeCount + Number(liked)).toLocaleString("ko-KR")}개</p>
    </>
  );
}
