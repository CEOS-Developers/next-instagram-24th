import type { Comment, Post, Story, User } from "@/types";

// 이미지는 picsum.photos 의 seed URL을 사용합니다.
// 같은 seed 는 항상 같은 이미지를 돌려주므로 새로고침해도 사진이 바뀌지 않습니다.
const img = (seed: string, w = 1080, h = 1080) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
// 프로필 사진이 없는 계정에 쓰는 기본 프로필 (회색 사람 모양)
const DEFAULT_AVATAR = "/images/default-avatar.svg";

// 로그인 기능이 없으므로 "나"를 고정해 둡니다.
export const CURRENT_USER_ID = "u1";

export const users: User[] = [
  {
    id: "u1",
    username: "ceos24.front",
    name: "프론트",
    avatarUrl: "/images/me/avatar.jpeg",
    bio: "CEOS 24기 프론트엔드 🧑‍💻\nNext.js로 인스타그램 만드는 중",
    website: "https://github.com",
    followerCount: 312,
    followingCount: 4,
  },
  {
    id: "u2",
    username: "__ahyun__",
    name: "김아현",
    avatarUrl: "/images/ahyun/profile.jpeg",
    bio: "헌터헌터 꼭 보세요.",
    followerCount: 1284,
    followingCount: 301,
  },
  {
    id: "u3",
    username: "minjun__",
    name: "김민준",
    avatarUrl: "/images/minjun/profile.jpeg",
    bio: "라멘 웨이팅 하는게 취미입니다",
    followerCount: 5621,
    followingCount: 88,
  },
  {
    id: "u4",
    username: "sumin0423",
    name: "최수민",
    avatarUrl: DEFAULT_AVATAR,
    bio: "귀여운게 최고다. 프론트의 앙마😈",
    followerCount: 942,
    followingCount: 410,
  },
  {
    id: "u5",
    username: "1dsyun",
    name: "배승윤",
    avatarUrl: DEFAULT_AVATAR,
    bio: "안녕하세요. 프론트엔드 개발자입니다.",
    followerCount: 207,
    followingCount: 190,
  },
];

// 현재 사용자(u1)가 팔로우 중인 사람 (팔로우/언팔로우 선택 요건에서 사용)
export const initialFollowingIds: User["id"][] = ["u2", "u3", "u4"];

export const posts: Post[] = [
  // u4 sumin0423
  {
    id: "sumin0423",
    authorId: "u4",
    imageUrls: [
      "/images/sumin/badge.webp",
      "/images/sumin/thumbs-up.webp",
      "/images/sumin/lunch.webp",
    ],
    caption:
      "세오스 프론트 📸\n한 학기동안 화이팅 !! 플젝도 화이팅 !!\n\n#세오스24기 #CEOS #프론트엔드",
    likeCount: 124,
    createdAt: "2026-11-10T15:50:00+09:00",
  },
  {
    id: "me-dance",
    authorId: "u1",
    imageUrls: ["/images/me/dance.jpeg"],
    caption: "과제 끝나면 덩실덩 🕺\n",
    likeCount: 88,
    createdAt: "2026-11-09T22:10:00+09:00",
  },
  {
    id: "me-suit",
    authorId: "u1",
    imageUrls: ["/images/me/suit.jpeg"],
    caption: "손현듀듀듀 \n",
    likeCount: 64,
    createdAt: "2026-11-08T09:30:00+09:00",
  },
  {
    id: "me-sleepy",
    authorId: "u1",
    imageUrls: ["/images/me/sleepy.jpeg"],
    caption: "새벽 3시의 프론트엔드…\n",
    likeCount: 51,
    createdAt: "2026-11-07T03:00:00+09:00",
  },
  {
    id: "me-cry",
    authorId: "u1",
    imageUrls: ["/images/me/cry.jpeg"],
    caption: "빌드 에러 났을 때 😭\n",
    likeCount: 73,
    createdAt: "2026-11-06T20:45:00+09:00",
  },

  // u5 1dsyun
  {
    id: "syun-cakepop",
    authorId: "u5",
    imageUrls: ["/images/syun/cakepop.jpg"],
    caption: "지옥에서 온 치이카와",
    likeCount: 42,
    createdAt: "2026-11-07T23:13:00+09:00",
  },
  {
    id: "syun-bakery",
    authorId: "u5",
    imageUrls: ["/images/syun/bakery.jpg"],
    caption: "아오이토리 꼭 먹으삼",
    likeCount: 37,
    createdAt: "2026-11-05T16:24:00+09:00",
  },
  {
    id: "syun-karaoke",
    authorId: "u5",
    imageUrls: ["/images/syun/karaoke.jpg"],
    caption: "백규민씨의 노래 실력......",
    likeCount: 29,
    createdAt: "2026-11-04T23:08:00+09:00",
  },
  {
    id: "syun-dinner",
    authorId: "u5",
    imageUrls: ["/images/syun/dinner.jpg"],
    caption: "고기 또 먹고싶다",
    likeCount: 55,
    createdAt: "2026-10-31T18:55:00+09:00",
  },
  // u2 __ahyun__
  {
    id: "ahyun-1",
    authorId: "u2",
    imageUrls: ["/images/ahyun/images-17.jpeg"],
    caption: "카페에서 공부하는 중",
    likeCount: 88,
    createdAt: "2026-11-07T14:30:00+09:00",
  },
  {
    id: "ahyun-2",
    authorId: "u2",
    imageUrls: ["/images/ahyun/images-18.jpeg"],
    caption: "오늘은 날씨가 좋네요",
    likeCount: 102,
    createdAt: "2026-11-06T17:45:00+09:00",
  },
  {
    id: "ahyun-3",
    authorId: "u2",
    imageUrls: ["/images/ahyun/images-19.jpeg"],
    caption: "사실 잘 모름",
    likeCount: 102,
    createdAt: "2026-11-06T17:45:00+09:00",
  },
  // u3 minjun__
  {
    id: "minjun-1",
    authorId: "u3",
    imageUrls: ["/images/minjun/images-17.jpeg"],
    caption: "첫 번째 포스트",
    likeCount: 50,
    createdAt: "2026-11-07T23:13:00+09:00",
  },
  {
    id: "minjun-2",
    authorId: "u3",
    imageUrls: ["/images/minjun/images-18.jpeg"],
    caption: "두 번째 포스트",
    likeCount: 60,
    createdAt: "2026-11-08T10:00:00+09:00",
  },
  {
    id: "minjun-3",
    authorId: "u3",
    imageUrls: ["/images/minjun/images-19.jpeg"],
    caption: "세 번째 포스트",
    likeCount: 70,
    createdAt: "2026-11-09T15:30:00+09:00",
  },
  {
    id: "minjun-4",
    authorId: "u3",
    imageUrls: ["/images/minjun/images-20.jpeg"],
    caption: "네 번째 포스트",
    likeCount: 80,
    createdAt: "2026-11-07T23:13:00+09:00",
  },
];

export const comments: Comment[] = [];

export const stories: Story[] = [
  {
    id: "s1",
    authorId: "u2",
    imageUrl: img("story-jiwoo", 1080, 1920),
    createdAt: "2026-11-07T08:00:00+09:00",
  },
  {
    id: "s2",
    authorId: "u3",
    imageUrl: img("story-minjun", 1080, 1920),
    createdAt: "2026-11-07T12:10:00+09:00",
  },
  {
    id: "s3",
    authorId: "u3",
    imageUrl: img("story-minjun-2", 1080, 1920),
    createdAt: "2026-11-07T13:30:00+09:00",
  },
  {
    id: "s4",
    authorId: "u4",
    imageUrl: img("story-seoyeon", 1080, 1920),
    createdAt: "2026-11-07T10:45:00+09:00",
  },
  {
    id: "s5",
    authorId: "u5",
    imageUrl: img("story-hyun", 1080, 1920),
    createdAt: "2026-11-07T06:30:00+09:00",
  },
];
