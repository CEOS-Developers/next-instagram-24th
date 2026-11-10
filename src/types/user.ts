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
