"use client";

import { useSyncExternalStore } from "react";
import {
  getFollowState,
  setFollowState,
  subscribeFollowState,
} from "@/lib/followStorage";
import type { User } from "@/types/user";
import ProfileHeader from "./ProfileHeader";

export type ProfileClientProps = {
  user: User;
  postCount: number;
};

export default function ProfileClient({ user, postCount }: ProfileClientProps) {
  const isFollowing = useSyncExternalStore(
    subscribeFollowState,
    () => getFollowState(user.id, user.isFollowedByMe),
    // 서버와 첫 클라이언트 렌더링은 같은 초기값을 사용합니다.
    () => user.isFollowedByMe,
  );

  function handleToggleFollow() {
    const currentValue = getFollowState(user.id, user.isFollowedByMe);
    setFollowState(user.id, !currentValue);
  }

  return (
    <ProfileHeader
      user={user}
      postCount={postCount}
      isFollowing={isFollowing}
      onToggleFollow={handleToggleFollow}
    />
  );
}
