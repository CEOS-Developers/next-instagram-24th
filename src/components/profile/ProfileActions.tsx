'use client';

import { currentUserId } from '@/data/users';
import useFollowing from '@/hooks/useFollowing';

interface ProfileActionsProps {
  userId: string;
  isOwnProfile: boolean;
}

export default function ProfileActions({
  userId,
  isOwnProfile,
}: ProfileActionsProps) {
  const following = useFollowing(currentUserId);
  const isFollowing = following.isFollowing(userId);
  const buttonClass =
    'h-[44px] cursor-pointer rounded-[12px] px-[20px] py-[13px] text-[14px] leading-[18px] font-semibold text-white';

  return (
    <div className="mt-[12px] py-[12px]">
      <div className="flex items-center gap-x-[8px]">
        {isOwnProfile ? (
          <>
            <button
              type="button"
              className={`${buttonClass} min-w-0 flex-1 bg-[#25292e]`}
            >
              프로필 편집
            </button>
            <button
              type="button"
              className={`${buttonClass} min-w-0 flex-1 bg-[#25292e]`}
            >
              보관함 보기
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-auto">
              <button
                type="button"
                aria-pressed={isFollowing}
                onClick={() => following.toggleFollow(userId)}
                className={`${buttonClass} w-full ${isFollowing ? 'bg-[#25292e]' : 'bg-[#4a5df9]'}`}
              >
                {isFollowing ? (
                  <span className="flex items-center justify-center px-[4px]">
                    팔로잉
                    <span className="ml-[4px] flex justify-center">
                      <svg
                        aria-hidden="true"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="block rotate-180 text-[#f5f5f5]"
                      >
                        <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z" />
                      </svg>
                    </span>
                  </span>
                ) : (
                  '팔로우'
                )}
              </button>
            </div>
            {isFollowing && (
              <div className="flex flex-auto">
                <button
                  type="button"
                  className={`${buttonClass} flex w-full items-center justify-center bg-[#25292e]`}
                >
                  메시지 보내기
                </button>
              </div>
            )}
            <button
              type="button"
              aria-label="비슷한 계정"
              className="flex h-[44px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-[12px] bg-[#25292e] p-[8px] text-[#f5f5f5]"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 14V8a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0Z" />
                <path d="M8 10a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h6Zm9.5-2.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm2 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-4.501 5.667c3.147 0 5.945 1.495 7.61 3.801.889 1.231.185 2.837-1.18 3.215-1.34.372-3.549.817-6.429.817-2.878 0-5.091-.447-6.44-.822-1.37-.38-2.048-1.995-1.17-3.212 1.666-2.305 4.463-3.8 7.609-3.8Zm0 2c-2.51 0-4.702 1.191-5.987 2.971-.01.015-.012.024-.012.024 0 .003 0 .01.004.02s.012.023.024.035c.012.01.032.025.068.035C10.297 18.585 12.33 19 15 19c2.674 0 4.7-.413 5.895-.744a.182.182 0 0 0 .076-.038.096.096 0 0 0 .025-.038.044.044 0 0 0 .004-.017s0-.008-.012-.024c-1.285-1.78-3.478-2.972-5.989-2.972Z" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
