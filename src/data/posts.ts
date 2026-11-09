export type PostImage = {
  src: string;
  alt: string;
};

export type Post = {
  id: string;
  authorUsername: string;
  caption: string;
  publishedAt: string;
  likeCount: number;
  images: [PostImage, ...PostImage[]];
};

export const posts: Post[] = [
  {
    id: "1",
    publishedAt: "2026-09-20",
    likeCount: 112,
    authorUsername: "jxx_gro_ovy",
    caption: "깔루아 9공",
    images: [
      { src: "/images/my_02.jpg", alt: "내방푸 기타연주" },
    ],
  },
  {
    id: "2",
    publishedAt: "2026-02-24",
    likeCount: 76,
    authorUsername: "jxx_gro_ovy",
    caption: "교토 가모강 산책",
    images: [
      { src: "/images/my_05.jpg", alt: "교토 가모강 산책" },
    ],
  },
  {
    id: "3",
    publishedAt: "2025-12-15",
    likeCount: 98,
    authorUsername: "jxx_gro_ovy",
    caption: "2년째 크리스마스 시즌에 방문한 롯폰기 케이키자카 거리 일루미네이션",
    images: [
      { src: "/images/film_5.jpg", alt: "롯폰기에서 보이는 도쿄타워" },
      { src: "/images/film_4.jpg", alt: "아래에서 올려다본 도쿄타워" },
    ],
  },
  {
    id: "4",
    publishedAt: "2026-03-10",
    likeCount: 58,
    authorUsername: "jxx_gro_ovy",
    caption: "내 방 꾸미기",
    images: [
      { src: "/images/my_01.jpg", alt: "Claude Monet 그림 옆에 놓인 꽃" },
    ],
  },
  {
    id: "5",
    publishedAt: "2025-05-20",
    likeCount: 87,
    authorUsername: "jxx_gro_ovy",
    caption: "오타루 운하",
    images: [
      { src: "/images/film_3.jpg", alt: "오타루 도로 끝에 보이는 바다" },
      { src: "/images/film_2.jpg", alt: "창고 건물이 늘어선 오타루 운하" },
    ],
  },
  {
    id: "6",
    publishedAt: "2026-04-03",
    likeCount: 93,
    authorUsername: "jxx_gro_ovy",
    caption: "성북천 벚꽃 구경",
    images: [
      { src: "/images/my_10.jpg", alt: "성북천 위로 활짝 핀 벚꽃" },
    ],
  },
  {
    id: "7",
    publishedAt: "2025-04-12",
    likeCount: 28,
    authorUsername: "film_archive",
    caption: "홋카이도 대학교 벚꽃길",
    images: [
      { src: "/images/film_1.jpg", alt: "벚꽃과 나무 사이로 흐르는 공원의 개울" },
    ],
  },
  {
    id: "8",
    publishedAt: "2026-02-27",
    likeCount: 35,
    authorUsername: "film_archive",
    caption: "미야지마에서 만난 사슴",
    images: [
      { src: "/images/my_03.jpg", alt: "나무 그늘 아래 서 있는 사슴" },
    ],
  },
  {
    id: "9",
    publishedAt: "2024-12-26",
    likeCount: 19,
    authorUsername: "film_archive",
    caption: "창밖에 손님",
    images: [
      { src: "/images/my_04.jpg", alt: "햇빛이 드는 창문 밖에 앉은 고양이" },
    ],
  },

  {
    id: "10",
    publishedAt: "2025-01-02",
    likeCount: 23,
    authorUsername: "live.archive",
    caption: "한로로 콘서트",
    images: [
      { src: "/images/live_1.jpg", alt: "한로로 콘서트" },
    ],
  },
  {
    id: "12",
    publishedAt: "2025-04-16",
    likeCount: 34,
    authorUsername: "live.archive",
    caption: "콜드플레이 내한 첫콘",
    images: [
      { src: "/images/live_2.jpg", alt: "푸른 조명으로 물든 공연장과 관객석" },
    ],
  },
  {
    id: "13",
    publishedAt: "2026-09-26",
    likeCount: 18,
    authorUsername: "live.archive",
    caption: "리도어 memory 콘서트",
    images: [
      { src: "/images/live_3.jpg", alt: "리도어 콘서트" },
    ],
  },
  {
    id: "14",
    publishedAt: "2025-05-09",
    likeCount: 27,
    authorUsername: "live.archive",
    caption: "장충체육관 검치 앵콜콘",
    images: [
      { src: "/images/live_4.jpg", alt: "검정치마 공연 안내문 앞에서 들고 있는 티켓 두 장" },
    ],
  },
];

export function getPostsByUsername(username: string): Post[] {
  return posts
    .filter((post) => post.authorUsername === username)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
