import { notFound } from "next/navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { getPostsByUsername } from "@/data/posts";
import { currentUser, profiles } from "@/data/profiles";

export function generateStaticParams() {
  return profiles.map(({ username }) => ({ username }));
}

export default async function ProfilePage({ params }: PageProps<"/[username]">) {
  const { username } = await params;
  const profile = profiles.find((item) => item.username === username);

  if (!profile) {
    notFound();
  }

  const posts = getPostsByUsername(username);

  return (
    <div className="mx-auto w-full max-w-5xl pb-8">
      <ProfileHeader profile={profile} postCount={posts.length} />
      <ProfileTabs key={username} posts={posts} isOwnProfile={username === currentUser.username} />
    </div>
  );
}
