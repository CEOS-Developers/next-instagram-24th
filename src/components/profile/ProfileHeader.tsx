import Avatar from "@/components/ui/Avatar";
import type { User } from "@/types/user";
import ProfileActions from "./ProfileActions";
import ProfileFollowedBy from "./ProfileFollowedBy";
import ProfileStats from "./ProfileStats";

export type ProfileHeaderProps = {
  user: User;
  postCount: number;
  followedByUsers: User[];
  isFollowing: boolean;
  onToggleFollow: () => void;
  onMessage?: () => void;
};

export default function ProfileHeader({
  user,
  postCount,
  followedByUsers,
  isFollowing,
  onToggleFollow,
  onMessage,
}: ProfileHeaderProps) {
  // 목데이터의 팔로워 수에 현재 상태와 초기 상태의 차이만 반영합니다.
  const followerCount =
    user.followerCount + Number(isFollowing) - Number(user.isFollowedByMe);

  return (
    <header className="mx-auto w-full max-w-profile-header space-y-6 font-sans text-text-primary">
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-7">
        <div className="shrink-0 self-center sm:self-start">
          <Avatar
            src={user.avatarUrl}
            alt={`${user.displayName} 프로필 사진`}
            size="profile"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="space-y-1">
            <h1 className="break-all text-profile-title font-semibold">
              {user.username}
            </h1>
            <p className="wrap-anywhere text-body">{user.displayName}</p>
          </div>

          <ProfileStats
            postCount={postCount}
            followerCount={followerCount}
            followingCount={user.followingCount}
          />

          <p className="whitespace-pre-wrap wrap-anywhere text-body">
            {user.bio}
          </p>

          <ProfileFollowedBy users={followedByUsers} />
        </div>
      </div>

      <ProfileActions
        isFollowing={isFollowing}
        onToggleFollow={onToggleFollow}
        onMessage={onMessage}
      />
    </header>
  );
}
