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
    id: "p1",
    authorId: "u1",
    imageUrls: [img("ceos-1")],
    caption: "5주차 과제 시작! Next.js App Router 공부 중 📚",
    likeCount: 42,
    createdAt: "2026-11-07T09:00:00+09:00",
  },
  {
    id: "p2",
    authorId: "u1",
    imageUrls: [img("ceos-2"), img("ceos-2b")],
    caption: "스터디 끝나고 한 컷",
    likeCount: 87,
    createdAt: "2026-11-01T19:30:00+09:00",
  },
  {
    id: "p3",
    authorId: "u1",
    imageUrls: [img("ceos-3")],
    caption: "중간고사 끝 🎉",
    likeCount: 120,
    createdAt: "2026-10-24T15:10:00+09:00",
  },
  {
    id: "p4",
    authorId: "u1",
    imageUrls: [img("ceos-4")],
    caption: "카페 작업",
    likeCount: 33,
    createdAt: "2026-10-10T13:00:00+09:00",
  },

  // u2 jiwoo.kim
  {
    id: "p5",
    authorId: "u2",
    imageUrls: [img("jiwoo-1"), img("jiwoo-1b"), img("jiwoo-1c")],
    caption: "제주 3박 4일 🌊 #제주 #여행",
    likeCount: 512,
    createdAt: "2026-11-05T20:00:00+09:00",
  },
  {
    id: "p6",
    authorId: "u2",
    imageUrls: [img("jiwoo-2")],
    caption: "가을 하늘",
    likeCount: 301,
    createdAt: "2026-10-28T08:20:00+09:00",
  },
  {
    id: "p7",
    authorId: "u2",
    imageUrls: [img("jiwoo-3")],
    caption: "도쿄 골목",
    likeCount: 455,
    createdAt: "2026-10-15T18:45:00+09:00",
  },
  {
    id: "p8",
    authorId: "u2",
    imageUrls: [img("jiwoo-4")],
    caption: "",
    likeCount: 198,
    createdAt: "2026-09-30T11:00:00+09:00",
  },
  {
    id: "p9",
    authorId: "u2",
    imageUrls: [img("jiwoo-5")],
    caption: "필름 카메라 첫 롤 🎞️",
    likeCount: 267,
    createdAt: "2026-09-12T16:30:00+09:00",
  },

  // u3 minjun_eats
  {
    id: "p10",
    authorId: "u3",
    imageUrls: [img("minjun-1")],
    caption: "합정 라멘 맛집 🍜 국물 미쳤다",
    likeCount: 1320,
    createdAt: "2026-11-06T12:40:00+09:00",
  },
  {
    id: "p11",
    authorId: "u3",
    imageUrls: [img("minjun-2"), img("minjun-2b")],
    caption: "성수 브런치 ☕️",
    likeCount: 980,
    createdAt: "2026-11-02T10:15:00+09:00",
  },
  {
    id: "p12",
    authorId: "u3",
    imageUrls: [img("minjun-3")],
    caption: "오늘의 디저트",
    likeCount: 754,
    createdAt: "2026-10-20T21:00:00+09:00",
  },

  // u4 seoyeon.design
  {
    id: "p13",
    authorId: "u4",
    imageUrls: [img("seoyeon-1")],
    caption: "새 포트폴리오 작업 중 ✏️",
    likeCount: 210,
    createdAt: "2026-11-04T17:00:00+09:00",
  },
  {
    id: "p14",
    authorId: "u4",
    imageUrls: [img("seoyeon-2")],
    caption: "전시 다녀옴",
    likeCount: 176,
    createdAt: "2026-10-18T14:30:00+09:00",
  },

  // u5 hyun.runs
  {
    id: "p15",
    authorId: "u5",
    imageUrls: [img("hyun-1")],
    caption: "한강 10km 완주 🏃",
    likeCount: 64,
    createdAt: "2026-11-03T07:10:00+09:00",
  },
];

export const comments: Comment[] = [
  { id: "c1", postId: "p1", authorId: "u2", text: "화이팅!! 🔥", createdAt: "2026-11-07T09:12:00+09:00" },
  { id: "c2", postId: "p1", authorId: "u4", text: "App Router 어렵죠 ㅠㅠ", createdAt: "2026-11-07T09:40:00+09:00" },
  { id: "c3", postId: "p2", authorId: "u3", text: "다들 수고했어요", createdAt: "2026-11-01T20:00:00+09:00" },
  { id: "c4", postId: "p5", authorId: "u1", text: "와 바다색 대박", createdAt: "2026-11-05T20:30:00+09:00" },
  { id: "c5", postId: "p5", authorId: "u3", text: "흑돼지 먹었어?", createdAt: "2026-11-05T21:02:00+09:00" },
  { id: "c6", postId: "p5", authorId: "u2", text: "@minjun_eats 당연하지 ㅋㅋ", createdAt: "2026-11-05T21:10:00+09:00" },
  { id: "c7", postId: "p10", authorId: "u1", text: "여기 어디예요??", createdAt: "2026-11-06T13:00:00+09:00" },
  { id: "c8", postId: "p10", authorId: "u5", text: "저장 완료 📌", createdAt: "2026-11-06T13:25:00+09:00" },
  { id: "c9", postId: "p13", authorId: "u2", text: "기대돼요!", createdAt: "2026-11-04T18:00:00+09:00" },
  { id: "c10", postId: "p15", authorId: "u1", text: "대단해요 👏", createdAt: "2026-11-03T08:00:00+09:00" },
];

export const stories: Story[] = [
  { id: "s1", authorId: "u2", imageUrl: img("story-jiwoo", 1080, 1920), createdAt: "2026-11-07T08:00:00+09:00" },
  { id: "s2", authorId: "u3", imageUrl: img("story-minjun", 1080, 1920), createdAt: "2026-11-07T12:10:00+09:00" },
  { id: "s3", authorId: "u3", imageUrl: img("story-minjun-2", 1080, 1920), createdAt: "2026-11-07T13:30:00+09:00" },
  { id: "s4", authorId: "u4", imageUrl: img("story-seoyeon", 1080, 1920), createdAt: "2026-11-07T10:45:00+09:00" },
  { id: "s5", authorId: "u5", imageUrl: img("story-hyun", 1080, 1920), createdAt: "2026-11-07T06:30:00+09:00" },
];
