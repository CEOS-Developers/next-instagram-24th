import type { User } from "./user";

export type Post = {
  id: string;
  /** 작성자의 User.id와 연결됩니다. */
  authorId: User["id"];
  imageUrl: string;
  imageAlt: string;
  caption: string;
  /** 초기 좋아요 수이며, isLikedByMe가 true라면 내 좋아요도 포함합니다. */
  likeCount: number;
  isLikedByMe: boolean;
  createdAt: string;
};
