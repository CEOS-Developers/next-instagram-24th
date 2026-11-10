import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileHeaderSkeleton from "@/components/profile/ProfileHeaderSkeleton";
import ProfilePostGrid, { ProfilePostGridSkeleton } from "@/components/profile/ProfilePostGrid";
import {
  getAllUsers,
  getCurrentUser,
  getPostsByUserId,
  getUserByUsername,
} from "@/lib/data";

// 동적 라우트: /ceos24.front, /jiwoo.kim ...
// 빌드할 때 어떤 username 이 있는지 미리 알려주면 각 프로필을 정적 HTML 로 만들어 둡니다.
export function generateStaticParams() {
  return getAllUsers().map((user) => ({ username: user.username }));
}

// 페이지 자체는 params 를 기다리지 않고 바로 껍데기(App Shell)를 그립니다.
// URL 에 따라 달라지는 부분(params 를 읽는 곳)만 <Suspense> 안으로 넣어야
// 링크를 눌렀을 때 스켈레톤이 즉시 보이고 내용이 이어서 채워집니다. (partialPrefetching)
export default function ProfilePage({ params }: PageProps<"/[username]">) {
  return (
    <div className="profile-page mx-auto max-w-[1200px] md:px-5">
      <Suspense
        fallback={
          <>
            <ProfileHeaderSkeleton />
            <ProfilePostGridSkeleton />
          </>
        }
      >
        <ProfileContent params={params} />
      </Suspense>
    </div>
  );
}

async function ProfileContent({ params }: Pick<PageProps<"/[username]">, "params">) {
  // Next.js 15부터 params 는 Promise 라서 await 해야 합니다.
  const { username } = await params;
  const user = getUserByUsername(username);

  // 없는 아이디면 not-found.tsx 를 보여줌
  if (!user) notFound();

  const posts = getPostsByUserId(user.id);
  const isMe = user.id === getCurrentUser().id;

  return (
    <>
      <ProfileHeader user={user} postCount={posts.length} isMe={isMe} suggestions={isMe ? [] : getAllUsers().filter(u => u.id !== user.id && u.id !== getCurrentUser().id).slice(0, 3).map(({ username }) => ({ username }))} />
      <ProfilePostGrid key={user.id} isMe={isMe} posts={posts} />
    </>
  );
}
