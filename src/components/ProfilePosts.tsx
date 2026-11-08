"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy } from "lucide-react";
import PostPhoto from "@/components/PostPhoto";
import ProfileTabs, { type ProfileTab } from "@/components/ProfileTabs";
import { usePostInteractions } from "@/hooks/usePostInteractions";
import type { Post } from "@/data/posts";

export default function ProfilePosts({ profilePosts, allPosts, isOwnProfile }: { profilePosts: Post[]; allPosts: Post[]; isOwnProfile: boolean }) {
  const [selectedTab, setSelectedTab] = useState<ProfileTab>("posts");
  const { interactions } = usePostInteractions();
  const showingSaved = isOwnProfile && selectedTab === "saved";
  const visiblePosts = showingSaved
    ? allPosts.filter((post) => interactions[post.id]?.saved)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    : profilePosts;

  return (
    <section aria-labelledby="posts-heading" className="mt-8">
      <h2 id="posts-heading" className="sr-only">{showingSaved ? "저장된 게시물" : "게시물"}</h2>
      <ProfileTabs isOwnProfile={isOwnProfile} selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <ul role="list" aria-label={showingSaved ? "저장된 게시물" : "프로필 게시물"} className="grid grid-cols-3 gap-px xl:grid-cols-4">
        {visiblePosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} scroll={false} aria-label={`${post.images[0].alt}${post.images.length > 1 ? `, 사진 ${post.images.length}장` : ""}`} className="group relative block aspect-[3/4] overflow-hidden bg-gray-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2">
              <PostPhoto image={post.images[0]} sizes="(min-width: 1280px) 272px, (min-width: 768px) calc((100vw - 136px) / 3), 33vw" />
              {post.images.length > 1 && <Copy size={20} aria-hidden="true" className="absolute top-2 right-2 fill-white text-white drop-shadow-md sm:top-3 sm:right-3" />}
              <span aria-hidden="true" className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
            </Link>
          </li>
        ))}
      </ul>
      {visiblePosts.length === 0 && <p className="py-12 text-center text-sm text-gray-500">{showingSaved ? "저장한 게시물이 없습니다." : "아직 게시물이 없습니다."}</p>}
    </section>
  );
}
