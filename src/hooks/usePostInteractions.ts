"use client";

import { useSyncExternalStore } from "react";
import { currentUser } from "@/data/profiles";

type PostAction = "liked" | "saved";

export const MAX_COMMENT_LENGTH = 2200;

export type PostComment = {
  id: string;
  username: string;
  text: string;
  createdAt?: number;
  parentId?: string;
  replyToUsername?: string;
  liked?: boolean;
};

function isPostComment(value: unknown): value is PostComment {
  return isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.username === "string" &&
    typeof value.text === "string" &&
    (value.createdAt === undefined || (typeof value.createdAt === "number" && Number.isFinite(value.createdAt))) &&
    (value.parentId === undefined || typeof value.parentId === "string") &&
    (value.replyToUsername === undefined || typeof value.replyToUsername === "string") &&
    (value.liked === undefined || typeof value.liked === "boolean");
}

function getComments(post: Record<string, unknown>) {
  return Array.isArray(post.comments) ? post.comments.filter(isPostComment) : [];
}

const storageKey = `instagram:post-interactions:${currentUser.username}`;
const emptySnapshot = "{}";
const listeners = new Set<() => void>();
let fallbackSnapshot: string | undefined;

function getSnapshot() {
  if (fallbackSnapshot !== undefined) return fallbackSnapshot;

  try {
    return window.localStorage.getItem(storageKey) ?? emptySnapshot;
  } catch {
    return emptySnapshot;
  }
}

function getServerSnapshot() {
  return emptySnapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === null) listener();
  }

  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readInteractions(snapshot: string): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(snapshot);
    return isRecord(value) ? value : {};
  } catch {
    return {};
  }
}

function getPostInteraction(interactions: Record<string, unknown>, postId: string) {
  const value = Object.hasOwn(interactions, postId) ? interactions[postId] : undefined;
  return isRecord(value) ? value : {};
}

function updatePost(postId: string, update: (post: Record<string, unknown>) => Record<string, unknown>) {
  const interactions = readInteractions(getSnapshot());
  const previous = getPostInteraction(interactions, postId);
  const next = update(previous);
  if (next === previous) return false;

  const snapshot = JSON.stringify({ ...interactions, [postId]: next });

  try {
    window.localStorage.setItem(storageKey, snapshot);
    fallbackSnapshot = undefined;
  } catch {
    fallbackSnapshot = snapshot;
  }

  listeners.forEach((listener) => listener());
  return true;
}

function toggleAction(postId: string, action: PostAction) {
  updatePost(postId, (post) => ({ ...post, [action]: post[action] !== true }));
}

function addComment(postId: string, text: string, replyToId?: string) {
  const trimmedText = text.trim();
  if (!trimmedText || trimmedText.length > MAX_COMMENT_LENGTH) return false;

  return updatePost(postId, (post) => {
    const comments = getComments(post);
    const target = comments.find((item) => item.id === replyToId);
    if (replyToId !== undefined && !target) return post;

    const comment: PostComment = {
      id: crypto.randomUUID(),
      username: currentUser.username,
      text: trimmedText,
      createdAt: Date.now(),
      parentId: target?.parentId ?? target?.id,
      replyToUsername: target?.username,
    };

    return { ...post, comments: [...comments, comment] };
  });
}

function deleteComment(postId: string, commentId: string) {
  return updatePost(postId, (post) => {
    const comments = getComments(post);
    const comment = comments.find((item) => item.id === commentId && item.username === currentUser.username);
    if (!comment) return post;

    return {
      ...post,
      comments: comments.filter((item) => item.id !== commentId && item.parentId !== commentId),
    };
  });
}

function toggleCommentLike(postId: string, commentId: string) {
  updatePost(postId, (post) => {
    const comments = getComments(post);
    if (!comments.some((item) => item.id === commentId)) return post;

    return {
      ...post,
      comments: comments.map((item) => item.id === commentId ? { ...item, liked: !item.liked } : item),
    };
  });
}

export function usePostInteractions(postId: string) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const post = getPostInteraction(readInteractions(snapshot), postId);

  return {
    liked: post.liked === true,
    saved: post.saved === true,
    comments: getComments(post),
    addComment: (text: string, replyToId?: string) => addComment(postId, text, replyToId),
    toggleCommentLike: (commentId: string) => toggleCommentLike(postId, commentId),
    deleteComment: (commentId: string) => deleteComment(postId, commentId),
    toggleLike: () => toggleAction(postId, "liked"),
    toggleSave: () => toggleAction(postId, "saved"),
  };
}
