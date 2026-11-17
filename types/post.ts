// 앱에서 쓰는 데이터의 "모양"(타입)을 모아 두는 파일
import type { User } from "@/types/user";

export type Post = {
  id: string; // 상세 페이지 주소에 쓰이는 값 (/p/1)
  authorId: string; // 누가 썼는지 (User의 id)
  images: string[]; // 사진 경로 목록. 2장 이상이면 여러 장 게시물
  caption: string; // 본문
  likes: number; // 좋아요 수
  createdAt: string; // 작성 날짜 (YYYY-MM-DD)
};

// 작성자 정보가 붙은 게시물 (피드에서 사용)
export type PostWithAuthor = Post & { author: User };

// 피드 한 페이지
export type FeedPage = {
  posts: PostWithAuthor[];
  nextOffset: number | null; // 더 없으면 null
};

// 작성자 정보가 붙은 게시물 (피드에서 사용)
export type PostWithAuthor = Post & { author: MockProfile };

// 피드 한 페이지
export type FeedPage = {
  posts: PostWithAuthor[];
  nextOffset: number | null; // 더 없으면 null
};