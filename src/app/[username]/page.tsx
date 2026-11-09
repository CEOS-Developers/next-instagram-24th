import { notFound } from "next/navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePosts from "@/components/profile/ProfilePosts";
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
      {username === currentUser.username ? (
        <ProfileTabs posts={posts} />
      ) : (
        <section aria-labelledby="profile-posts-heading">
          <h2 id="profile-posts-heading" className="border-t border-neutral-200 py-4 text-center text-sm font-semibold dark:border-neutral-800">
            게시물
          </h2>
          <ProfilePosts posts={posts} />
        </section>
      )}
    </div>
  );
}
