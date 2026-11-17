import HomeHeader from "./_components/HomeHeader";
import FeedList from "./_components/FeedList";
import { getFeedPage } from "@/data/posts";

export default function Home() {
  const firstPage = getFeedPage(0);

  return (
    <>
      <HomeHeader />
      <main className="mx-auto w-full max-w-[430px]">
        <FeedList initialPage={firstPage} />
      </main>
    </>
  );
}