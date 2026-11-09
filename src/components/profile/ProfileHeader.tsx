import { UserRound } from "lucide-react";
import type { Profile } from "@/data/profiles";

type ProfileHeaderProps = {
  profile: Profile;
  postCount: number;
};

export default function ProfileHeader({ profile, postCount }: ProfileHeaderProps) {
  const stats = [
    { label: "게시물", count: postCount },
    { label: "팔로워", count: profile.followers },
    { label: "팔로우", count: profile.following },
  ];

  return (
    <header className="flex items-start gap-4 px-4 py-8 sm:items-center sm:gap-8 sm:px-8 sm:py-12">
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 text-gray-500/85 sm:size-32 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
        <UserRound
          aria-hidden="true"
          fill="currentColor"
          stroke="none"
          className="size-[110%] max-w-none shrink-0 translate-y-[9%]"
        />
      </div>
      <div className="min-w-0">
        <h1 className="text-xl font-semibold wrap-break-word sm:text-2xl">
          {profile.username}
        </h1>
        {profile.displayName && <p className="mt-1">{profile.displayName}</p>}
        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm sm:gap-x-6 sm:text-base">
          {stats.map(({ label, count }) => (
            <div key={label} className="flex gap-1">
              <dt>{label}</dt>
              <dd className="font-semibold">{count.toLocaleString("ko-KR")}</dd>
            </div>
          ))}
        </dl>
        {profile.bio && <p className="mt-3 whitespace-pre-wrap">{profile.bio}</p>}
      </div>
    </header>
  );
}
