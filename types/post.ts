import type { MockProfile } from "@/data/profiles";

export type PostImage = {
  src: string;
  alt: string;
};

export type Post = {
  id: string; // 상세 페이지 주소에 쓰이는 값 (/p/1)
  authorId: MockProfile["username"];
  images: [PostImage, ...PostImage[]];
  caption: string; // 본문
  likes: number; // 좋아요 수
  createdAt: string; // 작성 날짜 (YYYY-MM-DD)
};

// 작성자 정보가 붙은 게시물 (피드에서 사용)
export type PostWithAuthor = Post & { author: MockProfile };

// 피드 한 페이지
export type FeedPage = {
  posts: PostWithAuthor[];
  nextOffset: number | null; // 더 없으면 null
};

export type ProfilePostPage = {
  posts: Post[];
  nextOffset: number | null;
};