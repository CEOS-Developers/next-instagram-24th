import type { MockProfile } from "@/data/profiles";

export type PostImage = {
  src: string;
  alt: string;
};

export type Post = {
  id: string; // 상세 페이지 주소에 쓰이는 값 (/p/1)
  author: MockProfile["username"];
  images: [PostImage, ...PostImage[]];
  caption: string; // 본문
  likes: number; // 좋아요 수
  createdAt: string; // 작성 날짜 (YYYY-MM-DD)
};
