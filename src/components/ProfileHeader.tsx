import { ChevronDown, Ellipsis, Settings, UserPlus, UserRound } from "lucide-react";
import type { Profile } from "@/data/profiles";

type ProfileHeaderProps = {
  profile: Profile;
  postCount: number;
  isOwnProfile: boolean;
  isFollowing: boolean;
};

const buttonClassName =
  "flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-xl px-3 text-sm font-semibold cursor-not-allowed";

export default function ProfileHeader({
  profile,
  postCount,
  isOwnProfile,
  isFollowing,
}: ProfileHeaderProps) {
  return (
    <header className="mx-4 max-w-3xl md:mx-auto">
      <div className="flex items-center gap-5 sm:gap-8">
        <div
          aria-hidden="true"
          className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 text-gray-400 sm:size-36"
        >
          <UserRound strokeWidth={1.2} className="size-16 sm:size-24" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="min-w-0 break-all text-lg font-bold sm:text-2xl">
              {profile.username}
            </h1>
            <button
              type="button"
              disabled
              aria-label={isOwnProfile ? "프로필 설정" : "프로필 더 보기"}
              title={isOwnProfile ? "프로필 설정" : "프로필 더 보기"}
              className="grid size-9 shrink-0 cursor-not-allowed place-items-center"
            >
              {isOwnProfile ? (
                <Settings size={22} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Ellipsis size={22} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
          </div>
          <p className="mt-1 text-sm">{profile.displayName}</p>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm sm:mt-4 sm:gap-x-6">
            <li className="whitespace-nowrap">게시물 <strong>{postCount}</strong></li>
            <li className="whitespace-nowrap">팔로워 <strong>{profile.followers}</strong></li>
            <li className="whitespace-nowrap">팔로우 <strong>{profile.following}</strong></li>
          </ul>

          {profile.bio && (
            <p className="mt-4 whitespace-pre-line break-words text-sm">{profile.bio}</p>
          )}
        </div>
      </div>

      {isOwnProfile ? (
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled
            title="프로필 편집"
            className={`${buttonClassName} bg-gray-100`}
          >
            프로필 편집
          </button>
          <button
            type="button"
            disabled
            title="보관함 보기"
            className={`${buttonClassName} bg-gray-100`}
          >
            보관함 보기
          </button>
        </div>
      ) : (
        <div className={`mt-6 grid gap-2 ${isFollowing ? "grid-cols-[minmax(0,1fr)_minmax(0,1fr)_44px]" : "grid-cols-[minmax(0,1fr)_44px]"}`}>
          <button
            type="button"
            disabled
            title={isFollowing ? "팔로잉 관리" : "팔로우"}
            className={`${buttonClassName} ${isFollowing ? "bg-gray-100" : "bg-[#4a5df9] text-white"}`}
          >
            {isFollowing ? (
              <>팔로잉 <ChevronDown size={16} aria-hidden="true" /></>
            ) : "팔로우"}
          </button>
          {isFollowing && (
            <button
              type="button"
              disabled
              title="메시지 보내기"
              className={`${buttonClassName} bg-gray-100`}
            >
              메시지 보내기
            </button>
          )}
          <button
            type="button"
            disabled
            aria-label="추천 계정"
            title="추천 계정"
            className={`${buttonClassName} bg-gray-100`}
          >
            <UserPlus size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      )}
    </header>
  );
}
