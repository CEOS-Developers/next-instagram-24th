import { comments } from "@/mocks/comments";
import { posts } from "@/mocks/posts";
import { users } from "@/mocks/users";
import type { Comment } from "@/types/comment";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";

export type CommentWithAuthor = {
  comment: Comment;
  author: User;
};

/**
 * URL의 username과 postId로 게시물, 작성자, 댓글을 찾습니다.
 * 게시물이 없거나 작성자가 username과 다르면 null을 반환합니다.
 */
export function findPostWithAuthor(
  username: string,
  postId: string,
): { post: Post; author: User; comments: CommentWithAuthor[] } | null {
  const author = users.find((user) => user.username === username);
  const post = posts.find((post) => post.id === postId);

  if (!author || !post || post.authorId !== author.id) return null;

  return { post, author, comments: findCommentsWithAuthors(post.id) };
}

/** 게시물의 댓글을 작성 시간 순서(오래된 것부터)로 작성자와 함께 반환합니다. */
export function findCommentsWithAuthors(postId: string): CommentWithAuthor[] {
  return comments
    .filter((comment) => comment.postId === postId)
    .toSorted((a, b) => a.createdAt.localeCompare(b.createdAt))
    .flatMap((comment) => {
      const author = users.find((user) => user.id === comment.authorId);

      return author ? [{ comment, author }] : [];
    });
}
