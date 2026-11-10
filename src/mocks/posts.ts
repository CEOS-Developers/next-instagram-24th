import type { Post } from "@/types/post";

// 이미지 파일은 public/images/에서 관리합니다.
export const posts: Post[] = [
  {
    id: "post-1",
    authorId: "user-1",
    imageUrl: "/images/post-cafe.svg",
    imageAlt: "창가 테이블 위 커피잔을 표현한 샘플 일러스트",
    caption: "커피마시고싶다",
    likeCount: 32,
    isLikedByMe: false,
    createdAt: "2026-11-09T03:00:00Z",
  },
  {
    id: "post-2",
    authorId: "user-1",
    imageUrl: "/images/post-walk.svg",
    imageAlt: "나무 사이로 이어진 산책길을 표현한 샘플 일러스트",
    caption: "도망갈래",
    likeCount: 48,
    isLikedByMe: false,
    createdAt: "2026-11-08T06:00:00Z",
  },
];
