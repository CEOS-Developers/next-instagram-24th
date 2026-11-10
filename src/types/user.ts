export type User = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  /** 목데이터 시점의 팔로워 수입니다. */
  followerCount: number;
  followingCount: number;
  /** 프로필의 '님이 팔로우합니다' 영역에 표시할 사용자 ID입니다. */
  followedByIds: string[];
  /** 현재 사용자가 이 프로필을 팔로우하는 초기 상태입니다. */
  isFollowedByMe: boolean;
};
