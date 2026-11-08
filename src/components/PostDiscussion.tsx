"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import CommentForm from "@/components/CommentForm";
import PostActions from "@/components/PostActions";
import { usePostInteractions } from "@/hooks/usePostInteractions";

export default function PostDiscussion({ postId, baseLikeCount, children, date }: {
  postId: string;
  baseLikeCount: number;
  children: ReactNode;
  date: ReactNode;
}) {
  const { interactions } = usePostInteractions();
  const comments = interactions[postId]?.comments ?? [];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section && comments.length) section.scrollTop = section.scrollHeight;
  }, [comments.length]);

  return (
    <>
      <section ref={sectionRef} aria-label="게시물 본문 및 댓글" className="flex min-h-40 flex-1 flex-col overflow-y-auto sm:min-h-0">
        {children}
        {comments.length ? (
          <ul aria-label="댓글 목록" aria-live="polite" aria-relevant="additions" className="space-y-5 px-4 pt-2 pb-5 text-sm">
            {comments.map((comment) => (
              <li key={comment.id} className="flex items-start gap-3">
                <Link href={`/${comment.username}`} aria-label={`${comment.username} 프로필 보기`} className="shrink-0">
                  <span aria-hidden="true" className="grid size-8 place-items-center rounded-full border border-gray-200 bg-gray-100 text-gray-400"><UserRound size={22} strokeWidth={1.5} /></span>
                </Link>
                <p className="min-w-0 py-1">
                  <Link href={`/${comment.username}`} className="mr-2 font-semibold hover:underline">{comment.username}</Link>
                  <span className="whitespace-pre-wrap break-words">{comment.text}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid flex-1 place-items-center p-5 text-center">
            <div><h2 className="text-xl font-bold sm:text-2xl">아직 댓글이 없습니다.</h2><p className="mt-2 text-sm">댓글을 남겨보세요.</p></div>
          </div>
        )}
      </section>
      <footer className="shrink-0 border-t border-gray-200 px-4 pt-3 pb-4">
        <PostActions postId={postId} baseLikeCount={baseLikeCount} onComment={() => textareaRef.current?.focus()} />
        {date}
        <CommentForm postId={postId} textareaRef={textareaRef} />
      </footer>
    </>
  );
}
