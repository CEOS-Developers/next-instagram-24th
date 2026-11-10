import { Suspense } from "react";
import { notFound } from "next/navigation";
import PostDetail from "@/components/post/PostDetail";
import { posts } from "@/mocks/posts";
import { users } from "@/mocks/users";

type PostPageProps = {
  params: Promise<{ username: string; postId: string }>;
};

export function generateStaticParams() {
  return posts.flatMap((post) => {
    const author = users.find((user) => user.id === post.authorId);

    return author ? [{ username: author.username, postId: post.id }] : [];
  });
}

async function PostContent({ params }: PostPageProps) {
  const { username, postId } = await params;
  const user = users.find((user) => user.username === username);
  const post = posts.find((post) => post.id === postId);

  // 게시물이 없거나, URL의 username이 실제 작성자와 다르면 404를 보여줍니다.
  if (!user || !post || post.authorId !== user.id) notFound();

  return <PostDetail post={post} author={user} />;
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-desktop px-4 py-8 sm:px-8 sm:py-12">
      <Suspense fallback={<p role="status">게시물을 불러오는 중이에요.</p>}>
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}
