import { Ellipsis, Heart } from "lucide-react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import Avatar from "@/components/Avatar";
import { currentUser } from "@/data/profiles";
import type { PostComment } from "@/hooks/usePostInteractions";

type PostCommentItemProps = {
  comment: PostComment;
  onDelete: () => void;
  onReply: () => void;
  onLike: () => void;
  now: number;
  children?: ReactNode;
};

const menuButtonClassName =
  "block min-h-12 w-full cursor-pointer px-4 py-3 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:-outline-offset-2";

const commentDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
});

function formatCommentTime(createdAt: Date, now: number) {
  const minutes = Math.max(0, Math.floor((now - createdAt.getTime()) / 60_000));
  if (minutes < 1) return "방금";
  if (minutes < 60) return `${minutes}분`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}시간`;
  return commentDateFormatter.format(createdAt);
}

export default function PostCommentItem({ comment, onDelete, onReply, onLike, now, children }: PostCommentItemProps) {
  const isOwnComment = comment.username === currentUser.username;
  const createdAt = comment.createdAt === undefined ? null : new Date(comment.createdAt);
  const optionsRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <li>
      <div className="group/comment flex items-start gap-3">
        <Avatar className="size-8" />
        <div className="min-w-0 flex-1">
          <p className="min-h-8 content-center whitespace-pre-wrap wrap-break-word">
            <span className="font-semibold">{comment.username}</span>{" "}
            {comment.replyToUsername && (
              <>
                <Link href={`/${encodeURIComponent(comment.replyToUsername)}`} className="text-blue-700 hover:underline focus-visible:outline-2">
                  @{comment.replyToUsername}
                </Link>
                {" "}
              </>
            )}
            {comment.text}
          </p>
          <div className="flex min-h-6 items-center gap-3 text-xs text-neutral-500">
            {createdAt ? (
              <time dateTime={createdAt.toISOString()} title={createdAt.toLocaleString("ko-KR")}>
                {formatCommentTime(createdAt, now)}
              </time>
            ) : (
              <span>작성 시간 미기록</span>
            )}
            <button type="button" onClick={onReply} className="cursor-pointer rounded font-semibold hover:text-neutral-900 focus-visible:outline-2">
              답글 달기
            </button>
            {isOwnComment && (
              <button
                type="button"
                aria-label="댓글 더 보기"
                aria-haspopup="dialog"
                onClick={() => {
                  optionsRef.current?.showModal();
                  cancelRef.current?.focus();
                }}
                className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-full text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:opacity-100 group-hover/comment:opacity-100 [@media(hover:hover)]:opacity-0"
              >
                <Ellipsis aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          aria-label="댓글 좋아요"
          aria-pressed={comment.liked === true}
          onClick={onLike}
          className={`grid size-8 shrink-0 cursor-pointer place-items-center rounded-full focus-visible:outline-2 ${comment.liked ? "text-[#ff3040]" : "text-neutral-600"}`}
        >
          <Heart aria-hidden="true" className="size-4" fill={comment.liked ? "currentColor" : "none"} />
        </button>
      </div>
      {isOwnComment && (
        <dialog
          ref={optionsRef}
          aria-label="댓글 옵션"
          onCancel={(event) => event.stopPropagation()}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
          className="m-auto w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl bg-white p-0 text-center text-neutral-950 backdrop:bg-black/50"
        >
          <div className="divide-y divide-neutral-200">
            <button type="button" onClick={() => {
              optionsRef.current?.close();
              onDelete();
            }} className={`${menuButtonClassName} font-semibold text-red-600`}>
              삭제
            </button>
            <button ref={cancelRef} type="button" onClick={() => optionsRef.current?.close()} className={menuButtonClassName}>
              취소
            </button>
          </div>
        </dialog>
      )}
      {children}
    </li>
  );
}
