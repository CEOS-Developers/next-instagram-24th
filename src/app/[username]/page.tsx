import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import { currentUser, profiles } from "@/data/profiles";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileHighlights from "@/components/ProfileHighlights";
import ProfileTabs from "@/components/ProfileTabs";
import { highlights } from "@/data/highlights";

export function generateStaticParams() {
  return profiles.map(({ username }) => ({ username }));
}

export default async function ProfilePage({
  params,
}: PageProps<"/[username]">) {
  const { username } = await params;
  const profile = profiles.find((profile) => profile.username === username);

  if (!profile) {
    notFound();
  }

  const profilePosts = posts.filter((post) => post.authorUsername === username);
  const profileHighlights = highlights.filter((highlight) => highlight.username === username);
  const isOwnProfile = profile.username === currentUser.username;

  return (
    <section className="mx-auto w-full max-w-6xl py-8 md:px-8 md:py-12">
      <ProfileHeader
        profile={profile}
        postCount={profilePosts.length}
        isOwnProfile={isOwnProfile}
        isFollowing={currentUser.followingUsernames.includes(profile.username)}
      />
      <ProfileHighlights
        highlights={profileHighlights}
        isOwnProfile={isOwnProfile}
      />

      <section aria-labelledby="posts-heading" className="mt-8">
        <h2 id="posts-heading" className="sr-only">게시물</h2>
        <ProfileTabs isOwnProfile={isOwnProfile} />
        <ul role="list" className="grid grid-cols-3 gap-px xl:grid-cols-4">
          {profilePosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/posts/${post.id}`}
                className="block aspect-[3/4] bg-gray-100 hover:bg-gray-200 focus-visible:outline-2 focus-visible:-outline-offset-2"
              >
                <span className="sr-only">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        {profilePosts.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">아직 게시물이 없습니다.</p>
        )}
      </section>
    </section>
  );
}
