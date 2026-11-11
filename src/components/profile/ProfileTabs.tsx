export type ProfileTab = 'posts' | 'saved' | 'reposts' | 'tagged';

interface ProfileTabsProps {
  isOwnProfile: boolean;
  selectedTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export default function ProfileTabs({
  isOwnProfile,
  selectedTab,
  onTabChange,
}: ProfileTabsProps) {
  const tabs: { id: ProfileTab; label: string }[] = [
    { id: 'posts', label: '게시물' },
    isOwnProfile
      ? { id: 'saved', label: '저장됨' }
      : { id: 'reposts', label: '리포스트' },
    { id: 'tagged', label: '태그됨' },
  ];

  return (
    <div className="flex h-[44px] justify-center gap-x-[4px] border-b-[0.5px] border-[#2b3036]">
      {tabs.map((tab) => {
        const isSelected = tab.id === selectedTab;

        return (
          <div
            key={tab.id}
            className="flex h-[44px] max-w-[193px] flex-1 items-center justify-center"
          >
            <button
              type="button"
              aria-label={tab.label}
              aria-pressed={isSelected}
              onClick={() => onTabChange(tab.id)}
              className={`flex h-[44px] cursor-pointer items-center justify-center border-b-2 px-[20px] ${
                isSelected
                  ? 'border-[#f8f9f9] text-[#f5f5f5]'
                  : 'border-transparent text-[#8e8e8e]'
              }`}
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="block"
              >
                {tab.id === 'posts' &&
                  [1, 9, 17].flatMap((y) =>
                    [3, 9.667, 16.333].map((x) => (
                      <rect
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        width="4.667"
                        height="6"
                        rx="1"
                        ry="1"
                      />
                    ))
                  )}

                {tab.id === 'saved' && (
                  <polygon
                    fill="none"
                    points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                )}

                {tab.id === 'reposts' && (
                  <path d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27z" />
                )}

                {tab.id === 'tagged' && (
                  <>
                    <path d="M21 7.48a2 2 0 0 0-2-2h-3.046a2.002 2.002 0 0 1-1.506-.683l-1.695-1.939a1 1 0 0 0-1.506 0L9.552 4.797c-.38.434-.93.682-1.506.682H5a2 2 0 0 0-2 2V19l.01.206A2 2 0 0 0 5 21h14a2 2 0 0 0 2-2V7.48ZM23 19a4 4 0 0 1-4 4H5a4 4 0 0 1-3.995-3.794L1 19V7.48a4 4 0 0 1 4-4h3.046l1.696-1.94a3 3 0 0 1 4.516 0l1.696 1.94H19a4 4 0 0 1 4 4V19Z" />
                    <path d="M14.5 10.419a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm2 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM12 16.003c3.511 0 6.555 1.99 8.13 4.906a1 1 0 0 1-1.76.95c-1.248-2.31-3.64-3.857-6.37-3.857S6.878 19.55 5.63 21.86a1 1 0 0 1-1.76-.951c1.575-2.915 4.618-4.906 8.13-4.906Z" />
                  </>
                )}
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
