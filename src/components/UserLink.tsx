import Link from "next/link";

import type { User } from "@/types";

// 굵은 사용자 이름 + 프로필 링크. 피드/댓글/게시물 상세에서 재사용합니다.
export default function UserLink({
  user,
  className = "",
}: {
  user: Pick<User, "username">;
  className?: string;
}) {
  return (
    <Link href={`/${user.username}`} className={`font-semibold hover:opacity-60 ${className}`}>
      {user.username}
    </Link>
  );
}
