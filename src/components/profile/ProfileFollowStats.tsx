'use client';

import { currentUserId } from '@/data/users';
import useFollowing from '@/hooks/useFollowing';
import type { User } from '@/types/user';

/*
 * 프로필의 팔로워·팔로우 수.
 * - 다른 사람 프로필: 내가 팔로우하면 팔로워 +1
 * - 내 프로필: 내가 팔로우한 사람 수만큼 팔로우 +
 */
export default function ProfileFollowStats({
  user,
  isOwnProfile,
}: {
  user: User;
  isOwnProfile: boolean;
}) {
  const { followingIds, isFollowing } = useFollowing(currentUserId);

  const followersCount =
    user.followersCount + (!isOwnProfile && isFollowing(user.id) ? 1 : 0);
  const followingCount =
    user.followingCount + (isOwnProfile ? followingIds.length : 0);

  return (
    <>
      <li>
        팔로워 <span className="font-semibold">{followersCount}</span>
      </li>
      <li>
        팔로우 <span className="font-semibold">{followingCount}</span>
      </li>
    </>
  );
}
