"use client";

import { useState, type Ref } from "react";
import { usePostInteractions } from "@/hooks/usePostInteractions";

export default function CommentForm({ postId, textareaRef }: { postId: string; textareaRef?: Ref<HTMLTextAreaElement> }) {
  const [text, setText] = useState("");
  const { addComment } = usePostInteractions();

  return (
    <form aria-label="댓글 작성" className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-3" onSubmit={(event) => {
      event.preventDefault();
      if (addComment(postId, text)) setText("");
    }}>
      <textarea
        ref={textareaRef}
        aria-label="댓글 내용"
        placeholder="댓글 달기..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        rows={1}
        maxLength={2200}
        className="max-h-28 min-h-9 min-w-0 flex-1 resize-y rounded py-2 text-sm placeholder:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2"
      />
      <button type="submit" disabled={!text.trim()} className="min-h-9 shrink-0 cursor-pointer rounded text-sm font-semibold text-[#4a5df9] hover:text-[#3f50df] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:opacity-40">
        게시
      </button>
    </form>
  );
}
