"use client";

import { useState, type ReactNode } from "react";
import { useBookmarkedPostIds } from "@/app/_lib/postActions";
import PostGrid, { type PostGridItem } from "@/components/PostGrid";

const tabs = [
  { icon: "feeds", label: "게시물" },
  { icon: "bookmark", label: "저장됨" },
  { icon: "repost", label: "리포스트" },
  { icon: "tagged", label: "태그됨" },
] as const;

type ProfileTab = (typeof tabs)[number]["icon"];

type ProfileTabsProps = {
  children: ReactNode;
  bookmarkCandidates?: PostGridItem[];
};

function BookmarkedPosts({ posts }: { posts: PostGridItem[] }) {
  const bookmarkedIds = useBookmarkedPostIds(posts.map(({ id }) => id));
  const bookmarkedPosts = posts.filter(({ id }) => bookmarkedIds.has(id));

  return bookmarkedPosts.length > 0 ? (
    <PostGrid posts={bookmarkedPosts} />
  ) : (
    <p className="px-4 py-8 text-center text-sm text-foreground/70">
      저장한 게시물이 없어요.
    </p>
  );
}

export default function ProfileTabs({ children, bookmarkCandidates }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("feeds");

  return (
    <>
      <div
        role="group"
        aria-label="프로필 탭"
        className="grid h-[--spacing(11.125)] grid-cols-4"
      >
        {tabs.map(({ icon, label }) => (
          <button
            key={icon}
            type="button"
            disabled={icon !== "feeds" && !(icon === "bookmark" && bookmarkCandidates)}
            aria-label={label}
            aria-pressed={activeTab === icon}
            onClick={() => setActiveTab(icon)}
            className="group flex justify-center enabled:cursor-pointer disabled:cursor-not-allowed"
          >
            <span className="flex h-full items-center border-b-2 border-transparent px-5 group-aria-pressed:border-foreground">
              <span
                aria-hidden="true"
                className="size-6 shrink-0 bg-[#8e8e8e] mask-contain mask-center mask-no-repeat group-aria-pressed:bg-black dark:group-aria-pressed:bg-white"
                style={{
                  maskImage:
                    activeTab === icon && (icon === "bookmark" || icon === "tagged")
                      ? `url(/icons/${icon}-filled.svg)`
                      : `url(/icons/${icon}.svg)`,
                }}
              />
            </span>
          </button>
        ))}
      </div>
      <hr className="border-t border-[#dbdfe4]" />
      {activeTab === "bookmark" && bookmarkCandidates ? (
        <BookmarkedPosts posts={bookmarkCandidates} />
      ) : (
        children
      )}
    </>
  );
}
