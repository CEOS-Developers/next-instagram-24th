import { notFound } from "next/navigation";
import Avatar from "@/components/Avatar";
import UserLink from "@/components/UserLink";
import PostGallery from "@/components/post/PostGallery";
import { getCommentsByPostId, getFeedPosts, getPostById } from "@/lib/data";
import { formatCount, formatDate } from "@/lib/format";

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
        <div className="min-w-0">
          <header className="flex items-center gap-3 border-b border-neutral-200 p-4">
            <Avatar user={post.author} size={36} />
            <UserLink user={post.author} />
          </header>
          <div className="space-y-3 p-4 text-sm">
            <p className="font-semibold">좋아요 {formatCount(post.likeCount)}개</p>
            <p className="whitespace-pre-line">{post.caption}</p>
            <time className="text-xs text-neutral-500" dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </div>
          <section className="border-t border-neutral-200 p-4 text-sm">
            <h2 className="mb-3 font-semibold">댓글 {comments.length}개</h2>
            {comments.length ? (
              <ul className="space-y-3">
                {comments.map((comment) => (
                  <li key={comment.id}><UserLink user={comment.author} /> {comment.text}</li>
                ))}
              </ul>
            ) : <p className="text-neutral-500">아직 댓글이 없습니다.</p>}
          </section>
        </div>
      </div>
    </article>
  );
}
