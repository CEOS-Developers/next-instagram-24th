import type { Comment } from "@/types/comment";

// 댓글 UI 확인용 목업입니다. 내용은 레이아웃이 완성된 뒤 다양하게 바꿉니다.
export const comments: Comment[] = [
  {
    id: "comment-1",
    postId: "post-1",
    authorId: "user-2",
    content: "안녕하세요",
    createdAt: "2026-11-09T04:00:00Z",
  },
  {
    id: "comment-2",
    postId: "post-1",
    authorId: "user-1",
    content: "안녕하세요",
    createdAt: "2026-11-09T05:30:00Z",
  },
  {
    id: "comment-3",
    postId: "post-1",
    authorId: "user-2",
    content: "안녕하세요",
    createdAt: "2026-11-09T07:10:00Z",
  },
  {
    id: "comment-4",
    postId: "post-2",
    authorId: "user-2",
    content: "안녕하세요",
    createdAt: "2026-11-08T08:00:00Z",
  },
  {
    id: "comment-5",
    postId: "post-10",
    authorId: "user-1",
    content: "안녕하세요",
    createdAt: "2026-11-07T11:00:00Z",
  },
  {
    id: "comment-6",
    postId: "post-10",
    authorId: "user-2",
    content: "안녕하세요",
    createdAt: "2026-11-07T12:20:00Z",
  },
];
