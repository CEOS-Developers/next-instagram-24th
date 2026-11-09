"use client";

import { Smile, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import PostCommentItem from "@/components/post/PostCommentItem";
import PostActions from "@/components/post/PostActions";
import { MAX_COMMENT_LENGTH, usePostInteractions, type PostComment } from "@/hooks/usePostInteractions";

type PostDiscussionProps = {
  postId: string;
  likeCount: number;
  date: ReactNode;
  children: ReactNode;
};

export default function PostDiscussion({ postId, likeCount, date, children }: PostDiscussionProps) {
  const { comments, addComment, deleteComment, toggleCommentLike } = usePostInteractions(postId);
  const [text, setText] = useState("");
  const [replyTarget, setReplyTarget] = useState<PostComment | null>(null);
  const [now, setNow] = useState(Date.now);
  const rootComments = comments.filter((comment) => !comment.parentId);
  const repliesByParent = new Map<string, PostComment[]>();

  for (const comment of comments) {
    if (!comment.parentId) continue;
    const replies = repliesByParent.get(comment.parentId) ?? [];
    replies.push(comment);
    repliesByParent.set(comment.parentId, replies);
  }
  const replyRecipientId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section && comments.length > 0) {
      section.scrollTop = section.scrollHeight;
    }
  }, [comments.length]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (addComment(text, replyTarget?.id)) {
      setText("");
      setReplyTarget(null);
      setNow(Date.now());
    }
  }

  function renderComment(comment: PostComment, replies?: ReactNode) {
    return (
      <PostCommentItem
        key={comment.id}
        comment={comment}
        now={now}
        onDelete={() => {
          if (deleteComment(comment.id)) {
            setReplyTarget((target) => target?.id === comment.id || target?.parentId === comment.id ? null : target);
            inputRef.current?.focus();
          }
        }}
        onReply={() => {
          setReplyTarget(comment);
          inputRef.current?.focus();
        }}
        onLike={() => toggleCommentLike(comment.id)}
      >
        {replies}
      </PostCommentItem>
    );
  }

  return (
    <>
      <section ref={sectionRef} aria-label="게시물 본문 및 댓글" className="flex min-h-36 flex-1 flex-col overflow-y-auto md:min-h-0">
        {children}
        {rootComments.length > 0 ? (
          <ul aria-label="댓글 목록" aria-live="polite" className="space-y-4 px-4 py-3 text-sm">
            {rootComments.map((comment) => {
              const replies = repliesByParent.get(comment.id);
              return renderComment(comment, replies && (
                <ul aria-label="답글 목록" className="mt-3 ml-8 space-y-3 sm:ml-11">
                  {replies.map((reply) => renderComment(reply))}
                </ul>
              ));
            })}
          </ul>
        ) : (
          <div className="grid flex-1 place-items-center px-4 py-6 text-center">
            <div>
              <h2 className="text-lg font-bold md:text-2xl">아직 댓글이 없습니다.</h2>
              <p className="mt-2 text-sm">댓글을 남겨보세요.</p>
            </div>
          </div>
        )}
      </section>

      <footer className="shrink-0 border-t border-neutral-200 px-4 py-3 text-sm">
        <PostActions postId={postId} likeCount={likeCount} onComment={() => inputRef.current?.focus()} />
        {date}
      </footer>

      <form aria-label="댓글 작성" onSubmit={handleSubmit} className="flex shrink-0 items-center gap-2 border-t border-neutral-200 px-4 py-2 text-sm">
        <Smile aria-hidden="true" className="size-6 shrink-0" />
        {replyTarget && (
          <span id={replyRecipientId} className="max-w-[40%] shrink-0 truncate font-semibold text-blue-700">
            @{replyTarget.username}
          </span>
        )}
        <input
          ref={inputRef}
          type="text"
          aria-label="댓글 내용"
          aria-describedby={replyTarget ? replyRecipientId : undefined}
          placeholder={replyTarget ? "답글 달기..." : "댓글 달기..."}
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={MAX_COMMENT_LENGTH}
          className="min-h-9 min-w-0 flex-1 rounded px-1 placeholder:text-neutral-500 focus-visible:outline-2"
        />
        {replyTarget && (
          <button
            type="button"
            aria-label="답글 취소"
            onClick={() => {
              setReplyTarget(null);
              inputRef.current?.focus();
            }}
            className="grid size-7 shrink-0 cursor-pointer place-items-center rounded text-neutral-500 focus-visible:outline-2"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={!text.trim()}
          className="shrink-0 cursor-pointer rounded font-semibold text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:opacity-40"
        >
          게시
        </button>
      </form>
    </>
  );
}
