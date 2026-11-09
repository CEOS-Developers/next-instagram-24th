import { Suspense } from "react";
import { notFound } from "next/navigation";
import PostDetails from "@/components/post/PostDetails";
import PostDialog from "@/components/post/PostDialog";
import { getPostsByUsername, posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map(({ id }) => ({ id }));
}

export default function PostModalPage({ params }: PageProps<"/posts/[id]">) {
  return (
    <Suspense fallback={null}>
      <ModalContent params={params} />
    </Suspense>
  );
}

async function ModalContent({ params }: Pick<PageProps<"/posts/[id]">, "params">) {
  const { id } = await params;
  const post = posts.find((item) => item.id === id);
  if (!post) notFound();

  const authorPosts = getPostsByUsername(post.authorUsername);
  const index = authorPosts.findIndex((item) => item.id === post.id);

  return (
    <PostDialog previousId={authorPosts[index - 1]?.id} nextId={authorPosts[index + 1]?.id}>
      <PostDetails post={post} />
    </PostDialog>
  );
}
