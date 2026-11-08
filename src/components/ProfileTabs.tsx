"use client";

import { Bookmark, ContactRound, Grid3X3, Repeat2 } from "lucide-react";

export type ProfileTab = "posts" | "saved";

export default function ProfileTabs({ isOwnProfile, selectedTab, onTabChange }: {
  isOwnProfile: boolean;
  selectedTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}) {
  const tabs = [
    { label: "게시물", icon: Grid3X3, id: "posts" as const },
    ...(isOwnProfile ? [{ label: "저장됨", icon: Bookmark, id: "saved" as const }] : []),
    { label: "리포스트", icon: Repeat2, id: null },
    { label: "태그됨", icon: ContactRound, id: null },
  ];
  const itemClassName =
    "mx-auto flex h-14 w-full max-w-24 items-center justify-center border-b-2 sm:h-16";

  return (
    <nav aria-label="프로필 게시물 분류" className="border-b border-gray-200">
      <ul className="flex">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const selected = tab.id === selectedTab;

          return (
            <li key={tab.label} className="min-w-0 flex-1">
              <button
                type="button"
                disabled={tab.id === null}
                aria-pressed={tab.id !== null ? selected : undefined}
                onClick={() => { if (tab.id) onTabChange(tab.id); }}
                title={tab.label}
                className={`${itemClassName} focus-visible:outline-2 focus-visible:-outline-offset-2 ${selected ? "border-black text-black" : "border-transparent text-gray-400"} ${tab.id ? "cursor-pointer hover:text-black" : "cursor-not-allowed"}`}
              >
                <TabIcon size={24} strokeWidth={selected ? 2.5 : 1.8} aria-hidden="true" />
                <span className="sr-only">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
