import Image from "next/image";

import type { User } from "@/types";

type AvatarProps = {
  user: Pick<User, "username" | "avatarUrl">;
  size?: number; // px
  hasStory?: boolean; // true 면 그라데이션 링 표시
  eager?: boolean; // 화면 맨 위의 큰 사진이면 true (지연 로딩 없이 바로 불러옴)
  className?: string;
};

// 프로필 사진. 피드·댓글·프로필·스토리 어디서나 재사용합니다.
export default function Avatar({
  user,
  size = 32,
  hasStory = false,
  eager = false,
  className = "",
}: AvatarProps) {
  const image = (
    <Image
      src={user.avatarUrl}
      alt={`${user.username}님의 프로필 사진`}
      width={size}
      height={size}
      loading={eager ? "eager" : undefined}
      className="rounded-full bg-neutral-100 object-cover"
      style={{ width: size, height: size }}
    />
  );

  if (!hasStory) {
    return <span className={`inline-block shrink-0 ${className}`}>{image}</span>;
  }

  return (
    <span
      className={`inline-block shrink-0 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600 p-[2px] ${className}`}
    >
      <span className="block rounded-full bg-white p-[2px]">{image}</span>
    </span>
  );
}
