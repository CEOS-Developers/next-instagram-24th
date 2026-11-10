import Image from "next/image";
import { Suspense } from "react";
import { profileImage } from "../../_lib/profile";

const profileStats = [
  { label: "게시물", count: 4 },
  { label: "팔로워", count: 120 },
  { label: "팔로우", count: 300 },
];

async function Profile({
  params,
}: Pick<PageProps<"/mypage/[username]">, "params">) {
  const { username } = await params;

  return (
    <div className="px-4">
      <div className="flex h-27 items-center">
        <div className="flex mr-7 w-27 justify-center shrink-0">
          <Image
            src={profileImage}
            alt=""
            width={77}
            height={77}
            className="size-19.25 rounded-full border border-foreground/15 object-cover"
          />
        </div>
        <div className="my-4 min-w-0 flex-1 text-sm font-semibold">
          <h1 className="truncate">{username}</h1>
          <dl className="mt-2 grid w-43.25 h-9 max-w-full grid-cols-3 gap-2">
            {profileStats.map(({ label, count }) => (
              <div key={label} className="flex flex-col">
                <dt className="font-medium">{label}</dt>
                <dd>{count}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="h-7.5">
        <span className="font-semibold">{username}</span>
      </div>
      <div className="box-content flex h-8 gap-2 py-3">
        {["프로필 편집", "보관함 보기"].map((label) => (
          <button
            key={label}
            type="button"
            disabled
            className="h-8 w-44.25 min-w-0 rounded-lg bg-[#f0f2f5] text-sm font-bold dark:text-neutral-900"
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
    </main>
  );
}
