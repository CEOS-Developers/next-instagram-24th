import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import PostThumbnailStats from "./PostThumbnailStats";

export type PostThumbnailProps = {
  post: Post;
  /** 상세 페이지 주소(/[username]/post/[postId])를 만들 때 사용합니다. */
  username: User["username"];
  commentCount: number;
};

export default function PostThumbnail({
  post,
  username,
  commentCount,
}: PostThumbnailProps) {
  return (
    <Link
      href={`/${encodeURIComponent(username)}/post/${encodeURIComponent(post.id)}`}
      aria-label={`${post.caption} 게시물 보기`}
      className="group relative block aspect-[3/4] overflow-hidden bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <Image
        src={post.imageUrl}
        alt={post.imageAlt}
        fill
        sizes="(min-width: 1024px) 234px, 25vw"
        className="object-cover"
      />

      {/* 여러 장 게시물 표시 */}
      {post.extraImages && post.extraImages.length > 0 && (
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="white"
          aria-hidden="true"
          focusable="false"
          className="absolute top-2 right-2 drop-shadow"
        >
          <path d="M8 2h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Z" />
          <path d="M3 7.5V19a2 2 0 0 0 2 2h11.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      <PostThumbnailStats post={post} commentCount={commentCount} />
    </Link>
  );
}
