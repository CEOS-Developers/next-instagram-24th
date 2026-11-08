"use client";

import Link from "next/link";
import CommentForm from "@/components/CommentForm";
import CommentItem from "@/components/CommentItem";
import { usePostInteractions } from "@/hooks/usePostInteractions";

export default function FeedComments({ postId }: { postId: string }) {
  const { interactions } = usePostInteractions();
  const comments = interactions[postId]?.comments ?? [];
  const latestComment = comments.at(-1);

  return (
    <>
      <Link href={`/posts/${postId}`} scroll={false} className="mt-2 inline-block text-sm text-gray-500 hover:text-black">
        {comments.length ? `댓글 ${comments.length}개 모두 보기` : "댓글 보기"}
      </Link>
      {latestComment && (
        <div className="mt-2">
          <CommentItem key={latestComment.id} postId={postId} comment={latestComment} showAvatar={false} />
        </div>
      )}
      <CommentForm postId={postId} />
    </>
  );
}
