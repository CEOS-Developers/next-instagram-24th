import { defaultUsername } from "@/app/_lib/profile";
import type { PostGridItem } from "@/components/PostGrid";
import { getPosts } from "@/data/posts";
import { notFound } from "next/navigation";
import BookmarkedPosts from "../_components/BookmarkedPosts";

export default async function SavedPostsPage({ params }: PageProps<"/[username]/saved">) {
  const { username } = await params;
  if (username !== defaultUsername) notFound();

  const posts = getPosts().map<PostGridItem>(({ id, images: [cover] }) => ({ id, images: [cover] }));
  return <BookmarkedPosts posts={posts} />;
}
