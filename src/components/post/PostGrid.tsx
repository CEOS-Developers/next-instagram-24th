import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import PostThumbnail from "./PostThumbnail";

export type PostGridProps = {
  posts: Post[];
  /** 게시물 작성자의 username입니다. 상세 페이지 주소에 사용합니다. */
  username: User["username"];
  /** 게시물 id별 댓글 수입니다. 값이 없으면 0으로 표시합니다. */
  commentCounts?: Record<Post["id"], number>;
};

export default function PostGrid({
  posts,
  username,
  commentCounts = {},
}: PostGridProps) {
  return (
    <ul className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <li key={post.id}>
          <PostThumbnail
            post={post}
            username={username}
            commentCount={commentCounts[post.id] ?? 0}
          />
        </li>
      ))}
    </ul>
  );
}
