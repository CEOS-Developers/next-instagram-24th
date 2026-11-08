import { Suspense } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import FeedPost from "@/components/FeedPost";
import ProfileSuggestions from "@/components/ProfileSuggestions";
import { posts } from "@/data/posts";
import { currentUser, profiles } from "@/data/profiles";

export default function Home() {
  const feedPosts = posts
    .filter((post) => post.authorUsername !== currentUser.username)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const suggestedProfiles = profiles.filter(
    (profile) => profile.username !== currentUser.username &&
      !currentUser.followingUsernames.includes(profile.username),
  );
  const ownProfile = profiles.find((profile) => profile.username === currentUser.username);

  return (
    <Suspense fallback={null}>
      <div className="mx-auto flex w-full max-w-5xl justify-center gap-12 py-3 sm:px-6 md:py-8 xl:py-10">
        <section aria-labelledby="feed-heading" className="w-full min-w-0 max-w-[470px]">
          <h1 id="feed-heading" className="sr-only">홈 피드</h1>
          <ul className="space-y-4">
            {feedPosts.map((post) => (
              <li key={post.id}>
                <FeedPost post={post} isRecommended={!currentUser.followingUsernames.includes(post.authorUsername)} />
              </li>
            ))}
          </ul>
          {feedPosts.length === 0 && (
            <p className="px-4 py-12 text-center text-sm text-gray-500">아직 게시물이 없습니다.</p>
          )}
        </section>

        <aside aria-label="계정 추천" className="hidden w-72 shrink-0 pt-3 xl:block">
          <Link href={`/${currentUser.username}`} className="mb-6 flex min-w-0 items-center gap-3 rounded-lg py-2 focus-visible:outline-2 focus-visible:outline-offset-2">
            <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full border border-gray-200 bg-gray-100 text-gray-400">
              <UserRound size={32} strokeWidth={1.5} />
            </span>
            <span className="min-w-0 text-sm">
              <span className="block truncate font-semibold">{currentUser.username}</span>
              {ownProfile?.displayName && <span className="mt-0.5 block truncate text-gray-500">{ownProfile.displayName}</span>}
            </span>
          </Link>
          <ProfileSuggestions profiles={suggestedProfiles} />
        </aside>
      </div>
    </Suspense>
  );
}
