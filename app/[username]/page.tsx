import { defaultUsername } from "@/app/_lib/profile";
import PostGrid, { type PostGridItem } from "@/components/PostGrid";
import { getPosts } from "@/data/posts";
import { getProfile } from "@/data/profiles";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Profile from "./_components/Profile";
import ProfileTabs from "./_components/ProfileTabs";

async function ProfileContent({ params }: Pick<PageProps<"/[username]">, "params">) {
  const { username } = await params;
  const profile = getProfile(username);
  if (!profile) notFound();

  const posts = getPosts(profile.username);
  const bookmarkCandidates = profile.username === defaultUsername
    ? getPosts().map<PostGridItem>(({ id, images: [cover] }) => ({ id, images: [cover] }))
    : undefined;

  return (
    <>
      <section aria-label="프로필" className="mt-4 mb-2 h-48.5">
        <Profile profile={profile} postCount={posts.length} />
      </section>
      <ProfileTabs key={profile.username} bookmarkCandidates={bookmarkCandidates}>
        <PostGrid posts={posts} />
      </ProfileTabs>
    </>
  );
}

export default function MyPage({ params }: PageProps<"/[username]">) {
  return (
    <main className="mx-auto w-full max-w-3xl">
      <Suspense fallback={<p className="px-4">프로필을 불러오는 중…</p>}>
        <ProfileContent params={params} />
      </Suspense>
    </main>
  );
}
