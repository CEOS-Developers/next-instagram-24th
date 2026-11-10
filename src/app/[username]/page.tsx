import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProfileClient from "@/components/profile/ProfileClient";
import ProfilePosts from "@/components/profile/ProfilePosts";
import { comments } from "@/mocks/comments";
import { posts } from "@/mocks/posts";
import { users } from "@/mocks/users";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export function generateStaticParams() {
  return users.map((user) => ({ username: user.username }));
}

async function ProfileContent({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = users.find((user) => user.username === username);

  if (!user) notFound();

  // 최신 게시물이 먼저 오도록 정렬합니다.
  const userPosts = posts
    .filter((post) => post.authorId === user.id)
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));

  const commentCounts: Record<string, number> = {};
  for (const comment of comments) {
    commentCounts[comment.postId] = (commentCounts[comment.postId] ?? 0) + 1;
  }

  return (
    <>
      <ProfileClient key={user.id} user={user} postCount={userPosts.length} />
      <ProfilePosts
        posts={userPosts}
        username={user.username}
        commentCounts={commentCounts}
      />
    </>
  );
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-desktop px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-profile">
        <Suspense fallback={<p role="status">프로필을 불러오는 중이에요.</p>}>
          <ProfileContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}
