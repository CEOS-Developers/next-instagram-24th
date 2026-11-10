import type { User } from "@/types/user";

// 화면의 초기 데이터입니다. 이후 팔로우 변경 상태는 별도로 관리합니다.
export const users: User[] = [
  {
    id: "user-1",
    username: "ronaldo7",
    displayName: "호날두",
    avatarUrl: "/images/siu.png",
    bio: "나 국대 안해.",
    followerCount: 120,
    followingCount: 85,
    followedByIds: ["user-2"],
    isFollowedByMe: false,
  },
  {
    id: "user-2",
    username: "messi",
    displayName: "메시",
    avatarUrl: "/images/messigimotti.jpeg",
    bio: "메시기모띠",
    followerCount: 980,
    followingCount: 12,
    followedByIds: ["user-1"],
    isFollowedByMe: true,
  },
];
