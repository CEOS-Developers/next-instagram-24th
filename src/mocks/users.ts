import type { User } from "@/types/user";

// 화면의 초기 데이터입니다. 이후 팔로우 변경 상태는 별도로 관리합니다.
export const users: User[] = [
  {
    id: "user-1",
    username: "goat",
    displayName: "고트",
    avatarUrl: "/images/profile.svg",
    bio: "안녕하세요인생최고의고생을하고있는autedi프론트엔드팀입니다.",
    followerCount: 120,
    followingCount: 85,
    isFollowedByMe: false,
  },
  {
    id: "user-2",
    username: "messi",
    displayName: "메시",
    avatarUrl: "/images/profile.svg",
    bio: "안녕하세요",
    followerCount: 980,
    followingCount: 12,
    isFollowedByMe: true,
  },
];
