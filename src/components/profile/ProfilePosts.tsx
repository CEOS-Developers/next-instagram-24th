"use client";

import { useId, useState } from "react";
import PostGrid from "@/components/post/PostGrid";
import { useSavedPostIds } from "@/lib/saveStorage";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import ProfileTabs, { type ProfileTab } from "./ProfileTabs";

export type ProfilePostsProps = {
  /** 이 프로필 유저가 작성한 게시물입니다. */
  posts: Post[];
  username: User["username"];
  commentCounts?: Record<Post["id"], number>;
  isOwnProfile?: boolean;
  savedPostCandidates?: Post[];
  usernamesById?: Record<User["id"], User["username"]>;
};

// 리포스트·태그됨은 데이터가 없어 빈 상태만 보여줍니다.
const emptyMessages: Record<ProfileTab, { title: string; description: string }> = {
  posts: {
    title: "게시물 없음",
    description: "아직 공유한 사진이 없습니다.",
  },
  reposts: {
    title: "리포스트 없음",
    description: "리포스트한 게시물이 여기에 표시됩니다.",
  },
  tagged: {
    title: "태그된 사진 없음",
    description: "다른 사람이 회원님을 태그하면 여기에 표시됩니다.",
  },
  saved: {
    title: "저장한 게시물 없음",
    description: "게시물의 저장 버튼을 누르면 여기에 표시됩니다. 저장한 게시물은 나만 볼 수 있어요.",
  },
};

export default function ProfilePosts({
  posts,
  username,
  commentCounts,
  isOwnProfile = false,
  savedPostCandidates = [],
  usernamesById = {},
}: ProfilePostsProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const panelIdPrefix = useId();
  const savedPostIds = useSavedPostIds();

  const savedPosts = savedPostIds.flatMap((postId) => {
    const post = savedPostCandidates.find((candidate) => candidate.id === postId);
    return post && usernamesById[post.authorId] ? [post] : [];
  });
  const postsByTab: Record<ProfileTab, Post[]> = {
    posts,
    reposts: [],
    tagged: [],
    saved: isOwnProfile ? savedPosts : [],
  };
  const visiblePosts = postsByTab[activeTab];
  const emptyMessage = emptyMessages[activeTab];

  return (
    <section aria-label="게시물" className="mt-8">
      <ProfileTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        panelIdPrefix={panelIdPrefix}
        showSaved={isOwnProfile}
      />

      <div
        id={`${panelIdPrefix}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${panelIdPrefix}-tab-${activeTab}`}
      >
        {visiblePosts.length > 0 ? (
          <PostGrid
            posts={visiblePosts}
            username={username}
            commentCounts={commentCounts}
            usernamesById={activeTab === "saved" ? usernamesById : undefined}
            openAsPage={activeTab === "saved"}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 py-15 text-center">
            <p className="text-profile-title font-semibold text-text-primary">
              {emptyMessage.title}
            </p>
            <p className="text-body text-text-secondary">
              {emptyMessage.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
