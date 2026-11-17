import PostGrid from "@/components/PostGrid";
import ProfileAvatar from "@/components/ProfileAvatar";
import { getPosts } from "@/data/posts";
import { getProfile, type MockProfile } from "@/data/profiles";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProfileTabs from "./_components/ProfileTabs";

function Profile({ profile, postCount }: { profile: MockProfile; postCount: number }) {
  const profileStats = [
    { label: "게시물", count: postCount, interactive: false },
    { label: "팔로워", count: profile.followers, interactive: true },
    { label: "팔로우", count: profile.following, interactive: true },
  ];

  return (
    <div className="px-4">
      <div className="flex h-27 items-center">
        <button
          type="button"
          disabled
          aria-label="프로필 사진"
          className="mr-7 flex w-27 shrink-0 justify-center enabled:cursor-pointer disabled:cursor-not-allowed"
        >
          <ProfileAvatar src={profile.avatar} size={77} className="border border-foreground/15" />
        </button>
        <div className="my-4 min-w-0 flex-1 text-sm font-semibold">
          <h1 className="truncate">{profile.username}</h1>
          <ul className="mt-2 grid w-43.25 h-9 max-w-full grid-cols-3 gap-2">
            {profileStats.map(({ label, count, interactive }) => {
              const stat = (
                <>
                  <span className="font-medium">{label}</span>
                  <span>{count}</span>
                </>
              );

              return (
                <li key={label} className="flex flex-col">
                  {interactive ? (
                    <button
                      type="button"
                      disabled
                      className="flex flex-col items-start enabled:cursor-pointer disabled:cursor-not-allowed"
                    >
                      {stat}
                    </button>
                  ) : (
                    stat
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="h-7.5">
        <span className="font-semibold">{profile.name}</span>
      </div>
      <div className="box-content flex h-8 justify-center gap-2 py-3">
        {["프로필 편집", "보관함 보기"].map((label) => (
          <button
            key={label}
            type="button"
            disabled
            className="h-8 min-w-0 max-w-87.5 flex-1 rounded-lg bg-[#f0f2f5] text-sm font-bold enabled:cursor-pointer disabled:cursor-not-allowed dark:text-neutral-900"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

async function ProfileContent({ params }: Pick<PageProps<"/[username]">, "params">) {
  const { username } = await params;
  const profile = getProfile(username);
  if (!profile) notFound();

  const posts = getPosts(profile.username);

  return (
    <>
      <section aria-label="프로필" className="mt-4 mb-2 h-48.5">
        <Profile profile={profile} postCount={posts.length} />
      </section>
      <ProfileTabs />
      <hr className="border-t border-[#dbdfe4]" />
      <PostGrid posts={posts} />
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
