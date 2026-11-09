// 목업 데이터를 꺼내 쓰는 조회 함수 모음
// 페이지에서는 mock.ts 를 직접 import 하지 말고 이 함수들을 쓰세요.
// 나중에 실제 API 로 바꿀 때 이 파일만 고치면 됩니다.

import {
  comments,
  CURRENT_USER_ID,
  initialFollowingIds,
  posts,
  stories,
  users,
} from "@/data/mock";
import type {
  CommentWithAuthor,
  PostWithAuthor,
  StoryWithAuthor,
  User,
} from "@/types";

const byNewest = (a: { createdAt: string }, b: { createdAt: string }) =>
  b.createdAt.localeCompare(a.createdAt);
const byOldest = (a: { createdAt: string }, b: { createdAt: string }) =>
  a.createdAt.localeCompare(b.createdAt);

// ---------- User ----------

export function getAllUsers(): User[] {
  return [...users];
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function getUserByUsername(username: string): User | undefined {
  return users.find((user) => user.username === username);
}

export function getCurrentUser(): User {
  return getUserById(CURRENT_USER_ID)!;
}

export function getInitialFollowingIds(): User["id"][] {
  return [...initialFollowingIds];
}

// 작성자 정보를 붙여 주는 내부 함수 (작성자가 없는 데이터는 걸러냄)
function withAuthor<T extends { authorId: string }>(item: T) {
  const author = getUserById(item.authorId);
  return author ? { ...item, author } : null;
}
const isDefined = <T,>(value: T | null): value is T => value !== null;

// ---------- Post ----------

export function getPostById(id: string): PostWithAuthor | undefined {
  const post = posts.find((p) => p.id === id);
  return post ? (withAuthor(post) ?? undefined) : undefined;
}

// 프로필 그리드용: 해당 유저의 게시물을 최신순으로
export function getPostsByUserId(userId: string): PostWithAuthor[] {
  return posts
    .filter((post) => post.authorId === userId)
    .sort(byNewest)
    .map(withAuthor)
    .filter(isDefined);
}

// 홈 피드용: 모든 게시물을 최신순으로
export function getFeedPosts(): PostWithAuthor[] {
  return [...posts].sort(byNewest).map(withAuthor).filter(isDefined);
}

// ---------- Comment ----------

// 댓글은 오래된 순(대화 순서)으로 보여줌
export function getCommentsByPostId(postId: string): CommentWithAuthor[] {
  return comments
    .filter((comment) => comment.postId === postId)
    .sort(byOldest)
    .map(withAuthor)
    .filter(isDefined);
}

export function getCommentCount(postId: string): number {
  return comments.filter((comment) => comment.postId === postId).length;
}

// ---------- Story ----------

// 유저별로 스토리를 묶어서 반환 (스토리 바에는 유저 한 명당 동그라미 하나)
export function getStoriesGroupedByUser(): {
  author: User;
  stories: StoryWithAuthor[];
}[] {
  const groups = new Map<string, StoryWithAuthor[]>();
  for (const story of [...stories].sort(byOldest)) {
    const withUser = withAuthor(story);
    if (!withUser) continue;
    groups.set(story.authorId, [...(groups.get(story.authorId) ?? []), withUser]);
  }
  return [...groups.values()].map((group) => ({
    author: group[0].author,
    stories: group,
  }));
}
