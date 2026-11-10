import Image from "next/image";
import { Suspense } from "react";
import { profileImage } from "../../_lib/profile";
import ProfileTabs from "./_components/ProfileTabs";

const profileStats = [
  { label: "게시물", count: 4, interactive: false },
  { label: "팔로워", count: 120, interactive: true },
  { label: "팔로우", count: 300, interactive: true },
];

async function Profile({
  params,
}: Pick<PageProps<"/mypage/[username]">, "params">) {
  const { username } = await params;

  return (
    <div className="px-4">
      <div className="flex h-27 items-center">
        <button
          type="button"
          disabled
          aria-label="프로필 사진"
          className="mr-7 flex w-27 shrink-0 justify-center enabled:cursor-pointer disabled:cursor-not-allowed"
        >
          <Image
            src={profileImage}
            alt=""
            width={77}
            height={77}
            className="size-19.25 rounded-full border border-foreground/15 object-cover"
          />
        </button>
        <div className="my-4 min-w-0 flex-1 text-sm font-semibold">
          <h1 className="truncate">{username}</h1>
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
        <span className="font-semibold">{username}</span>
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

export default function MyPage({ params }: PageProps<"/mypage/[username]">) {
  return (
    <main className="mx-auto w-full max-w-3xl">
      <section aria-label="프로필" className="mt-4 mb-2 h-48.5">
        <Suspense fallback={<p className="px-4">프로필을 불러오는 중…</p>}>
          <Profile params={params} />
        </Suspense>
      </section>
      <ProfileTabs />
      <hr className="border-t border-[#dbdfe4]" />
    </main>
  );
}
