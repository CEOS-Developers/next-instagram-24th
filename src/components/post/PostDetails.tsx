import { Ellipsis } from "lucide-react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import PostDiscussion from "@/components/post/PostDiscussion";
import PostGallery from "@/components/post/PostGallery";
import type { Post } from "@/data/posts";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function PostDetails({ post }: { post: Post }) {
  const authorHref = `/${post.authorUsername}`;

  return (
    <article
      aria-label={`${post.authorUsername}님의 게시물`}
      className="overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-950 md:grid md:aspect-[36/25] md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] md:grid-rows-[minmax(0,1fr)]"
    >
      <PostGallery key={post.id} images={post.images} />

      <div className="flex min-h-0 min-w-0 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3">
          <Link href={authorHref} className="flex min-w-0 items-center gap-3 text-sm font-semibold hover:underline">
            <Avatar className="size-9" />
            <span className="truncate">{post.authorUsername}</span>
          </Link>
          <button type="button" disabled aria-label="게시물 더 보기" className="grid size-9 shrink-0 place-items-center">
            <Ellipsis aria-hidden="true" className="size-5" />
          </button>
        </header>

        <PostDiscussion
          key={post.id}
          postId={post.id}
          likeCount={post.likeCount}
          date={
            <time dateTime={post.publishedAt} className="mt-1 block text-neutral-500">
              {dateFormatter.format(new Date(post.publishedAt))}
            </time>
          }
        >
          {post.caption && (
            <div className="flex shrink-0 items-start gap-3 px-4 py-4 text-sm">
              <Avatar className="size-8" />
              <p className="min-h-8 min-w-0 content-center whitespace-pre-wrap wrap-break-word">
                <Link href={authorHref} className="mr-2 font-semibold hover:underline">
                  {post.authorUsername}
                </Link>
                {post.caption}
              </p>
            </div>
          )}
        </PostDiscussion>
      </div>
    </article>
  );
}
