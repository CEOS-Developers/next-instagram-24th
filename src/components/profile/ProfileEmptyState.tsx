import Image from 'next/image';

import type { ProfileTab } from '@/components/profile/ProfileTabs';

interface ProfileEmptyStateProps {
  tab: ProfileTab;
  isOwnProfile: boolean;
}

const ownStates = {
  posts: {
    title: '사진 공유',
    description: '사진을 공유하면 회원님의 프로필에 표시됩니다.',
    icon: '/images/empty-posts.svg',
  },
  saved: {
    title: '저장',
    description:
      '다시 보고 싶은 사진과 동영상을 저장하세요. 콘텐츠를 저장해도 다른 사람에게 알림이 전송되지 않으며, 저장된 콘텐츠는 회원님만 볼 수 있습니다.',
    icon: '/images/empty-saved.svg',
  },
  tagged: {
    title: '내가 나온 사진',
    description:
      '사람들이 회원님을 사진에 태그하면 태그된 사진이 여기에 표시됩니다.',
    icon: '/images/empty-tagged.svg',
  },
};

export default function ProfileEmptyState({
  tab,
  isOwnProfile,
}: ProfileEmptyStateProps) {
  if (
    (isOwnProfile && tab === 'reposts') ||
    (!isOwnProfile && tab === 'saved')
  ) {
    return null;
  }

  const state = isOwnProfile
    ? ownStates[tab as keyof typeof ownStates]
    : {
        title:
          tab === 'reposts'
            ? '리포스트 없음'
            : tab === 'tagged'
              ? '태그 없음'
              : '게시물 없음',
        description: '',
        icon:
          tab === 'tagged'
            ? '/images/empty-tagged.svg'
            : '/images/empty-posts.svg',
      };

  return (
    <div className="flex flex-col items-center text-[#f5f5f5]">
      <div
        className={`mx-[44px] mt-[60px] flex max-w-[350px] flex-col items-center text-center ${isOwnProfile ? 'mb-[60px]' : ''}`}
      >
        <Image src={state.icon} alt="" width={62} height={62} />
        <h2 className="my-[24px] text-[24px] leading-[30px] font-bold">
          {state.title}
        </h2>
        {state.description && (
          <p className="mb-[24px] text-[14px] leading-[18px] font-normal">
            {state.description}
          </p>
        )}
        {isOwnProfile && tab === 'posts' && (
          <button
            type="button"
            className="cursor-pointer text-[14px] leading-[18px] font-medium text-[#85a1ff]"
          >
            첫 사진 공유하기
          </button>
        )}
      </div>
    </div>
  );
}
