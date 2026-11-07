import PostCard from "@/components/post/PostCard";
import { getCommentCount, getFeedPosts } from "@/lib/data";

// 홈 피드 (Server Component)
// 데이터를 서버에서 바로 읽어서 HTML 로 렌더링하므로 useEffect/fetch 가 필요 없습니다.
export default function HomePage() {
  const posts = getFeedPosts();

  return (
    <div className="mx-auto flex max-w-[470px] flex-col gap-4 px-4 py-6 md:px-0 md:py-8">
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          commentCount={getCommentCount(post.id)}
          preload={index === 0}
        />
      ))}
    </div>
  );
}
