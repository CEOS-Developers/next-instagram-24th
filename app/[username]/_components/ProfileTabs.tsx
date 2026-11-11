"use client";

import { useState } from "react";

const tabs = [
  { icon: "feeds", label: "게시물" },
  { icon: "bookmark", label: "저장됨" },
  { icon: "repost", label: "리포스트" },
  { icon: "tagged", label: "태그됨" },
] as const;

type ProfileTab = (typeof tabs)[number]["icon"];

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("feeds");

  return (
    <div
      role="group"
      aria-label="프로필 탭"
      className="grid h-[--spacing(11.125)] grid-cols-4"
    >
      {tabs.map(({ icon, label }) => (
        <button
          key={icon}
          type="button"
          disabled={icon !== "feeds"}
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
  );
}
