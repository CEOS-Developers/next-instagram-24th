import Image from "next/image";
import Link from "next/link";

import Avatar from "@/components/Avatar";
import { BookmarkIcon, CommentIcon, HeartIcon, SendIcon } from "@/components/icons";
import UserLink from "@/components/UserLink";
import { formatCount, formatDate } from "@/lib/format";
import type { PostWithAuthor } from "@/types";

type PostCardProps = {
  post: PostWithAuthor;
  commentCount: number;
  preload?: boolean; // 화면 맨 위 첫 게시물만 true (LCP 이미지 미리 로드)
};

// 홈 피드의 게시물 카드
// 지금은 버튼이 동작하지 않는 정적인 UI 입니다. (좋아요/저장은 선택 요건에서 Client Component 로 분리 예정)
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

      <Link href={postHref} className="relative block aspect-square overflow-hidden rounded-sm bg-neutral-100">
        <Image
          src={post.imageUrls[0]}
          alt={post.caption || `${post.author.username}님의 게시물`}
          fill
          sizes="(max-width: 470px) 100vw, 470px"
          className="object-cover"
          preload={preload}
        />
      </Link>

      <div className="flex items-center gap-4 pt-3">
        <HeartIcon className="size-6" />
        <Link href={postHref} aria-label="댓글 보기">
          <CommentIcon className="size-6" />
        </Link>
        <SendIcon className="size-6" />
        <BookmarkIcon className="ml-auto size-6" />
      </div>

      <p className="pt-2 text-sm font-semibold">좋아요 {formatCount(post.likeCount)}개</p>

      {post.caption && (
        <p className="pt-1 text-sm whitespace-pre-line">
          <UserLink user={post.author} /> {post.caption}
        </p>
      )}

      {commentCount > 0 && (
        <Link href={postHref} className="block pt-1 text-sm text-neutral-500">
          댓글 {commentCount}개 모두 보기
        </Link>
      )}
    </article>
  );
}
