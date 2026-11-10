import type { CommentWithAuthor } from "@/lib/posts";
import CommentItem from "./CommentItem";

export type CommentListProps = {
  comments: CommentWithAuthor[];
};

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) return null;

  return (
    <ul aria-label="댓글" className="mt-5 space-y-5">
      {comments.map(({ comment, author }) => (
        <CommentItem key={comment.id} comment={comment} author={author} />
      ))}
    </ul>
  );
}
