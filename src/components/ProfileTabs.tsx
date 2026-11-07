import { Bookmark, ContactRound, Grid3X3, Repeat2 } from "lucide-react";

export default function ProfileTabs({ isOwnProfile }: { isOwnProfile: boolean }) {
  const tabs = [
    { label: "게시물", icon: Grid3X3, selected: true },
    ...(isOwnProfile ? [{ label: "저장됨", icon: Bookmark, selected: false }] : []),
    { label: "리포스트", icon: Repeat2, selected: false },
    { label: "태그됨", icon: ContactRound, selected: false },
  ];
  const itemClassName =
    "mx-auto flex h-14 w-full max-w-24 items-center justify-center border-b-2 sm:h-16";

  return (
    <nav aria-label="프로필 게시물 분류" className="border-b border-gray-200">
      <ul className="flex">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;

          return (
            <li key={tab.label} className="min-w-0 flex-1">
              {tab.selected ? (
                <span
                  aria-current="true"
                  title={tab.label}
                  className={`${itemClassName} border-black text-black`}
                >
                  <TabIcon size={24} strokeWidth={2.5} aria-hidden="true" />
                  <span className="sr-only">{tab.label}</span>
                </span>
              ) : (
                <button
                  type="button"
                  disabled
                  title={tab.label}
                  className={`${itemClassName} cursor-not-allowed border-transparent text-gray-400`}
                >
                  <TabIcon size={24} strokeWidth={1.8} aria-hidden="true" />
                  <span className="sr-only">{tab.label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
