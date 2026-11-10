import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";

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

      {/* 호버 또는 키보드 포커스 시 좋아요·댓글 수를 보여줍니다. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center gap-7 bg-black/30 text-body font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="flex items-center gap-1.5">
          <Icon name="heart" size={20} filled />
          {post.likeCount.toLocaleString()}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="comment" size={20} className="fill-current" />
          {commentCount.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
