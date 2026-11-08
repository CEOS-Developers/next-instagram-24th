import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPostsByUsername, posts } from "@/data/posts";
import PostDetails from "@/components/PostDetails";
import PostModal from "@/components/PostModal";

export function generateStaticParams() {
  return posts.map(({ id }) => ({ id }));
}

export default function PostModalPage({ params }: { params: Promise<{ id: string }> }) {
  return <Suspense fallback={null}><ModalContent params={params} /></Suspense>;
}

async function ModalContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = posts.find((post) => post.id === id);
  if (!post) notFound();

  const authorPosts = getPostsByUsername(post.authorUsername);
  const index = authorPosts.findIndex((item) => item.id === post.id);

  return (
    <PostModal previousId={authorPosts[index - 1]?.id} nextId={authorPosts[index + 1]?.id}>
      <PostDetails post={post} />
    </PostModal>
  );
}
