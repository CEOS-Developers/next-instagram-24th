"use client";

import { defaultUsername } from "@/app/_lib/profile";
import ProfileAvatar from "@/components/ProfileAvatar";
import type { MockProfile } from "@/data/profiles";
import { toggleFollow, useFollowedUsernames } from "../_lib/follows";

const disabledActionClassName = "h-8 min-w-0 max-w-87.5 flex-1 rounded-lg bg-[#f0f2f5] text-sm font-bold disabled:cursor-not-allowed dark:text-neutral-900";

export default function Profile({ profile, postCount }: { profile: MockProfile; postCount: number }) {
  const followedUsernames = useFollowedUsernames();
  const isOwnProfile = profile.username === defaultUsername;
  const isFollowing = followedUsernames.includes(profile.username);
  const profileStats = [
    { label: "게시물", count: postCount, interactive: false },
    { label: "팔로워", count: profile.followers + Number(isFollowing), interactive: true },
    { label: "팔로우", count: profile.following + (isOwnProfile ? followedUsernames.length : 0), interactive: true },
  ];

  return (
    <div className="px-4">
      <div className="flex h-27 items-center">
        <button
          type="button"
          disabled
          aria-label="프로필 사진"
          className="mr-7 flex w-27 shrink-0 justify-center enabled:cursor-pointer disabled:cursor-not-allowed"
        >
          <ProfileAvatar src={profile.avatar} size={77} className="border border-foreground/15" />
        </button>
        <div className="my-4 min-w-0 flex-1 text-sm font-semibold">
          <h1 className="truncate">{profile.username}</h1>
          <ul className="mt-2 grid w-43.25 h-9 max-w-full grid-cols-3 gap-2">
            {profileStats.map(({ label, count, interactive }) => {
              const stat = (
                <>
                  <span className="font-medium">{label}</span>
                  <span>{count}</span>
                </>
              );

              return (
                <li key={label} className="flex flex-col">
                  {interactive ? (
                    <button
                      type="button"
                      disabled
                      className="flex flex-col items-start enabled:cursor-pointer disabled:cursor-not-allowed"
                    >
                      {stat}
                    </button>
                  ) : (
                    stat
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="h-7.5">
        <span className="font-semibold">{profile.name}</span>
      </div>
      <div className="box-content flex h-8 justify-center gap-2 py-3">
        {isOwnProfile ? (
          <button type="button" disabled className={disabledActionClassName}>
            프로필 편집
          </button>
        ) : (
          <button
            type="button"
            aria-label={isFollowing ? "팔로잉 취소" : undefined}
            onClick={() => toggleFollow(profile.username)}
            className={`h-8 min-w-0 max-w-87.5 flex-1 cursor-pointer rounded-lg text-sm font-bold ${
              isFollowing
                ? "bg-[#f0f2f5] text-neutral-900 hover:bg-neutral-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </button>
        )}
        <button type="button" disabled className={disabledActionClassName}>
          {isOwnProfile ? "보관함 보기" : "메시지 보내기"}
        </button>
      </div>
    </div>
  );
}
