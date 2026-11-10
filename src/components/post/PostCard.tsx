import { CommentCount } from "./PostComments";
import { LikeButton, LikeCount } from "@/components/post/PostLike";
import Image from "next/image";
import Link from "next/link";

import Avatar from "@/components/Avatar";
import { CommentIcon, SendIcon } from "@/components/icons";
import { SaveButton } from "@/components/post/PostSave";
import UserLink from "@/components/UserLink";
import { formatDate } from "@/lib/format";
import type { PostWithAuthor } from "@/types";

type PostCardProps = {
  post: PostWithAuthor;
  commentCount: number;
  preload?: boolean; // 화면 맨 위 첫 게시물만 true (LCP 이미지 미리 로드)
};

// 홈 피드의 게시물 카드
export default function PostCard({ post, commentCount, preload = false }: PostCardProps) {
  const postHref = `/p/${post.id}`;

  return (
    <article className="border-b border-neutral-200 pb-4">
      <header className="flex items-center gap-3 py-3">
        <Link href={`/${post.author.username}`}>
          <Avatar user={post.author} size={32} />
        </Link>
        <div className="text-sm">
          <UserLink user={post.author} />
          <span className="text-neutral-500"> • {formatDate(post.createdAt)}</span>
        </div>
      </header>

      <Link href={postHref} className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-neutral-100">
        <Image
          src={post.imageUrls[0]}
          alt={post.caption || `${post.author.username}님의 게시물`}
          fill
          sizes="(min-width: 1280px) 31vw, (max-width: 680px) 100vw, 680px"
          className="object-cover"
          preload={preload}
        />
      </Link>

      <div className="flex items-center gap-4 pt-3">
        <LikeButton id={post.id} />
        <Link href={postHref} aria-label="댓글 보기">
          <CommentIcon className="size-6" />
        </Link>
        <SendIcon className="size-6" />
        <SaveButton id={post.id} className="ml-auto" />
      </div>

      <p className="pt-2 text-sm font-semibold">좋아요 <LikeCount id={post.id} count={post.likeCount} />개</p>

      {post.caption && (
        <p className="pt-1 text-sm whitespace-pre-line">
          <UserLink user={post.author} /> {post.caption}
        </p>
      )}

      <CommentCount id={post.id} base={commentCount} link />
    </article>
  );
}
