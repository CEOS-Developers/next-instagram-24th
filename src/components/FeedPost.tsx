import Link from "next/link";
import { Bookmark, Ellipsis, Heart, MessageCircle, Send, UserRound } from "lucide-react";
import type { Post } from "@/data/posts";
import PostDate from "@/components/PostDate";
import PostGallery from "@/components/PostGallery";

export default function FeedPost({ post, isRecommended }: { post: Post; isRecommended: boolean }) {
  return (
    <article aria-label={`${post.authorUsername}의 게시물`} className="min-w-0 border-b border-gray-200 pb-5">
      <header className="flex items-center gap-3 px-3 py-3 sm:px-0">
        <Link href={`/${post.authorUsername}`} className="flex min-w-0 flex-1 items-center gap-3 text-sm font-semibold">
          <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full border border-gray-200 bg-gray-100 text-gray-400">
            <UserRound size={24} strokeWidth={1.5} />
          </span>
          <span className="min-w-0">
            <span className="block truncate hover:underline">{post.authorUsername}</span>
            {isRecommended && <span className="mt-0.5 block text-xs font-normal text-gray-500">회원님을 위한 추천</span>}
          </span>
        </Link>
        <button type="button" disabled aria-label="게시물 더 보기" className="grid size-9 cursor-not-allowed place-items-center">
          <Ellipsis size={22} aria-hidden="true" />
        </button>
      </header>

      <div className="overflow-hidden border-y border-gray-200 sm:rounded-sm sm:border">
        <PostGallery key={post.id} images={post.images} />
      </div>

      <div className="px-3 pt-2 sm:px-0">
        <div className="mb-2 flex items-center gap-2">
          <button type="button" disabled aria-label="좋아요" className="grid size-9 cursor-not-allowed place-items-center">
            <Heart size={26} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <Link href={`/posts/${post.id}`} scroll={false} aria-label={`${post.authorUsername} 게시물 상세 보기`} className="grid size-9 place-items-center rounded-lg hover:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2">
            <MessageCircle size={26} strokeWidth={1.8} aria-hidden="true" />
          </Link>
          <button type="button" disabled aria-label="게시물 공유" className="grid size-9 cursor-not-allowed place-items-center">
            <Send size={26} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button type="button" disabled aria-label="게시물 저장" className="ml-auto grid size-9 cursor-not-allowed place-items-center">
            <Bookmark size={26} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
        <p className="text-sm font-semibold">좋아요 {post.likeCount}개</p>
        {post.caption && (
          <p className="mt-2 text-sm">
            <Link href={`/${post.authorUsername}`} className="mr-2 font-semibold hover:underline">{post.authorUsername}</Link>
            <span className="whitespace-pre-wrap break-words">{post.caption}</span>
          </p>
        )}
        <Link href={`/posts/${post.id}`} scroll={false} className="mt-2 inline-block text-sm text-gray-500 hover:text-black">
          댓글 보기
        </Link>
        <PostDate publishedAt={post.publishedAt} />
      </div>
    </article>
  );
}
