"use client";

import Link from "next/link";

import Avatar from "@/components/Avatar";
import { currentUser, profiles } from "@/data/profiles";
import { useFollowing } from "@/hooks/useFollowing";

export default function SuggestedAccounts() {
  const { followingUsernames, toggleFollow } = useFollowing();
  const myProfile = profiles.find(
    (profile) => profile.username === currentUser.username,
  );

  const suggestedProfiles = profiles.filter(
    (profile) => profile.username !== currentUser.username && !followingUsernames.includes(profile.username),
  );

  if (!myProfile) return null;

  return (
    <aside
      aria-label="계정 추천"
      className="sticky top-8 hidden h-fit w-72 shrink-0 self-start lg:block"
    >
      <Link
        href={`/${myProfile.username}`}
        className="flex items-center gap-3"
      >
        <Avatar className="size-14" />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {myProfile.username}
          </p>
          {myProfile.displayName && (
            <p className="mt-0.5 text-sm text-neutral-500">
              {myProfile.displayName}
            </p>
          )}
        </div>
      </Link>

      {suggestedProfiles.length > 0 && (
        <>
          <h2 className="mt-7 text-sm font-semibold text-neutral-500">
            회원님을 위한 추천
          </h2>

          <ul className="mt-5 space-y-5">
            {suggestedProfiles.map((profile) => (
              <li
                key={profile.username}
                className="flex items-center justify-between gap-3"
              >
                <Link
                  href={`/${profile.username}`}
                  className="flex min-w-0 items-center gap-3"
                >
                  <Avatar className="size-12" />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {profile.username}
                    </p>
                    {profile.displayName && (
                      <p className="mt-0.5 truncate text-sm text-neutral-500">
                        {profile.displayName}
                      </p>
                    )}
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => toggleFollow(profile.username)}
                  aria-label={`${profile.username} 팔로우`}
                  className="shrink-0 cursor-pointer text-sm font-semibold text-[#4f46ff]"
                >
                  팔로우
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}