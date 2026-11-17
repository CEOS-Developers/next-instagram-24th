import Link from "next/link";
import Avatar from "@/components/Avatar";
import HomeFeed from "@/components/post/HomeFeed";
import SuggestedList from "@/components/SuggestedList";
import { getAllUsers, getCurrentUser, getFeedPage } from "@/lib/data";

export default function HomePage() {
  const current = getCurrentUser();
  // 후보는 전부 넘기고, 화면에는 팔로우 안 한 계정 3명만 보여줌 (SuggestedList)
  const suggested = getAllUsers().filter(user => user.id !== current.id);

  return (
    <div className="home-layout xl:pr-[max(24px,1.5vw)] xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(260px,19vw)] xl:items-start xl:gap-6">
      <HomeFeed initial={getFeedPage()} />
      <aside aria-label="계정 추천" className="sticky top-8 mt-8 hidden min-w-0 xl:block">
        <Link href={`/${current.username}`} className="flex items-center gap-3">
          <Avatar user={current} size={52} />
          <span className="min-w-0 text-sm">
            <strong className="block truncate">{current.username}</strong>
            <span className="text-neutral-500">{current.name}</span>
          </span>
        </Link>
        <h2 className="mt-7 mb-4 text-sm font-semibold text-neutral-500">회원님을 위한 추천</h2>
        <SuggestedList users={suggested} />
      </aside>
    </div>
  );
}
