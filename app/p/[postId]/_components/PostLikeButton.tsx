"use client";

import Image from "next/image";
import { useId } from "react";
import { usePostAction } from "../_lib/usePostAction";

type PostLikeButtonProps = {
  postId: string;
  initialLikes: number;
};

export default function PostLikeButton({ postId, initialLikes }: PostLikeButtonProps) {
  const countId = useId();
  const [isLiked, toggleLike] = usePostAction("like", postId);
  const likes = initialLikes + Number(isLiked);

  return (
    <button
      type="button"
      aria-label="좋아요"
      aria-pressed={isLiked}
      aria-describedby={countId}
      onClick={toggleLike}
      className="flex cursor-pointer items-center gap-1.5"
    >
      {isLiked ? (
        <span aria-hidden="true" className="size-6 bg-red-500 [mask:url(/icons/heart-filled.svg)_center/contain_no-repeat]" />
      ) : (
        <Image src="/icons/heart.svg" alt="" width={24} height={24} className="dark:invert" />
      )}
      <span id={countId} className="text-sm font-semibold">{likes}</span>
    </button>
  );
}
