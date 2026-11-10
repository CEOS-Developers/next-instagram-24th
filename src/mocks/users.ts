import type { User } from "@/types/user";

// 화면의 초기 데이터입니다. 이후 팔로우 변경 상태는 별도로 관리합니다.
export const users: User[] = [
  {
    id: "user-1",
    username: "cristiano",
    displayName: "호날두",
    avatarUrl: "/images/siu.png",
    bio: "국대 은퇴합니다.",
    followerCount: 7,
    followingCount: 85,
    followedByIds: ["user-2"],
    isFollowedByMe: false,
  },
  {
    id: "user-2",
    username: "leomessi",
    displayName: "메시",
    avatarUrl: "/images/messigimotti.jpeg",
    bio: "messi of soccer",
    followerCount: 980,
    followingCount: 12,
    followedByIds: ["user-1"],
    isFollowedByMe: true,
  },
];

// 지금 화면을 보고 있는 사용자입니다. 댓글 작성자로 사용합니다.
// 프로필 페이지가 없는 계정이라 users 목록에는 넣지 않습니다.
export const currentUser: User = {
  id: "user-guest",
  username: "은가누",
  displayName: "은가누",
  avatarUrl: "/images/ngannou.png",
  bio: "",
  followerCount: 0,
  followingCount: 0,
  followedByIds: [],
  isFollowedByMe: false,
};
