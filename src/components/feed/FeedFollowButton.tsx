'use client';

import { currentUserId } from '@/data/users';
import useFollowing from '@/hooks/useFollowing';

/** 홈 피드 헤더의 팔로우 버튼. 누르면 팔로우/팔로잉이 바뀌고 저장된다. */
export default function FeedFollowButton({ userId }: { userId: string }) {
  const { isFollowing, toggleFollow } = useFollowing(currentUserId);
  const following = isFollowing(userId);

  return (
    <button
      type="button"
      aria-pressed={following}
      onClick={() => toggleFollow(userId)}
      className="h-8 shrink-0 cursor-pointer rounded-lg bg-ig-secondary-button-background px-4 text-sm font-semibold"
    >
      {following ? '팔로잉' : '팔로우'}
    </button>
  );
}
