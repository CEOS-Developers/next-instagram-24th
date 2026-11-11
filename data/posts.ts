import type { Post } from "@/types/post";

const posts: Post[] = [
  {
    id: "1",
    images: ["/posts/1-1.jpeg"],
    caption: "먼직귀: 먼가 직장다니고 귀신 들린거..",
    likes: 155,
    createdAt: "2025-12-25",
  },
  {
    id: "2",
    images: ["/posts/2-1.jpeg", "/posts/2-2.jpeg"],
    caption: "나애 일상",
    likes: 123,
    createdAt: "2025-08-10",
  },
  {
    id: "3",
    images: ["/posts/3-1.jpeg", "/posts/3-2.jpeg"],
    caption: "나애 꿈",
    likes: 102,
    createdAt: "2025-06-29",
  },
  {
    id: "4",
    images: ["/posts/4-1.jpeg"],
    caption: "요즘 내 정신상태 헤헤",
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