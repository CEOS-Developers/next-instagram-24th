import PostGrid from "@/components/PostGrid";
import { getPosts } from "@/data/posts";

export default async function ProfilePostsPage({ params }: PageProps<"/[username]">) {
  const { username } = await params;
  return <PostGrid posts={getPosts(username)} />;
}
