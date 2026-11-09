import type { Post } from "./definitions";
const posts: Post[] = [
  {
    id: "1",
    images: [
      "/posts/1-1.jpg",
      "/posts/1-2.jpg",
      "/posts/1-3.jpg",
      "/posts/1-4.jpg",
    ],
    caption: "크리스마스 기대 하나도 안돼",
    likes: 155,
    createdAt: "2025-12-25",
  },
  {
    id: "2",
    images: [
      "/posts/2-1.jpg",
      "/posts/2-2.jpg",
      "/posts/2-3.jpg",
      "/posts/2-4.jpg",
    ],
    caption: "강아지 키우고 싶음 ㅠ",
    likes: 123,
    createdAt: "2025-08-10",
  },
  {
    id: "3",
    images: [
      "/posts/3-1.jpg",
      "/posts/3-2.jpg",
      "/posts/3-3.jpg",
      "/posts/3-4.jpg",
    ],
    caption: "양재천 가고싶다",
    likes: 102,
    createdAt: "2025-06-29",
  },
  {
    id: "4",
    images: [
      "/posts/4-1.jpg",
      "/posts/4-2.jpg",
      "/posts/4-3.jpg",
      "/posts/4-4.jpg",
    ],
    caption: "반포한강공원도 가고싶음",
    likes: 88,
    createdAt: "2025-05-20",
  },
];

// 게시물 전체 목록 (그리드에서 사용)
export function getPosts(): Post[] {
  return posts;
}

// id로 게시물 하나 찾기 (상세 페이지에서 사용). 없으면 undefined
export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}
