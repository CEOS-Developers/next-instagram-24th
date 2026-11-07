import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import { currentUser, profiles } from "@/data/profiles";
import ProfileHeader from "@/components/ProfileHeader";

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

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <ProfileHeader
        profile={profile}
        postCount={profilePosts.length}
        isOwnProfile={profile.username === currentUser.username}
        isFollowing={currentUser.followingUsernames.includes(profile.username)}
      />

      <section aria-labelledby="posts-heading" className="mt-8 border-t border-gray-200">
        <h2 id="posts-heading" className="py-4 text-center text-sm font-semibold">
          게시물
        </h2>
        <ul role="list" className="grid grid-cols-3 gap-1">
          {profilePosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/posts/${post.id}`}
                className="block aspect-square bg-gray-100 hover:bg-gray-200 focus-visible:outline-2 focus-visible:-outline-offset-2"
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
