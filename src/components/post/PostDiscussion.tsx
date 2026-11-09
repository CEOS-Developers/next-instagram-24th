"use client";

import { Smile } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Avatar from "@/components/Avatar";
import PostActions from "@/components/post/PostActions";
import { MAX_COMMENT_LENGTH, usePostInteractions } from "@/hooks/usePostInteractions";

type PostDiscussionProps = {
  postId: string;
  likeCount: number;
  date: ReactNode;
  children: ReactNode;
};

export default function PostDiscussion({ postId, likeCount, date, children }: PostDiscussionProps) {
  const { comments, addComment } = usePostInteractions(postId);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section && comments.length > 0) {
      section.scrollTop = section.scrollHeight;
    }
  }, [comments.length]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (addComment(text)) setText("");
  }

  return (
    <>
      <section ref={sectionRef} aria-label="게시물 본문 및 댓글" className="flex min-h-36 flex-1 flex-col overflow-y-auto md:min-h-0">
        {children}
        {comments.length > 0 ? (
          <ul aria-label="댓글 목록" aria-live="polite" className="space-y-4 px-4 py-3 text-sm">
            {comments.map((comment) => (
              <li key={comment.id} className="flex items-start gap-3">
                <Avatar className="size-8" />
                <p className="min-h-8 min-w-0 content-center whitespace-pre-wrap wrap-break-word">
                  <span className="mr-2 font-semibold">{comment.username}</span>
                  {comment.text}
                </p>
              </li>
            ))}
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

      <form aria-label="댓글 작성" onSubmit={handleSubmit} className="flex shrink-0 items-center gap-3 border-t border-neutral-200 px-4 py-2 text-sm">
        <Smile aria-hidden="true" className="size-6 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          aria-label="댓글 내용"
          placeholder="댓글 달기..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={MAX_COMMENT_LENGTH}
          className="min-h-9 min-w-0 flex-1 rounded px-1 placeholder:text-neutral-500 focus-visible:outline-2"
        />
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
