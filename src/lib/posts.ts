import { posts } from "@/mocks/posts";
import { users } from "@/mocks/users";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";

/**
 * URL의 username과 postId로 게시물과 작성자를 찾습니다.
 * 게시물이 없거나 작성자가 username과 다르면 null을 반환합니다.
 */
export function findPostWithAuthor(
  username: string,
  postId: string,
): { post: Post; author: User } | null {
  const author = users.find((user) => user.username === username);
  const post = posts.find((post) => post.id === postId);

  if (!author || !post || post.authorId !== author.id) return null;

  return { post, author };
}
