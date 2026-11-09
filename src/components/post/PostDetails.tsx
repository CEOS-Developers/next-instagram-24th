import { Bookmark, Ellipsis, Heart, MessageCircle, Smile } from "lucide-react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
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

        <section aria-label="게시물 본문 및 댓글" className="flex min-h-36 flex-1 flex-col overflow-y-auto md:min-h-0">
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
          <div className="grid flex-1 place-items-center px-4 py-6 text-center">
            <div>
              <h2 className="text-lg font-bold md:text-2xl">아직 댓글이 없습니다.</h2>
              <p className="mt-2 text-sm">댓글을 남겨보세요.</p>
            </div>
          </div>
        </section>

        <footer className="shrink-0 border-t border-neutral-200 px-4 py-3 text-sm">
          <div className="mb-2 flex items-center gap-2">
            <button type="button" disabled aria-label="좋아요" className="grid size-8 place-items-center">
              <Heart aria-hidden="true" className="size-6" />
            </button>
            <button type="button" disabled aria-label="댓글 작성" className="grid size-8 place-items-center">
              <MessageCircle aria-hidden="true" className="size-6" />
            </button>
            <button type="button" disabled aria-label="게시물 저장" className="ml-auto grid size-8 place-items-center">
              <Bookmark aria-hidden="true" className="size-6" />
            </button>
          </div>
          <p className="font-semibold">좋아요 {post.likeCount.toLocaleString("ko-KR")}개</p>
          <time dateTime={post.publishedAt} className="mt-1 block text-neutral-500">
            {dateFormatter.format(new Date(post.publishedAt))}
          </time>
        </footer>

        <div className="flex shrink-0 items-center gap-3 border-t border-neutral-200 px-4 py-2 text-sm">
          <Smile aria-hidden="true" className="size-6 shrink-0" />
          <input
            type="text"
            disabled
            aria-label="댓글 내용"
            placeholder="댓글 달기..."
            className="min-h-9 min-w-0 flex-1 placeholder:text-neutral-500"
          />
          <button type="button" disabled className="shrink-0 font-semibold text-blue-600 opacity-40">
            게시
          </button>
        </div>
      </div>
    </article>
  );
}
