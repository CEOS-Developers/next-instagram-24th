import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Copy } from "lucide-react";
import PostPhoto from "@/components/PostPhoto";
import { getPostsByUsername } from "@/data/posts";
import { currentUser, profiles } from "@/data/profiles";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileHighlights from "@/components/ProfileHighlights";
import ProfileTabs from "@/components/ProfileTabs";
import { highlights } from "@/data/highlights";

export function generateStaticParams() {
  return profiles.map(({ username }) => ({ username }));
}

export default function ProfilePage({ params }: PageProps<"/[username]">) {
  return (
    <Suspense fallback={null}>
      <ProfileContent params={params} />
    </Suspense>
  );
}

async function ProfileContent({
  params,
}: Pick<PageProps<"/[username]">, "params">) {
  const { username } = await params;
  const profile = profiles.find((profile) => profile.username === username);

  if (!profile) {
    notFound();
  }

  const profilePosts = getPostsByUsername(username);
  const profileHighlights = highlights.filter((highlight) => highlight.username === username);
  const isOwnProfile = profile.username === currentUser.username;

  return (
    <section className="mx-auto w-full max-w-6xl py-8 md:px-8 md:py-12">
      <ProfileHeader
        profile={profile}
        postCount={profilePosts.length}
        isOwnProfile={isOwnProfile}
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
                scroll={false}
                aria-label={`${post.images[0].alt}${post.images.length > 1 ? `, 사진 ${post.images.length}장` : ""}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-gray-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2"
              >
                <PostPhoto
                  image={post.images[0]}
                  sizes="(min-width: 1280px) 272px, (min-width: 768px) calc((100vw - 136px) / 3), 33vw"
                />
                {post.images.length > 1 && (
                  <Copy
                    size={20}
                    aria-hidden="true"
                    className="absolute top-2 right-2 fill-white text-white drop-shadow-md sm:top-3 sm:right-3"
                  />
                )}
                <span aria-hidden="true" className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
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
