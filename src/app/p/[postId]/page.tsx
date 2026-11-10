import PostDetail from "@/components/post/PostDetail";
import { getFeedPosts } from "@/lib/data";

export function generateStaticParams() {
  return getFeedPosts().map(({ id }) => ({ postId: id }));
}

export default async function PostPage({ params }: PageProps<"/p/[postId]">) {
  return <PostDetail standalone postId={(await params).postId} />;
}
