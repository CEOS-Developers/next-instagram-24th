import PostCloseButton from "./PostCloseButton";
import { CommentIcon } from "@/components/icons";
import { LikeButton, LikeCount } from "@/components/post/PostLike";
import { notFound } from "next/navigation";
import PostComments from "@/components/post/PostComments";
import Avatar from "@/components/Avatar";
import UserLink from "@/components/UserLink";
import PostGallery from "@/components/post/PostGallery";
import { getCommentsByPostId, getCurrentUser, getPostById } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default function PostDetail({ postId, standalone = false }: { postId: string; standalone?: boolean }) {
  const post = getPostById(postId);
  if (!post) notFound();
  const comments = getCommentsByPostId(postId);

  return (
    <article className="post-detail mx-auto max-w-5xl">
      <h1 className="sr-only">{post.author.username}님의 게시물</h1>
      <div className="grid overflow-hidden rounded-sm border-neutral-200 md:grid-cols-[5fr_4fr] md:border">
        <PostGallery images={post.imageUrls} caption={post.caption} />
        <div className="flex min-h-0 min-w-0 flex-col">
          <header className="flex items-center gap-3 border-b border-neutral-200 p-4">
            <Avatar user={post.author} size={36} />
            <UserLink user={post.author} />
            {standalone && <PostCloseButton fallbackHref={`/${post.author.username}`} />}
          </header>
          <div className="space-y-3 p-4 text-sm">
            <p className="whitespace-pre-line"><UserLink user={post.author} /> {post.caption}</p>

          </div>
          <PostComments key={post.id} id={post.id} initial={comments} username={getCurrentUser().username}>
          <footer className="flex flex-wrap items-center gap-2 border-t border-neutral-200 p-4 text-sm">
            <LikeButton id={post.id} />
            <label htmlFor={`comment-input-${post.id}`} title="댓글 달기" className="cursor-pointer"><CommentIcon className="size-6" /><span className="sr-only">댓글 달기</span></label>
            <p className="w-full font-semibold">좋아요 <LikeCount id={post.id} count={post.likeCount} />개</p>
            <time className="text-xs text-neutral-500" dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </footer>
          </PostComments>
        </div>
      </div>
    </article>
  );
}
