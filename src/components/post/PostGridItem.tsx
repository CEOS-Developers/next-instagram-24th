import Image from "next/image";
import Link from "next/link";

import { CommentIcon, HeartIcon, MultipleIcon } from "@/components/icons";
import { formatCount } from "@/lib/format";
import type { Post } from "@/types";

type PostGridItemProps = {
  post: Post;
  commentCount: number;
};

// 프로필 그리드의 한 칸: 첫 번째 이미지를 정사각형으로 보여주고, 누르면 게시물 상세로 이동
// 마우스를 올리면 좋아요/댓글 수가 보입니다. (CSS group-hover 만 사용 → Server Component 그대로 OK)
export default function PostGridItem({ post, commentCount }: PostGridItemProps) {
  return (
    <Link
      href={`/p/${post.id}`}
      className="group relative block aspect-square overflow-hidden bg-neutral-100"
    >
      <Image
        src={post.imageUrls[0]}
        alt={post.caption || "게시물 이미지"}
        fill
        sizes="(max-width: 935px) 33vw, 300px"
        className="object-cover"
      />

      {/* 여러 장짜리 게시물 표시 */}
      {post.imageUrls.length > 1 && (
        <MultipleIcon className="absolute top-2 right-2 size-5 text-white drop-shadow" />
      )}

      {/* 마우스 올렸을 때 오버레이 */}
      <div className="absolute inset-0 hidden items-center justify-center gap-6 bg-black/30 font-semibold text-white group-hover:flex">
        <span className="flex items-center gap-1.5">
          <HeartIcon filled className="size-5" />
          {formatCount(post.likeCount)}
        </span>
        <span className="flex items-center gap-1.5">
          <CommentIcon className="size-5 fill-white" />
          {formatCount(commentCount)}
        </span>
      </div>
    </Link>
  );
}
