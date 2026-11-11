import type { User } from "./user";

export type PostImage = {
  url: string;
  alt: string;
};

export type Post = {
  id: string;
  /** 작성자의 User.id와 연결됩니다. */
  authorId: User["id"];
  /** 대표 이미지입니다. 프로필 그리드 썸네일과 캐러셀 첫 장에 사용합니다. */
  imageUrl: string;
  imageAlt: string;
  /** 여러 장 게시물일 때 대표 이미지 뒤에 이어지는 이미지입니다. */
  extraImages?: PostImage[];
  caption: string;
  /** 초기 좋아요 수이며, isLikedByMe가 true라면 내 좋아요도 포함합니다. */
  likeCount: number;
  isLikedByMe: boolean;
  createdAt: string;
};
