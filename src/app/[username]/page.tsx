import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPostsByUsername, posts } from "@/data/posts";
import { currentUser, profiles } from "@/data/profiles";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileHighlights from "@/components/ProfileHighlights";
import ProfilePosts from "@/components/ProfilePosts";
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

      <ProfilePosts
        key={username}
        profilePosts={profilePosts}
        allPosts={isOwnProfile ? posts : []}
        isOwnProfile={isOwnProfile}
      />
    </section>
  );
}
