"use client";

import { useEffect, useRef } from "react";
import { useAddedComments } from "@/lib/commentStorage";
import type { CommentWithAuthor } from "@/lib/posts";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import CommentItem from "./CommentItem";

export type CommentListProps = {
  postId: Post["id"];
  /** 목업 데이터에 있던 댓글입니다. */
  comments: CommentWithAuthor[];
  /** 내가 작성한 댓글의 작성자입니다. */
  currentUser: User;
};

export default function CommentList({ postId, comments, currentUser }: CommentListProps) {
  const addedComments = useAddedComments(postId);
  const lastItemRef = useRef<HTMLLIElement>(null);
  const previousAddedCount = useRef(addedComments.length);

  // 새 댓글을 작성하면 목록 맨 아래로 스크롤합니다.
  useEffect(() => {
    if (addedComments.length > previousAddedCount.current) {
      lastItemRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    previousAddedCount.current = addedComments.length;
  }, [addedComments.length]);

  const allComments: CommentWithAuthor[] = [
    ...comments,
    ...addedComments.map((comment) => ({ comment, author: currentUser })),
  ];

  if (allComments.length === 0) return null;

  return (
    <ul aria-label="댓글" className="mt-5 space-y-5">
      {allComments.map(({ comment, author }, index) => (
        <CommentItem
          key={comment.id}
          ref={index === allComments.length - 1 ? lastItemRef : undefined}
          comment={comment}
          author={author}
          // 게스트는 프로필 페이지가 없어 이름에 링크를 걸지 않습니다.
          linkToProfile={author.id !== currentUser.id}
        />
      ))}
    </ul>
  );
}
