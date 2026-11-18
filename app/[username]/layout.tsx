import { getPosts } from "@/data/posts";
import { getProfile } from "@/data/profiles";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Profile from "./_components/Profile";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileTabs from "./_components/ProfileTabs";

async function ProfileContent({ children, params }: LayoutProps<"/[username]">) {
  const { username } = await params;
  const profile = getProfile(username);
  if (!profile) notFound();

  return (
    <>
      <section aria-label="프로필" className="mt-4 mb-2 h-48.5">
        <Profile profile={profile} postCount={getPosts(profile.username).length} />
      </section>
      <ProfileTabs username={profile.username} />
      <hr className="border-t border-[#dbdfe4]" />
      {children}
    </>
  );
}

export default function ProfileLayout({ children, params }: LayoutProps<"/[username]">) {
  return (
    <>
      <ProfileHeader />
      <main className="mx-auto w-full max-w-3xl">
        <Suspense fallback={<p className="px-4">프로필을 불러오는 중…</p>}>
          <ProfileContent params={params}>{children}</ProfileContent>
        </Suspense>
      </main>
    </>
  );
}
