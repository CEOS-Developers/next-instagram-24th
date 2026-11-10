import Image from "next/image";
import { Suspense } from "react";
import { profileImage } from "../../_lib/profile";

async function Profile({
  params,
}: Pick<PageProps<"/mypage/[username]">, "params">) {
  const { username } = await params;

  return (
    <div className="flex items-center gap-4 px-4">
      <Image
        src={profileImage}
        alt=""
        width={72}
        height={72}
        className="size-[72px] shrink-0 rounded-full border border-foreground/15 object-cover"
      />
      <h1 className="min-w-0 text-xl font-semibold [overflow-wrap:anywhere]">
        {username}
      </h1>
    </div>
  );
}

export default function MyPage({ params }: PageProps<"/mypage/[username]">) {
  return (
    <main className="mx-auto w-full max-w-3xl py-6">
      <Suspense fallback={<p>프로필을 불러오는 중…</p>}>
        <Profile params={params} />
      </Suspense>
    </main>
  );
}
