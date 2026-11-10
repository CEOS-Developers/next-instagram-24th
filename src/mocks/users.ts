import type { User } from "@/types/instagram";

// 화면의 초기 데이터입니다. 이후 팔로우 변경 상태는 별도로 관리합니다.
export const users: User[] = [
  {
    id: "user-1",
    username: "goat",
    displayName: "고트",
    avatarUrl: "/images/profile.svg",
    bio: "일상을 기록합니다 📷\n커피와 산책을 좋아해요.",
    followerCount: 120,
    followingCount: 85,
    isFollowedByMe: false,
  },
];
