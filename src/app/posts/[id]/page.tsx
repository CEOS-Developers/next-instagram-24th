import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PostGallery from "@/components/post/PostGallery";
import { posts } from "@/data/posts";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function generateStaticParams() {
  return posts.map(({ id }) => ({ id }));
}

async function PostContent({ params }: Pick<PageProps<"/posts/[id]">, "params">) {
  const { id } = await params;
  const post = posts.find((item) => item.id === id);

  if (!post) {
    notFound();
  }

  return (
    <article className="overflow-hidden rounded-lg border border-neutral-200 md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] dark:border-neutral-800">
      <PostGallery key={post.id} images={post.images} />

      <div className="flex min-w-0 flex-col">
        <header className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <Link
            href={`/${post.authorUsername}`}
            className="font-semibold wrap-break-word hover:underline"
          >
            {post.authorUsername}
          </Link>
        </header>

        <p className="flex-1 px-5 py-4 text-sm whitespace-pre-wrap wrap-break-word">
          {post.caption}
        </p>

        <footer className="space-y-1 border-t border-neutral-200 px-5 py-4 text-sm dark:border-neutral-800">
          <p className="font-semibold">
            좋아요 {post.likeCount.toLocaleString("ko-KR")}개
          </p>
          <time dateTime={post.publishedAt} className="block text-neutral-500 dark:text-neutral-400">
            {dateFormatter.format(new Date(post.publishedAt))}
          </time>
        </footer>
      </div>
    </article>
  );
}

export default function PostPage({ params }: PageProps<"/posts/[id]">) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-10">
      <h1 className="sr-only">게시물 상세</h1>
      <Suspense fallback={<p role="status">게시물을 불러오는 중입니다.</p>}>
        <PostContent params={params} />
      </Suspense>
    </div>
  );
}
