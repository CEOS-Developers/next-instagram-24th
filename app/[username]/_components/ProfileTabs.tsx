"use client";

import { defaultUsername } from "@/app/_lib/profile";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type ProfileTab = {
  segment: string | null;
  label: string;
  icon: string;
  activeIcon?: string;
};

export default function ProfileTabs({ username }: { username: string }) {
  const activeSegment = useSelectedLayoutSegment();
  const profileHref = `/${username}`;
  const tabs: ProfileTab[] = [
    { segment: null, label: "게시물", icon: "feeds" },
    username === defaultUsername
      ? { segment: "saved", label: "저장됨", icon: "bookmark", activeIcon: "bookmark-filled" }
      : { segment: "reels", label: "릴스", icon: "reels", activeIcon: "reels-filled" },
    { segment: "reposts", label: "리포스트", icon: "repost" },
    { segment: "tagged", label: "태그됨", icon: "tagged", activeIcon: "tagged-filled" },
  ];

  return (
    <nav aria-label="프로필 탭" className="grid h-[--spacing(11.125)] grid-cols-4">
      {tabs.map((tab) => {
        const isActive = activeSegment === tab.segment;
        const icon = isActive ? tab.activeIcon ?? tab.icon : tab.icon;

        return (
          <Link
            key={tab.icon}
            href={tab.segment ? `${profileHref}/${tab.segment}` : profileHref}
            scroll={false}
            aria-label={tab.label}
            aria-current={isActive ? "page" : undefined}
            className="group flex justify-center"
          >
            <span className="flex h-full items-center border-b-2 border-transparent px-5 group-aria-[current=page]:border-foreground">
              <span
                aria-hidden="true"
                className="size-6 shrink-0 bg-[#8e8e8e] mask-contain mask-center mask-no-repeat group-aria-[current=page]:bg-black dark:group-aria-[current=page]:bg-white"
                style={{ maskImage: `url(/icons/${icon}.svg)` }}
              />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
