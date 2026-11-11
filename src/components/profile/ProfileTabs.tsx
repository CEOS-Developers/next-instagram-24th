import type { KeyboardEvent, ReactNode } from "react";

export type ProfileTab = "posts" | "reposts" | "tagged";

export type ProfileTabsProps = {
  activeTab: ProfileTab;
  onChange: (tab: ProfileTab) => void;
  /** 탭 패널 요소의 id 앞부분입니다. 패널 id는 `${panelIdPrefix}-${tab}` 형태입니다. */
  panelIdPrefix: string;
};

// 탭 전용 아이콘입니다. 공통 Icon에 추가할지는 A와 상의 후 정합니다.
const tabIcons: Record<ProfileTab, ReactNode> = {
  posts: (
    <g fill="currentColor" stroke="none">
      {[2.5, 9.5, 16.5].flatMap((y) =>
        [2.5, 9.5, 16.5].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" rx="1" />
        )),
      )}
    </g>
  ),
  reposts: (
    <>
      <path d="M4 11.5V10a4 4 0 0 1 4-4h12" />
      <path d="m16.5 2.5 3.5 3.5-3.5 3.5" />
      <path d="M20 12.5V14a4 4 0 0 1-4 4H4" />
      <path d="m7.5 21.5-3.5-3.5 3.5-3.5" />
    </>
  ),
  tagged: (
    <>
      <path d="M9 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-3" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 19.5a6 6 0 0 1 11 0" />
    </>
  ),
};

const tabs: { id: ProfileTab; label: string }[] = [
  { id: "posts", label: "게시물" },
  { id: "reposts", label: "리포스트" },
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
    <div className="border-b border-border">
      <div
        role="tablist"
        aria-label="프로필 게시물 탭"
        className="mx-auto flex max-w-profile-header"
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
              aria-label={tab.label}
              title={tab.label}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={handleKeyDown}
              className={[
                "group flex h-12 flex-1 justify-center",
                "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                isActive
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary",
              ].join(" ")}
            >
              {/* 선택된 탭은 아이콘 아래에 밑줄을 표시합니다. */}
              <span
                className={[
                  "flex h-full w-16 items-center justify-center border-b-2",
                  isActive ? "border-text-primary" : "border-transparent",
                ].join(" ")}
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  {tabIcons[tab.id]}
                </svg>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
