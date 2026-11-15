import type { User } from "@/types/user";

// 화면의 초기 데이터입니다. 이후 팔로우 변경 상태는 별도로 관리합니다.
export const users: User[] = [
  {
    id: "user-1",
    username: "cristiano",
    displayName: "호날두",
    avatarUrl: "/images/siu.png",
    bio: "전 축구선수 현 개발자입니다.",
    followerCount: 682,
    followingCount: 760,
    followedByIds: ["user-2"],
    isFollowedByMe: false,
  },
  {
    id: "user-2",
    username: "leomessi",
    displayName: "메시",
    avatarUrl: "/images/messigimotti.jpeg",
    bio: "messi of coding",
    followerCount: 980,
    followingCount: 12,
    followedByIds: ["user-1"],
    isFollowedByMe: true,
  },
  {
    id: "user-guest",
    username: "ngannou",
    displayName: "은가누",
    avatarUrl: "/images/ngannou.png",
    bio: "빠따든 오타니를 이길 수 있습니다. 하지만 호날두는 이길 수 없습니다.",
    followerCount: 1,
    followingCount: 918,
    followedByIds: [],
    isFollowedByMe: false,
  },
];

// 로그인 상태를 가정한 사용자 ID입니다. 사용자 정보는 users에서만 관리합니다.
const currentUserId = "user-guest";
const loggedInUser = users.find((user) => user.id === currentUserId);

if (!loggedInUser) {
  throw new Error("현재 사용자에 해당하는 목데이터가 없습니다.");
}

export const currentUser: User = loggedInUser;
