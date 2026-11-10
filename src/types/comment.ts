import type { Post } from "./post";
import type { User } from "./user";

export type Comment = {
  id: string;
  /** 댓글이 달린 Post.id와 연결됩니다. */
  postId: Post["id"];
  /** 작성자의 User.id와 연결됩니다. */
  authorId: User["id"];
  content: string;
  createdAt: string;
};
