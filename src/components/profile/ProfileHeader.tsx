import Avatar from "@/components/ui/Avatar";
import type { User } from "@/types/user";
import ProfileActions from "./ProfileActions";
import ProfileStats from "./ProfileStats";

export type ProfileHeaderProps = {
  user: User;
  postCount: number;
  isFollowing: boolean;
  onToggleFollow: () => void;
};

export default function ProfileHeader({
  user,
  postCount,
  isFollowing,
  onToggleFollow,
}: ProfileHeaderProps) {
  // 목데이터의 팔로워 수에 현재 상태와 초기 상태의 차이만 반영합니다.
  const followerCount =
    user.followerCount + Number(isFollowing) - Number(user.isFollowedByMe);

  return (
    <header className="mx-auto flex w-full max-w-profile flex-col gap-6 font-sans text-text-primary sm:flex-row sm:gap-10">
      <Avatar
        src={user.avatarUrl}
        alt={`${user.displayName} 프로필 사진`}
        size="lg"
      />

      <div className="min-w-0 flex-1 space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="min-w-0 break-all text-username font-regular">
            {user.username}
          </h1>
          <ProfileActions
            isFollowing={isFollowing}
            onToggleFollow={onToggleFollow}
          />
        </div>

        <ProfileStats
          postCount={postCount}
          followerCount={followerCount}
          followingCount={user.followingCount}
        />

        <div className="space-y-1 text-body">
          <p className="wrap-anywhere font-semibold">{user.displayName}</p>
          <p className="whitespace-pre-wrap wrap-anywhere">{user.bio}</p>
        </div>
      </div>
    </header>
  );
}
