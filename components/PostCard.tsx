import Link from "next/link";
import ProfileAvatar from "@/components/ProfileAvatar";
import PostImageSlider from "@/app/p/[postId]/_components/PostImageSlider";
import PostLikeButton from "@/app/p/[postId]/_components/PostLikeButton";
import PostBookmarkButton from "@/app/p/[postId]/_components/PostBookmarkButton";
import { formatDate } from "@/utils/formatDate";
import type { PostWithAuthor } from "@/types/post";

type PostCardProps = {
  post: PostWithAuthor;
};

// 피드에 들어가는 게시물 카드 하나
export default function PostCard({ post }: PostCardProps) {
  const { author } = post;
  const authorHref = `/${author.username}`;

  return (
    <article className="pb-4">
      {/* 작성자 줄 */}
      <div className="flex h-14 items-center pl-3">
        <Link href={authorHref} className="flex items-center gap-3.5">
          <ProfileAvatar src={author.avatar} size={32} />
          <span className="text-sm leading-[18px] font-semibold">{author.username}</span>
        </Link>
      </div>

      {/* 사진 */}
      <PostImageSlider images={post.images} />

      {/* 좋아요·북마크, 본문, 날짜 */}
      <div className="px-4 pt-1.5">
        <section className="mt-1 flex h-10 items-center">
          <PostLikeButton postId={post.id} initialLikes={post.likes} />
          <PostBookmarkButton postId={post.id} />
        </section>
        <p className="text-sm">
          <Link href={authorHref} className="font-semibold">
            {author.username}
          </Link>{" "}
          {post.caption}
        </p>
        <Link href={`/p/${post.id}`} className="mt-1 block text-xs text-[#a8a8a8]">
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </Link>
      </div>
    </article>
  );
}