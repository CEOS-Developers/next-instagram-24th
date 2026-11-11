import "@/styles/globals.css";

export type ProfileStatsProps = {
  postCount: number;
  followerCount: number;
  followingCount: number;
  className?: string;
};

export default function ProfileStats({
  postCount,
  followerCount,
  followingCount,
  className = "",
}: ProfileStatsProps) {
  const stats = [
    { label: "게시물", count: postCount },
    { label: "팔로워", count: followerCount },
    { label: "팔로잉", count: followingCount },
  ];

  return (
    <dl
      aria-label="프로필 통계"
      className={[
        "flex flex-wrap items-center gap-x-5 gap-y-2",
        "font-sans text-body text-text-primary",
        className,
      ].join(" ")}
    >
      {stats.map(({ label, count }) => (
        <div key={label} className="flex items-baseline gap-1">
          <dt>{label}</dt>
          <dd className="font-semibold tabular-nums">
            {count.toLocaleString("ko-KR")}
          </dd>
        </div>
      ))}
    </dl>
  );
}
