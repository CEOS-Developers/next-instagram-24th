import type { KeyboardEvent, ReactNode } from "react";

export type ProfileTab = "posts" | "saved" | "tagged";

export type ProfileTabsProps = {
  activeTab: ProfileTab;
  onChange: (tab: ProfileTab) => void;
  /** 탭 패널 요소의 id 앞부분입니다. 패널 id는 `${panelIdPrefix}-${tab}` 형태입니다. */
  panelIdPrefix: string;
};

// 탭 전용 아이콘입니다. 공통 Icon에 추가할지는 A와 상의 후 정합니다.
const tabIcons: Record<ProfileTab, ReactNode> = {
  posts: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </>
  ),
  saved: <path d="M19 21 12 16 5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17Z" />,
  tagged: (
    <>
      <path d="M10.2 18.6 12 21l1.8-2.4H19a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11.6a2 2 0 0 0 2 2h5.2Z" />
      <circle cx="12" cy="9" r="3" />
      <path d="M7 16a5 5 0 0 1 10 0" />
    </>
  ),
};

const tabs: { id: ProfileTab; label: string }[] = [
  { id: "posts", label: "게시물" },
  { id: "saved", label: "저장됨" },
  { id: "tagged", label: "태그됨" },
];

export default function ProfileTabs({
  activeTab,
  onChange,
  panelIdPrefix,
}: ProfileTabsProps) {
  // 좌우 방향키로 탭을 이동합니다. (WAI-ARIA 탭 패턴)
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = tabs[(currentIndex + direction + tabs.length) % tabs.length];

    onChange(nextTab.id);
    document.getElementById(`${panelIdPrefix}-tab-${nextTab.id}`)?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="프로필 게시물 탭"
      className="flex justify-center gap-15 border-t border-border"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            id={`${panelIdPrefix}-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${panelIdPrefix}-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={handleKeyDown}
            className={[
              "-mt-px flex h-13 items-center gap-1.5 border-t text-caption font-semibold tracking-wider",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              isActive
                ? "border-text-primary text-text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary",
            ].join(" ")}
          >
            <svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              {tabIcons[tab.id]}
            </svg>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
