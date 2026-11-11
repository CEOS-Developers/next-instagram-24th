import Avatar from '@/components/common/Avatar';
import ProfileActions from '@/components/profile/ProfileActions';
import ProfileFollowStats from '@/components/profile/ProfileFollowStats';
import type { User } from '@/types/user';

interface ProfileHeaderProps {
  user: User;
  postCount: number;
  isOwnProfile: boolean;
}

export default function ProfileHeader({
  user,
  postCount,
  isOwnProfile,
}: ProfileHeaderProps) {
  return (
    <header className="mx-auto mb-[16px] w-full max-w-[680px] text-[#f5f5f5]">
      <div className="flex items-center">
        <div
          className={`mr-[28px] shrink-0 ${isOwnProfile ? 'pt-[31px]' : ''}`}
        >
          <Avatar
            src={user.profileImage}
            alt={`${user.username} 프로필`}
            size={150}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="my-[16px] flex flex-col items-start gap-y-[4px]">
            <h1 className="text-[24px] leading-[30px] font-bold">
              {user.username}
            </h1>

            <p className="text-[14px] leading-[18px] font-normal">
              {user.name}
            </p>

            <ul className="flex items-center gap-x-[16px] text-[14px] leading-[18px]">
              <li>
                게시물 <span className="font-semibold">{postCount}</span>
              </li>
              <ProfileFollowStats user={user} isOwnProfile={isOwnProfile} />
            </ul>
          </div>

          {user.bio && (
            <p className="whitespace-pre-wrap text-[14px] leading-[18px]">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <ProfileActions
        key={user.id}
        userId={user.id}
        isOwnProfile={isOwnProfile}
      />
    </header>
  );
}
