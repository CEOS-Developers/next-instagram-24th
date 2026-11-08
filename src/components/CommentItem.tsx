"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Ellipsis, UserRound } from "lucide-react";
import { currentUser } from "@/data/profiles";
import { usePostInteractions, type PostComment } from "@/hooks/usePostInteractions";

type CommentItemProps = {
  postId: string;
  comment: PostComment;
  showAvatar?: boolean;
};

const actionClassName =
  "min-h-8 cursor-pointer rounded px-1 text-xs text-gray-500 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2";

export default function CommentItem({ postId, comment, showAvatar = true }: CommentItemProps) {
  const { editComment, deleteComment } = usePostInteractions();
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [draft, setDraft] = useState(comment.text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isOwnComment = comment.username === currentUser.username;

  useEffect(() => {
    if (isEditing) textareaRef.current?.focus();
  }, [isEditing]);

  return (
    <div className="flex items-start gap-3 text-sm">
      {showAvatar && (
        <Link href={`/${comment.username}`} aria-label={`${comment.username} 프로필 보기`} className="shrink-0">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full border border-gray-200 bg-gray-100 text-gray-400">
            <UserRound size={22} strokeWidth={1.5} />
          </span>
        </Link>
      )}
      <div className="min-w-0 flex-1">
        {isEditing && isOwnComment ? (
          <form aria-label="댓글 수정" onSubmit={(event) => {
            event.preventDefault();
            if (editComment(postId, comment.id, draft)) setIsEditing(false);
          }}>
            <Link href={`/${comment.username}`} className="font-semibold hover:underline">{comment.username}</Link>
            <textarea
              ref={textareaRef}
              aria-label="댓글 수정 내용"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing) return;
                if (event.key === "Escape") {
                  event.preventDefault();
                  event.stopPropagation();
                  setIsEditing(false);
                } else if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              rows={2}
              maxLength={2200}
              className="mt-2 block max-h-40 w-full min-w-0 resize-y rounded-lg border border-gray-300 p-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            />
            <div className="mt-1 flex gap-3">
              <button type="submit" aria-label="댓글 수정 저장" disabled={!draft.trim()} className="min-h-8 cursor-pointer rounded px-1 text-xs font-semibold text-[#4a5df9] hover:text-[#3f50df] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:opacity-40">저장</button>
              <button type="button" aria-label="댓글 수정 취소" onClick={() => setIsEditing(false)} className={actionClassName}>취소</button>
            </div>
          </form>
        ) : (
          <>
            <p className="py-1">
              <Link href={`/${comment.username}`} className="mr-2 font-semibold hover:underline">{comment.username}</Link>
              <span className="whitespace-pre-wrap break-words">{comment.text}</span>
            </p>

          </>
        )}
      </div>
      {isOwnComment && !isEditing && (
        <button
          type="button"
          aria-label="댓글 더 보기"
          aria-haspopup="dialog"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Ellipsis size={18} aria-hidden="true" />
        </button>
      )}
      {isOwnComment && isMenuOpen && (
        <CommentMenu
          onClose={() => setIsMenuOpen(false)}
          onEdit={() => {
            setIsMenuOpen(false);
            setDraft(comment.text);
            setIsEditing(true);
          }}
          onDelete={() => {
            setIsMenuOpen(false);
            deleteComment(postId, comment.id);
          }}
        />
      )}
    </div>
  );
}


function CommentMenu({ onClose, onEdit, onDelete }: {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const menuButtonClassName =
    "min-h-12 w-full cursor-pointer px-4 py-3 text-center text-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:-outline-offset-2";

  return (
    <dialog
      ref={dialogRef}
      aria-label="댓글 옵션"
      onCancel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center overflow-y-auto border-0 bg-transparent p-4 text-black backdrop:bg-black/50 open:flex"
    >
      <button type="button" tabIndex={-1} aria-label="댓글 메뉴 바깥 영역 닫기" onClick={onClose} className="fixed inset-0 z-0 cursor-default border-0 bg-transparent" />
      <div className="relative z-10 w-full max-w-[400px] shrink-0 divide-y divide-gray-200 overflow-hidden rounded-2xl bg-white">
        <button type="button" onClick={onDelete} className={`${menuButtonClassName} font-semibold text-[#ed4956]`}>삭제</button>
        <button type="button" onClick={onEdit} className={menuButtonClassName}>수정</button>
        <button ref={cancelRef} type="button" onClick={onClose} className={menuButtonClassName}>취소</button>
      </div>
    </dialog>
  );
}
