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
      className="rounded-lg bg-neutral-100 px-4 py-1.5 text-sm font-semibold hover:bg-neutral-200"
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
    <header className="flex flex-col gap-4 px-4 pt-6 pb-8 md:flex-row md:gap-24 md:px-0 md:pt-8 md:pb-11">
      <div className="flex items-center gap-6 md:block md:w-[150px] md:shrink-0 md:pl-12 md:box-content">
        {/* 화면 크기에 따라 사진 크기만 다르게 */}
        {/* (Avatar 자체가 inline-block 이라 hidden 은 바깥 div 에 줘야 충돌하지 않음) */}
        <div className="md:hidden">
          <Avatar user={user} size={77} eager />
        </div>
        <div className="hidden md:block">
          <Avatar user={user} size={150} eager />
        </div>

        {/* 모바일: 사진 옆에 아이디 + 버튼 */}
        <div className="flex min-w-0 flex-col items-start gap-3 md:hidden">
          <h1 className="truncate text-xl">{user.username}</h1>
          {button}
        </div>
      </div>

      <section className="flex flex-col gap-5">
        {/* 데스크톱: 아이디 + 버튼 */}
        <div className="hidden items-center gap-5 md:flex">
          <h1 className="text-xl">{user.username}</h1>
          {button}
        </div>

        <ul className="flex justify-around border-y border-neutral-200 py-3 text-center text-sm md:justify-start md:gap-10 md:border-0 md:p-0 md:text-base">
          {stats.map((stat) => (
            <li key={stat.label} className="flex flex-col md:flex-row md:gap-1">
              <span className="text-neutral-500 md:order-first md:text-neutral-900">
                {stat.label}
              </span>
              <span className="font-semibold">{formatCount(stat.value)}</span>
            </li>
          ))}
        </ul>

        <div className="text-sm">
          <p className="font-semibold">{user.name}</p>
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
      </section>
    </header>
  );
}
