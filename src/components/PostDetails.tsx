import PostDate from "@/components/PostDate";
import Link from "next/link";
import { Bookmark, Ellipsis, Heart, UserRound } from "lucide-react";
import type { Post } from "@/data/posts";
import PostGallery from "@/components/PostGallery";

export default function PostDetails({ post }: { post: Post }) {
  return (
    <article
      aria-labelledby={`post-title-${post.id}`}
      className="mx-auto flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white sm:grid sm:max-w-[min(1200px,calc(84dvh*1.44))] sm:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)]"
    >
      <h1 id={`post-title-${post.id}`} className="sr-only">{post.authorUsername}님의 게시물</h1>
      <PostGallery key={post.id} images={post.images} />
      <div className="flex min-h-0 min-w-0 flex-col">
        <header className="flex shrink-0 items-center gap-3 border-b border-gray-200 px-4 py-3">
          <Link
            href={`/${post.authorUsername}`}
            className="flex min-w-0 flex-1 items-center gap-3 text-sm font-semibold hover:underline"
          >
            <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full border border-gray-200 bg-gray-100 text-gray-400">
              <UserRound size={24} strokeWidth={1.5} />
            </span>
            <span className="truncate">{post.authorUsername}</span>
          </Link>
          <button type="button" disabled aria-label="게시물 더 보기" title="게시물 더 보기" className="grid size-9 shrink-0 cursor-not-allowed place-items-center">
            <Ellipsis size={22} aria-hidden="true" />
          </button>
        </header>

        <section aria-label="게시물 본문 및 댓글" className="flex min-h-40 flex-1 flex-col overflow-y-auto sm:min-h-0">
          {post.caption && (
            <div className="shrink-0 px-4 py-4 text-sm">
              <Link href={`/${post.authorUsername}`} className="mr-2 font-semibold hover:underline">
                {post.authorUsername}
              </Link>
              <span className="whitespace-pre-wrap break-words">{post.caption}</span>
            </div>
          )}
          <div className="grid flex-1 place-items-center p-5 text-center">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">아직 댓글이 없습니다.</h2>
              <p className="mt-2 text-sm">댓글을 남겨보세요.</p>
            </div>
          </div>
        </section>

        <footer className="shrink-0 border-t border-gray-200 px-4 pt-3 pb-4">
          <div className="mb-3 flex items-center justify-between">
            <button type="button" disabled aria-label="좋아요" title="좋아요" className="grid size-9 cursor-not-allowed place-items-center">
              <Heart size={26} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" disabled aria-label="게시물 저장" title="게시물 저장" className="grid size-9 cursor-not-allowed place-items-center">
              <Bookmark size={26} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm font-semibold">좋아요 {post.likeCount}개</p>
          <PostDate publishedAt={post.publishedAt} />
        </footer>
      </div>
    </article>
  );
}
