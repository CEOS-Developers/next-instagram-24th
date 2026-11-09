import { Suspense } from "react";
import { notFound } from "next/navigation";
import PostDetails from "@/components/post/PostDetails";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map(({ id }) => ({ id }));
}

export default function PostPage({ params }: PageProps<"/posts/[id]">) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 [html:has(&)]:[scrollbar-width:none] sm:py-10">
      <h1 className="sr-only">게시물 상세</h1>
      <Suspense fallback={<p role="status">게시물을 불러오는 중입니다.</p>}>
        <PostContent params={params} />
      </Suspense>
    </div>
  );
}

async function PostContent({ params }: Pick<PageProps<"/posts/[id]">, "params">) {
  const { id } = await params;
  const post = posts.find((item) => item.id === id);
  if (!post) notFound();

  return <PostDetails post={post} />;
}
