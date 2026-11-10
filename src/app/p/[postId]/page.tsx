import { LikeButton, LikeCount } from "@/components/post/PostLike";
import { notFound } from "next/navigation";
import PostComments from "@/components/post/PostComments";
import Avatar from "@/components/Avatar";
import UserLink from "@/components/UserLink";
import PostGallery from "@/components/post/PostGallery";
import PostCloseButton from "@/components/post/PostCloseButton";
import { getCommentsByPostId, getCurrentUser, getFeedPosts, getPostById } from "@/lib/data";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return getFeedPosts().map(({ id }) => ({ postId: id }));
}

export default async function PostPage({ params }: PageProps<"/p/[postId]">) {
  const { postId } = await params;
  const post = getPostById(postId);
  if (!post) notFound();
  const comments = getCommentsByPostId(postId);

  return (
    <article className="mx-auto max-w-5xl md:p-6">
      <h1 className="sr-only">{post.author.username}님의 게시물</h1>
      <div className="grid overflow-hidden rounded-sm border-neutral-200 md:grid-cols-[3fr_2fr] md:border">
        <PostGallery images={post.imageUrls} caption={post.caption} />
        <div className="flex min-w-0 flex-col">
          <header className="flex items-center gap-3 border-b border-neutral-200 p-4">
            <Avatar user={post.author} size={36} />
            <UserLink user={post.author} />
            <PostCloseButton fallbackHref={`/${post.author.username}`} />
          </header>
          <div className="space-y-3 p-4 text-sm">
            <p className="whitespace-pre-line">{post.caption}</p>
            <time className="text-xs text-neutral-500" dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </div>
          <PostComments key={post.id} id={post.id} initial={comments} username={getCurrentUser().username} />
          <footer className="mt-auto flex items-center gap-2 border-t border-neutral-200 p-4 text-sm">
            <LikeButton id={post.id} />
            <p className="font-semibold">좋아요 <LikeCount id={post.id} count={post.likeCount} />개</p>
          </footer>
        </div>
      </div>
    </article>
  );
}
