export type User = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  /** 목데이터 시점의 팔로워 수입니다. */
  followerCount: number;
  followingCount: number;
  /** 현재 사용자가 이 프로필을 팔로우하는 초기 상태입니다. */
  isFollowedByMe: boolean;
};

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
  /** ISO 8601 형식의 작성 시각입니다. */
  createdAt: string;
};
