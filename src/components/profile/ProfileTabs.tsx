"use client";

import { Bookmark, ContactRound, Grid3X3, Repeat2 } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import ProfilePosts from "@/components/profile/ProfilePosts";
import { posts as allPosts, type Post } from "@/data/posts";
import { useSavedPostIds } from "@/hooks/usePostInteractions";

const activeTabs = [
  { id: "posts", label: "게시물", Icon: Grid3X3 },
  { id: "saved", label: "저장됨", Icon: Bookmark },
] as const;

const unavailableTabs = [
  { label: "리포스트", Icon: Repeat2 },
  { label: "태그됨", Icon: ContactRound },
];

type ProfileTab = (typeof activeTabs)[number]["id"];

const tabClassName =
  "relative grid h-14 flex-1 place-items-center text-neutral-400 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:h-16";

export default function ProfileTabs({ posts, isOwnProfile }: { posts: Post[]; isOwnProfile: boolean }) {
  const enabledTabs = isOwnProfile ? activeTabs : activeTabs.slice(0, 1);
  const [selectedTab, setSelectedTab] = useState<ProfileTab>("posts");
  const tabRefs = useRef<Partial<Record<ProfileTab, HTMLButtonElement | null>>>({});
  const id = useId();
  const savedIds = useSavedPostIds();
  const savedPosts = selectedTab === "saved"
    ? allPosts.filter((post) => savedIds.has(post.id)).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    : [];

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, tab: ProfileTab) {
    if (!isOwnProfile) return;

    let nextTab: ProfileTab;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
        nextTab = tab === "posts" ? "saved" : "posts";
        break;
      case "Home":
        nextTab = "posts";
        break;
      case "End":
        nextTab = "saved";
        break;
      default:
        return;
    }

    event.preventDefault();
    setSelectedTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  }

  return (
    <>
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div role="tablist" aria-label="프로필 게시물 분류" className="mx-auto flex max-w-3xl">
          {enabledTabs.map(({ id: tab, label, Icon }) => (
            <button
              key={tab}
              ref={(element) => { tabRefs.current[tab] = element; }}
              id={`${id}-${tab}-tab`}
              type="button"
              role="tab"
              aria-selected={selectedTab === tab}
              aria-controls={`${id}-${tab}-panel`}
              tabIndex={selectedTab === tab ? 0 : -1}
              title={label}
              onClick={() => setSelectedTab(tab)}
              onKeyDown={(event) => handleTabKeyDown(event, tab)}
              className={`${tabClassName} cursor-pointer aria-selected:text-neutral-950 aria-selected:after:absolute aria-selected:after:bottom-0 aria-selected:after:h-0.5 aria-selected:after:w-12 aria-selected:after:bg-current dark:aria-selected:text-white sm:aria-selected:after:w-16`}
            >
              <Icon aria-hidden="true" className="size-6" />
              <span className="sr-only">{label}</span>
            </button>
          ))}
          {unavailableTabs.map(({ label, Icon }) => (
            <button key={label} type="button" role="tab" aria-selected={false} title={label} disabled className={tabClassName}>
              <Icon aria-hidden="true" className="size-6" />
              <span className="sr-only">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <section id={`${id}-posts-panel`} role="tabpanel" aria-labelledby={`${id}-posts-tab`} hidden={selectedTab !== "posts"}>
        {selectedTab === "posts" && <ProfilePosts posts={posts} />}
      </section>
      {isOwnProfile && (
        <section id={`${id}-saved-panel`} role="tabpanel" aria-labelledby={`${id}-saved-tab`} hidden={selectedTab !== "saved"}>
          {selectedTab === "saved" && <ProfilePosts posts={savedPosts} isSaved />}
        </section>
      )}
    </>
  );
}
