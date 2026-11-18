"use client";

import Image from "next/image";
import { usePostAction } from "@/app/_lib/postActions";

type PostBookmarkButtonProps = {
  postId: string;
};

export default function PostBookmarkButton({ postId }: PostBookmarkButtonProps) {
  const [isBookmarked, toggleBookmark] = usePostAction("bookmark", postId);

  return (
    <button
      type="button"
      aria-label="저장"
      aria-pressed={isBookmarked}
      onClick={toggleBookmark}
      className="ml-auto cursor-pointer"
    >
      <Image
        src={isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
        alt=""
        width={24}
        height={24}
        className="dark:invert"
      />
    </button>
  );
}
