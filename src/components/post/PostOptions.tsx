"use client";

import { Ellipsis } from "lucide-react";
import { useRef } from "react";
import { useHideLikeCounts } from "@/hooks/useHideLikeCounts";

const menuButtonClassName =
  "block min-h-12 w-full cursor-pointer px-4 py-3 text-sm hover:bg-neutral-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black";

export default function PostOptions({ postId }: { postId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { hideLikeCounts, setHideLikeCounts } = useHideLikeCounts(postId);

  function openOptions() {
    dialogRef.current?.showModal();
    cancelRef.current?.focus();
  }

  function toggleLikeCount() {
    setHideLikeCounts(!hideLikeCounts);
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        aria-label="게시물 더 보기"
        aria-haspopup="dialog"
        className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md hover:bg-neutral-100 focus-visible:outline-2"
        onClick={openOptions}
      >
        <Ellipsis aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="게시물 옵션"
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          event.stopPropagation();
          event.currentTarget.close();
        }}
        onCancel={(event) => event.stopPropagation()}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl bg-white p-0 text-center text-neutral-950 backdrop:bg-black/50"
      >
        <div className="divide-y divide-neutral-200">
          <button type="button" className={menuButtonClassName} onClick={toggleLikeCount}>
            {hideLikeCounts ? "다른 사람에게 좋아요 수 숨기기 취소" : "다른 사람에게 좋아요 수 숨기기"}
          </button>
          <button
            ref={cancelRef}
            type="button"
            className={menuButtonClassName}
            onClick={() => dialogRef.current?.close()}
          >
            취소
          </button>
        </div>
      </dialog>
    </>
  );
}
