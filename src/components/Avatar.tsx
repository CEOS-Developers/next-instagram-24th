import Image from "next/image";

import type { User } from "@/types";

type AvatarProps = {
  user: Pick<User, "username" | "avatarUrl">;
  size?: number; // px
  eager?: boolean; // 화면 맨 위의 큰 사진이면 true (지연 로딩 없이 바로 불러옴)
  className?: string;
};

// 프로필 사진. 피드·댓글·프로필 어디서나 재사용합니다.
export default function Avatar({
  user,
  size = 32,
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

  return <span className={`inline-block shrink-0 ${className}`}>{image}</span>;
}
