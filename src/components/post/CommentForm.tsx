"use client";

import { useState, type FormEvent } from "react";
import { addComment } from "@/lib/commentStorage";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";

// 인스타그램 댓글 최대 길이입니다.
const MAX_LENGTH = 2200;

export type CommentFormProps = {
  postId: Post["id"];
  author: User;
  /** 댓글 버튼(PostActions)이 포커스를 옮길 때 사용하는 id입니다. */
  inputId: string;
};

export default function CommentForm({ postId, author, inputId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const trimmed = content.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trimmed) return;

    addComment({
      id: `comment-${postId}-${Date.now()}`,
      postId,
      authorId: author.id,
      content: trimmed,
      createdAt: new Date().toISOString(),
    });
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
      {/* 이모지 선택은 UI만 구현합니다. */}
      <button
        type="button"
        aria-label="이모티콘"
        className="-ml-1 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center text-text-primary hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-brand"
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="9.5" />
          <path d="M8 14.5a5 5 0 0 0 8 0" />
          <circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="9.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </button>

      <label htmlFor={inputId} className="sr-only">
        댓글 달기
      </label>
      <input
        id={inputId}
        type="text"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="댓글 달기..."
        maxLength={MAX_LENGTH}
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent py-2 text-body text-text-primary outline-none placeholder:text-text-secondary"
      />

      <button
        type="submit"
        disabled={!trimmed}
        className="shrink-0 cursor-pointer text-body font-semibold text-brand hover:text-brand-hover disabled:cursor-default disabled:opacity-40 disabled:hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
      >
        게시
      </button>
    </form>
  );
}
