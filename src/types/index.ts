// 앱 전체에서 쓰는 도메인 타입
// 실제 서버가 없으므로 src/data/mock.ts 의 목업 데이터가 이 타입을 따릅니다.

export type User = {
  id: string;
  username: string; // URL에 쓰이는 고유 아이디 (예: /jiwoo.kim)
  name: string; // 화면에 보이는 이름
  avatarUrl: string;
  bio: string;
  website?: string;
  followerCount: number;
  followingCount: number;
};

export type Post = {
  id: string;
  authorId: User["id"];
  imageUrls: string[]; // 여러 장이면 캐러셀, 그리드에는 첫 장만 표시
  caption: string;
  likeCount: number;
  createdAt: string; // ISO 8601 문자열
};

export type Comment = {
  id: string;
  postId: Post["id"];
  authorId: User["id"];
  text: string;
  createdAt: string;
};

export type Story = {
  id: string;
  authorId: User["id"];
  imageUrl: string;
  createdAt: string;
};

// 화면에서 자주 쓰는 "작성자 정보가 합쳐진" 형태
export type PostWithAuthor = Post & { author: User };
export type CommentWithAuthor = Comment & { author: User };
export type StoryWithAuthor = Story & { author: User };
