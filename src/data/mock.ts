import type { Comment, Post, Story, User } from "@/types";

// 이미지는 picsum.photos 의 seed URL을 사용합니다.
// 같은 seed 는 항상 같은 이미지를 돌려주므로 새로고침해도 사진이 바뀌지 않습니다.
const img = (seed: string, w = 1080, h = 1080) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
const avatar = (seed: string) => img(`avatar-${seed}`, 320, 320);

// 로그인 기능이 없으므로 "나"를 고정해 둡니다.
export const CURRENT_USER_ID = "u1";

export const users: User[] = [
  {
    id: "u1",
    username: "ceos.front",
    name: "CEOS 프론트",
    avatarUrl: avatar("ceos"),
    bio: "CEOS 24기 프론트엔드 🧑‍💻\nNext.js로 인스타그램 만드는 중",
    website: "https://github.com",
    followerCount: 312,
    followingCount: 4,
  },
  {
    id: "u2",
    username: "jiwoo.kim",
    name: "김지우",
    avatarUrl: avatar("jiwoo"),
    bio: "여행 📷 | 서울 → 어디든",
    followerCount: 1284,
    followingCount: 301,
  },
  {
    id: "u3",
    username: "minjun_eats",
    name: "김민준",
    avatarUrl: avatar("minjun"),
    bio: "먹는 게 제일 좋아 🍜\n맛집 기록용 계정",
    followerCount: 5621,
    followingCount: 88,
  },
  {
    id: "u4",
    username: "seoyeon.design",
    name: "박서연",
    avatarUrl: avatar("seoyeon"),
    bio: "Product Designer ✏️",
    website: "https://example.com",
    followerCount: 942,
    followingCount: 410,
  },
  {
    id: "u5",
    username: "hyun.runs",
    name: "최현",
    avatarUrl: avatar("hyun"),
    bio: "매일 5km 🏃",
    followerCount: 207,
    followingCount: 190,
  },
];

// 현재 사용자(u1)가 팔로우 중인 사람 (팔로우/언팔로우 선택 요건에서 사용)
export const initialFollowingIds: User["id"][] = ["u2", "u3", "u4"];

export const posts: Post[] = [
  // u1 ceos.front
  {
    id: "ceos-front-days",
    authorId: "u1",
    imageUrls: ["/images/ceos-days/badge.webp", "/images/ceos-days/thumbs-up.webp", "/images/ceos-days/lunch.webp"],
    caption: "세오스 프론트 📸\n한 학기동안 화이팅 !! 플젝도 화이팅 !!\n\n#세오스24기 #CEOS #프론트엔드",
    likeCount: 124,
    createdAt: "2026-11-10T15:50:00+09:00",
  },
];

export const comments: Comment[] = [];

export const stories: Story[] = [
  { id: "s1", authorId: "u2", imageUrl: img("story-jiwoo", 1080, 1920), createdAt: "2026-11-07T08:00:00+09:00" },
  { id: "s2", authorId: "u3", imageUrl: img("story-minjun", 1080, 1920), createdAt: "2026-11-07T12:10:00+09:00" },
  { id: "s3", authorId: "u3", imageUrl: img("story-minjun-2", 1080, 1920), createdAt: "2026-11-07T13:30:00+09:00" },
  { id: "s4", authorId: "u4", imageUrl: img("story-seoyeon", 1080, 1920), createdAt: "2026-11-07T10:45:00+09:00" },
  { id: "s5", authorId: "u5", imageUrl: img("story-hyun", 1080, 1920), createdAt: "2026-11-07T06:30:00+09:00" },
];
