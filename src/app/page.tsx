import FeedList from "@/components/feed/FeedList";
import SuggestedAccounts from "@/components/feed/SuggestedAccounts";
import { getFeedPage } from "@/data/feed";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <h1 className="sr-only">홈 피드</h1>

      <div className="grid w-full grid-cols-1 justify-items-center gap-x-16 py-8 sm:px-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-6">
        <section
          aria-label="홈 게시물"
          className="w-full min-w-0 max-w-117 space-y-8"
        >
          <FeedList initialPage={getFeedPage()} />
        </section>

        <SuggestedAccounts />
      </div>
    </main>
  );
}
