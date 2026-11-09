import HomeFeed from "@/components/post/HomeFeed";
import { getFeedPage } from "@/lib/data";

export default function HomePage() {
  return <HomeFeed initial={getFeedPage()} />;
}
