"use client";

import { useBookmarkedPostIds } from "@/app/_lib/postActions";
import PostGrid, { type PostGridItem } from "@/components/PostGrid";
import EmptyPosts from "./EmptyPosts";

export default function BookmarkedPosts({ posts }: { posts: PostGridItem[] }) {
  const bookmarkedIds = useBookmarkedPostIds(posts.map(({ id }) => id));
  const bookmarkedPosts = posts.filter(({ id }) => bookmarkedIds.has(id));

  return bookmarkedPosts.length > 0 ? (
    <PostGrid posts={bookmarkedPosts} />
  ) : (
    <EmptyPosts>저장한 게시물이 없어요.</EmptyPosts>
  );
}
