export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  likesCount: number;
  comments: Comment[];
}
