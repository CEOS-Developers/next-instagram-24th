"use client";

import Link from "next/link";
import Avatar from "@/components/Avatar";
import FollowButton, { useFollowedIds } from "@/components/FollowButton";
import type { User } from "@/types";

const VISIBLE = 3;

// 홈 오른쪽 "회원님을 위한 추천" 목록
// 팔로우를 누르면 그 계정은 목록에서 빠지고, 아직 안 보이던 다음 후보가 자리를 채웁니다.
export default function SuggestedList({ users }: { users: User[] }) {
  const followed = useFollowedIds(users.map(user => user.id));
  const visible = users.filter(user => !followed.includes(user.id)).slice(0, VISIBLE);

  if (visible.length === 0) {
    return <p className="text-sm text-neutral-500">추천할 계정이 없어요.</p>;
  }

  return (
    <ul className="space-y-4">
      {visible.map(user => (
        <li key={user.id} className="flex items-center justify-between gap-3">
          <Link href={`/${user.username}`} className="flex min-w-0 items-center gap-3">
            <Avatar user={user} size={44} />
            <span className="min-w-0 text-sm">
              <strong className="block truncate">{user.username}</strong>
              <span className="text-neutral-500">{user.name}</span>
            </span>
          </Link>
          <FollowButton userId={user.id} />
        </li>
      ))}
    </ul>
  );
}
