import FeedPost from "@/components/feed/FeedPost";
import SuggestedAccounts from "@/components/feed/SuggestedAccounts";
import { posts } from "@/data/posts";
import { currentUser } from "@/data/profiles";

export default function Home() {
  const feedPosts = posts
    .filter((post) => post.authorUsername !== currentUser.username)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <h1 className="sr-only">홈 피드</h1>

      <div className="grid w-full grid-cols-1 justify-items-center gap-x-16 py-8 sm:px-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-6">
        <section
          aria-label="홈 게시물"
          className="w-full min-w-0 max-w-117 space-y-8"
        >
          {feedPosts.map((post, index) => (
            <FeedPost key={post.id} post={post} isFirst={index === 0} />
          ))}
        </section>

        <SuggestedAccounts />
      </div>
    </main>
  );
}
