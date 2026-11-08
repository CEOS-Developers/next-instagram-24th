"use client";

import { useFollowing } from "@/hooks/useFollowing";

export default function FeedRecommendation({ username }: { username: string }) {
  const { followingUsernames } = useFollowing();
  if (followingUsernames.includes(username)) return null;

  return (
    <span className="mt-0.5 block text-xs font-normal text-gray-500">
      회원님을 위한 추천
    </span>
  );
}
