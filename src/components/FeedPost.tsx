import Link from "next/link";
import { Ellipsis, UserRound } from "lucide-react";
import type { Post } from "@/data/posts";
import FeedRecommendation from "@/components/FeedRecommendation";
import PostDate from "@/components/PostDate";
import PostActions from "@/components/PostActions";
import FeedComments from "@/components/FeedComments";
import PostGallery from "@/components/PostGallery";

export default function FeedPost({ post }: { post: Post }) {
  return (
    <article aria-label={`${post.authorUsername}의 게시물`} className="min-w-0 border-b border-gray-200 pb-5">
      <header className="flex items-center gap-3 px-3 py-3 sm:px-0">
        <Link href={`/${post.authorUsername}`} className="flex min-w-0 flex-1 items-center gap-3 text-sm font-semibold">
          <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full border border-gray-200 bg-gray-100 text-gray-400">
            <UserRound size={24} strokeWidth={1.5} />
          </span>
          <span className="min-w-0">
            <span className="block truncate hover:underline">{post.authorUsername}</span>
            <FeedRecommendation username={post.authorUsername} />
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
        <PostActions postId={post.id} baseLikeCount={post.likeCount} commentLabel={`${post.authorUsername} 게시물 상세 보기`} />
        {post.caption && (
          <p className="mt-2 text-sm">
            <Link href={`/${post.authorUsername}`} className="mr-2 font-semibold hover:underline">{post.authorUsername}</Link>
            <span className="whitespace-pre-wrap break-words">{post.caption}</span>
          </p>
        )}
        <PostDate publishedAt={post.publishedAt} />
        <FeedComments key={post.id} postId={post.id} />
      </div>
    </article>
  );
}
