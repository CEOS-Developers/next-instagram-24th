import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import type { User } from "@/types/user";

type ProfileFollowedByProps = {
  users: User[];
};

export default function ProfileFollowedBy({ users }: ProfileFollowedByProps) {
  if (users.length === 0) return null;

  return (
    <ul
      aria-label="이 계정을 팔로우하는 사용자"
      className="flex flex-wrap gap-x-4 gap-y-2"
    >
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center gap-1 text-body text-text-primary"
        >
          <Link
            href={`/${encodeURIComponent(user.username)}`}
            aria-label={`${user.displayName} 프로필로 이동`}
            className="inline-flex min-w-0 items-center gap-2 rounded-button text-text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Avatar src={user.avatarUrl} alt="" size="sm" />
            <span className="wrap-anywhere font-semibold">{user.displayName}</span>
          </Link>
          <span>님이 팔로우합니다</span>
        </li>
      ))}
    </ul>
  );
}
