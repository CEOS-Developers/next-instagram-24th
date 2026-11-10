"use client";

import { useState } from "react";
import type { User } from "@/types/user";
import ProfileHeader from "./ProfileHeader";

export type ProfileClientProps = {
  user: User;
  postCount: number;
};

export default function ProfileClient({ user, postCount }: ProfileClientProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowedByMe);

  function handleToggleFollow() {
    setIsFollowing((previous) => !previous);
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
