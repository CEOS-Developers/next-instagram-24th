import FeedList, { type FeedItem } from "@/components/feed/FeedList";
import { comments } from "@/mocks/comments";
import { posts } from "@/mocks/posts";
import { users } from "@/mocks/users";

export default function HomePage() {
  const commentCounts = new Map<string, number>();
  for (const comment of comments) {
    commentCounts.set(comment.postId, (commentCounts.get(comment.postId) ?? 0) + 1);
  }

  // 모든 사용자의 게시물을 최신순으로 보여줍니다.
  const items: FeedItem[] = posts
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
    .flatMap((post) => {
      const author = users.find((user) => user.id === post.authorId);

      return author ? [{ post, author, commentCount: commentCounts.get(post.id) ?? 0 }] : [];
    });

  return (
    <main className="mx-auto min-h-screen w-full max-w-[502px] px-4 py-8">
      <h1 className="sr-only">홈 피드</h1>
      <FeedList items={items} />
    </main>
  );
}
