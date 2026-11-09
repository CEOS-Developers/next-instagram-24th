import ProfileNote from "./ProfileNote";
import Avatar from "@/components/Avatar";
import { formatCount } from "@/lib/format";
import type { User } from "@/types";

type ProfileHeaderProps = {
  user: User;
  postCount: number;
  isMe: boolean; // 내 프로필이면 "프로필 편집", 아니면 "팔로우" 버튼
};

// 프로필 상단: 사진, 아이디, 버튼, 게시물/팔로워/팔로잉 수, 이름, 소개
// 버튼은 아직 동작하지 않는 정적인 UI 입니다. (팔로우는 선택 요건에서 Client Component 로 분리 예정)
export default function ProfileHeader({ user, postCount, isMe }: ProfileHeaderProps) {
  const stats = [
    { label: "게시물", value: postCount },
    { label: "팔로워", value: user.followerCount },
    { label: "팔로잉", value: user.followingCount },
  ];

  const button = isMe ? (
    <button
      type="button"
      className="rounded-lg bg-neutral-100 w-full px-4 py-2.5 text-sm font-semibold hover:bg-neutral-200"
    >
      프로필 편집
    </button>
  ) : (
    <button
      type="button"
      className="rounded-lg bg-sky-500 px-5 py-1.5 text-sm font-semibold text-white hover:bg-sky-600"
    >
      팔로우
    </button>
  );

  return (
    <header className="px-4 pt-8 pb-10 md:px-0 md:pt-16 md:pb-16">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-4 md:gap-x-12 md:px-5">
        <div className="relative w-fit md:row-span-2">
          {isMe && <ProfileNote userId={user.id} />}
          <div className="md:hidden"><Avatar user={user} size={77} eager /></div>
          <div className="hidden md:block"><Avatar user={user} size={150} eager /></div>
        </div>
        <div className="min-w-0 md:self-end">
          <h1 className="break-words text-2xl font-bold tracking-tight md:text-3xl">{user.username}</h1>
          <p className="mt-1 text-sm md:text-base">{user.name}</p>
        </div>
        <div className="col-span-2 min-w-0 space-y-3 text-sm md:col-span-1 md:self-start">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 md:text-base">
            {stats.map(({ label, value }) => (
              <li key={label}><strong>{formatCount(value)}</strong> {label}</li>
            ))}
          </ul>
          <div className="break-words">
          {user.bio && <p className="whitespace-pre-line">{user.bio}</p>}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-900 hover:underline"
            >
              {user.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-10">{button}</div>
    </header>
  );
}
