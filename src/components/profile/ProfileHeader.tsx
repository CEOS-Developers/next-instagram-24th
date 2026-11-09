"use client";

import { Ellipsis, Settings, UserPlus } from "lucide-react";
import Avatar from "@/components/Avatar";
import { currentUser, type Profile } from "@/data/profiles";
import { useFollowing } from "@/hooks/useFollowing";

type ProfileHeaderProps = {
  profile: Profile;
  postCount: number;
};

const profileButtonClassName =
  "min-h-10 rounded-xl bg-neutral-100 px-3 py-2 text-sm font-semibold dark:bg-neutral-800";

export default function ProfileHeader({ profile, postCount }: ProfileHeaderProps) {
  const isOwnProfile = profile.username === currentUser.username;
  const { followingUsernames, toggleFollow } = useFollowing();
  const isFollowing = followingUsernames.includes(profile.username);
  const wasFollowing = currentUser.followingUsernames.includes(profile.username);
  const followerCount = profile.followers + Number(isFollowing) - Number(wasFollowing);
  const followingCount = isOwnProfile
    ? profile.following + followingUsernames.length - currentUser.followingUsernames.length
    : profile.following;

  const stats = [
    { label: "게시물", count: postCount },
    { label: "팔로워", count: followerCount },
    { label: "팔로우", count: followingCount },
  ];

  return (
    <header className="mx-auto w-full max-w-2xl px-4 pt-10 pb-6 sm:pt-14 sm:pb-8">
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="relative shrink-0">
          <Avatar className="size-20 sm:size-36 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400" />
          {isOwnProfile && (
            <button
              type="button"
              disabled
              aria-label="프로필 메모"
              className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-xl bg-white px-2.5 py-1.5 text-xs whitespace-nowrap text-neutral-500 shadow-md dark:bg-neutral-800 dark:text-neutral-300"
            >
              메모...
            </button>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="min-w-0 text-xl font-semibold wrap-break-word sm:text-2xl">
              {profile.username}
            </h1>
            <button
              type="button"
              disabled
              aria-label={isOwnProfile ? "프로필 설정" : "프로필 더 보기"}
              className="grid size-8 shrink-0 place-items-center"
            >
              {isOwnProfile ? (
                <Settings aria-hidden="true" className="size-5" />
              ) : (
                <Ellipsis aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
          {profile.displayName && <p className="mt-1">{profile.displayName}</p>}
          <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm sm:gap-x-6 sm:text-base">
            {stats.map(({ label, count }) => (
              <div key={label} className="flex gap-1">
                <dt>{label}</dt>
                <dd className="font-semibold">{count.toLocaleString("ko-KR")}</dd>
              </div>
            ))}
          </dl>
          {profile.bio && <p className="mt-3 whitespace-pre-wrap">{profile.bio}</p>}
        </div>
      </div>

      {isOwnProfile ? (
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button type="button" disabled className={profileButtonClassName}>프로필 편집</button>
          <button type="button" disabled className={profileButtonClassName}>보관함 보기</button>
        </div>
      ) : (
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => toggleFollow(profile.username)}
            aria-label={isFollowing ? "팔로잉, 팔로우 취소" : "팔로우"}
            className={
              isFollowing
                ? profileButtonClassName + " flex-1 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                : "min-h-10 flex-1 rounded-xl bg-[#4a5df9] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3f50df]"
            }
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </button>
          {isFollowing && (
            <button type="button" disabled className={profileButtonClassName + " flex-1"}>
              메시지 보내기
            </button>
          )}
          <button type="button" disabled aria-label="추천 계정" className={profileButtonClassName}>
            <UserPlus aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}
    </header>
  );
}
