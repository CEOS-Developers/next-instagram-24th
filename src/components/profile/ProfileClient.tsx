"use client";

import { useSyncExternalStore } from "react";
import {
  getFollowState,
  setFollowState,
  subscribeFollowState,
} from "@/lib/followStorage";
import type { User } from "@/types/user";
import { currentUser } from "@/mocks/users";
import ProfileHeader from "./ProfileHeader";

export type ProfileClientProps = {
  user: User;
  postCount: number;
  followedByUsers: User[];
};

export default function ProfileClient({
  user,
  postCount,
  followedByUsers,
}: ProfileClientProps) {
  const isOwnProfile = user.id === currentUser.id;
  const isFollowing = useSyncExternalStore(
    subscribeFollowState,
    () => (isOwnProfile ? false : getFollowState(user.id, user.isFollowedByMe)),
    // 서버와 첫 클라이언트 렌더링은 같은 초기값을 사용합니다.
    () => (isOwnProfile ? false : user.isFollowedByMe),
  );

  function handleToggleFollow() {
    if (isOwnProfile) return;

    const currentValue = getFollowState(user.id, user.isFollowedByMe);
    setFollowState(user.id, !currentValue);
  }

  return (
    <ProfileHeader
      user={user}
      postCount={postCount}
      followedByUsers={followedByUsers}
      isOwnProfile={isOwnProfile}
      isFollowing={isFollowing}
      onToggleFollow={handleToggleFollow}
    />
  );
}
