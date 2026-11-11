import type { Comment, Post, User } from "@/types";

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
    username: "sum_elng",
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
    followerCount: 12900000000,
    followingCount: 0,
  },
  {
    id: "u6",
    username: "table_min2",
    name: "이상민",
    avatarUrl: DEFAULT_AVATAR,
    bio: "영화평론가 이상민입니다/ 가장 낮은 별점은 한개입니다",
    followerCount: 158,
    followingCount: 172,
  },
  {
    id: "u7",
    username: "j2nooh",
    name: "홍진우",
    avatarUrl: DEFAULT_AVATAR,
    bio: "내 방안은 푸른 바다",
    followerCount: 231,
    followingCount: 205,
  },
];

// 현재 사용자(u1)가 팔로우 중인 사람 (팔로우/언팔로우 선택 요건에서 사용)
export const initialFollowingIds: User["id"][] = ["u2", "u3", "u4"];

export const posts: Post[] = [
  // u4 sum_elng
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

  // u7 j2nooh
  {
    id: "jinwoo-concert",
    authorId: "u7",
    imageUrls: [
      "/images/jinwoo/tickets.jpg",
      "/images/jinwoo/concert-1.jpg",
      "/images/jinwoo/concert-2.jpg",
    ],
    caption: "pretender ...",
    likeCount: 96,
    createdAt: "2026-11-09T22:30:00+09:00",
  },
  {
    id: "jinwoo-doraemon",
    authorId: "u7",
    imageUrls: ["/images/jinwoo/doraemon.jpg"],
    caption: "진구야",
    likeCount: 64,
    createdAt: "2026-11-03T14:20:00+09:00",
  },
  // u6 table_min2
  {
    id: "sangmin-movie1",
    authorId: "u6",
    imageUrls: ["/images/sangmin/images-16.jpeg"],
    caption: "3.5/5. 마침내 여백이 말하고 침묵이 그려내는 감정의 일생.",
    likeCount: 45,
    createdAt: "2026-11-08T19:00:00+09:00",
  },
  {
    id: "sangmin-movie2",
    authorId: "u6",
    imageUrls: ["/images/sangmin/images-17.jpeg"],
    caption:
      "5/5. 영화가 끝나면 흘려보냈던 장면들까지 가만가만 모두 되짚게 된다.",
    likeCount: 55,
    createdAt: "2026-11-09T20:00:00+09:00",
  },
  {
    id: "sangmin-movie3",
    authorId: "u6",
    imageUrls: ["/images/sangmin/images-18.jpeg"],
    caption:
      "3/5. 깨물어주고 싶게 귀여운 세계를 깨물었을 때 시큼쌉쌀하게 흘러내리는 비애.",
    likeCount: 55,
    createdAt: "2026-11-01T20:00:00+09:00",
  },
  {
    id: "sangmin-movie4",
    authorId: "u6",
    imageUrls: ["/images/sangmin/images-19.jpeg"],
    caption: "4.5/5. 장엄하게 쌓아올린 육각형 영화의 금자탑.",
    likeCount: 55,
    createdAt: "2026-11-02T20:00:00+09:00",
  },
  {
    id: "sangmin-movie5",
    authorId: "u6",
    imageUrls: ["/images/sangmin/images-20.jpeg"],
    caption: "4/5. 완전한 사랑이라는 호러, 자기부정의 헌신이라는 망상.",
    likeCount: 55,
    createdAt: "2026-11-03T20:00:00+09:00",
  },
  {
    id: "sangmin-movie6",
    authorId: "u6",
    imageUrls: ["/images/sangmin/images-21.jpeg"],
    caption:
      "4/5. 기괴한 난장판 속에서 대담하게 질주하는, 영화 전체가 거대한 크레센도.",
    likeCount: 55,
    createdAt: "2026-11-04T20:00:00+09:00",
  },
];

export const comments: Comment[] = [];
