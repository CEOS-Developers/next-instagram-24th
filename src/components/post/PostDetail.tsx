'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useRef, useState } from 'react';

import Avatar from '@/components/common/Avatar';
import useSavedPosts from '@/hooks/useSavedPosts';
import type { Post } from '@/types/post';
import type { User } from '@/types/user';

interface PostDetailProps {
  post: Post;
  author: User;
  users: User[];
  currentUserId: string;
}

export default function PostDetail({
  post,
  author,
  users,
  currentUserId,
}: PostDetailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { savedPostIds, toggleSavedPost, isLoaded } =
    useSavedPosts(currentUserId);
  const isSaved = savedPostIds.includes(post.id);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const commentListRef = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');
  const canSubmit =
    commentText.trim().length > 0 &&
    users.some((user) => user.id === currentUserId);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);
  const isLiked = likedPostIds.includes(post.id);
  const likesCount = post.likesCount + (isLiked ? 1 : 0);
  const router = useRouter();
  const profileUrl = `/${author.username}`;
  const dateLabel = (value: string) =>
    new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul' }).format(
      new Date(value)
    );

  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setComments((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        authorId: currentUserId,
        content: commentText.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setCommentText('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (comments.length > post.comments.length && commentListRef.current) {
      commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
    }
  }, [comments.length, post.comments.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${author.username}의 게시물 상세`}
      onCancel={(event) => {
        event.preventDefault();
        router.push(profileUrl);
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-[#f8f9f9] backdrop:bg-[rgba(12,16,20,0.7)]"
    >
      <div className="flex h-full items-center justify-center">
        <article className="mx-[64px] flex max-h-[calc(100dvh-40px)] max-w-[calc(100%-128px)] justify-center overflow-hidden">
          <div className="relative aspect-[3/4] h-[calc(100dvh-40px)] max-w-full shrink-0 overflow-hidden rounded-l-[16px] bg-black">
            <Image
              src={post.imageUrl}
              alt={post.content}
              fill
              sizes="75vh"
              className="object-contain"
            />
          </div>
          <div className="flex w-[500px] max-w-[500px] min-w-0 flex-col overflow-hidden rounded-r-[16px] bg-[#0c1014]">
            <header className="flex shrink-0 items-center">
              <Link
                href={profileUrl}
                className="flex min-w-0 flex-1 items-center py-[14px] pr-[4px] pl-[16px]"
              >
                <Avatar
                  src={author.profileImage}
                  alt={`${author.username} 프로필`}
                  size={32}
                />
                <span className="ml-[14px] text-[14px] leading-[18px] font-semibold">
                  {author.username}
                </span>
              </Link>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => router.push(profileUrl)}
                className="cursor-pointer p-[8px] text-white"
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20.643 3.357 12 12 3.353 20.647" />
                  <line x1="20.649" x2="3.354" y1="20.649" y2="3.354" />
                </svg>
              </button>
            </header>
            <div
              ref={commentListRef}
              className="min-h-0 flex-1 overflow-y-auto px-[16px]"
            >
              <ul className="p-[16px] text-[14px] leading-[18px]">
                <li className="flex items-start">
                  <div className="w-[50px] shrink-0">
                    <Link href={profileUrl}>
                      <Avatar
                        src={author.profileImage}
                        alt={`${author.username} 프로필`}
                        size={32}
                      />
                    </Link>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={profileUrl} className="font-medium text-white">
                      {author.username}
                    </Link>{' '}
                    <span className="whitespace-pre-wrap break-words">
                      {post.content}
                    </span>
                    <div className="mt-[8px] mb-[4px] text-[12px] leading-[16px] text-[#a2aab4]">
                      <time dateTime={post.createdAt}>
                        {dateLabel(post.createdAt)}
                      </time>
                    </div>
                  </div>
                </li>
                {comments.map((comment) => {
                  const commentAuthor = users.find(
                    (user) => user.id === comment.authorId
                  );
                  return (
                    <li
                      key={comment.id}
                      className="-mt-[5px] -mr-[2px] pt-[12px]"
                    >
                      <div className="flex items-start">
                        <div className="w-[50px] shrink-0">
                          {commentAuthor && (
                            <Link href={`/${commentAuthor.username}`}>
                              <Avatar
                                src={commentAuthor.profileImage}
                                alt={`${commentAuthor.username} 프로필`}
                                size={32}
                              />
                            </Link>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          {commentAuthor ? (
                            <Link
                              href={`/${commentAuthor.username}`}
                              className="font-medium text-white"
                            >
                              {commentAuthor.username}
                            </Link>
                          ) : (
                            <span>알 수 없는 사용자</span>
                          )}{' '}
                          <span className="whitespace-pre-wrap break-words">
                            {comment.content}
                          </span>
                          <div className="mt-[8px] mb-[4px] text-[12px] leading-[16px] text-[#a2aab4]">
                            <time dateTime={comment.createdAt}>
                              {dateLabel(comment.createdAt)}
                            </time>{' '}
                            <button
                              type="button"
                              className="cursor-pointer font-semibold"
                            >
                              답글 달기
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex shrink-0 items-center border-t border-[#262626] px-[16px] pt-[6px] pb-[8px]">
              {[
                ['like', '좋아요'],
                ['comment', '댓글 달기'],
                ['repost', '리포스트'],
                ['share', '게시물 공유'],
                ['save', '저장'],
              ].map(([icon, label]) => (
                <button
                  key={icon}
                  type="button"
                  aria-label={
                    icon === 'like' && isLiked
                      ? '좋아요 취소'
                      : icon === 'save' && isSaved
                        ? '저장 취소'
                        : label
                  }
                  aria-pressed={
                    icon === 'like'
                      ? isLiked
                      : icon === 'save'
                        ? isSaved
                        : undefined
                  }
                  disabled={icon === 'save' && !isLoaded}
                  onClick={
                    icon === 'like'
                      ? () =>
                          setLikedPostIds((ids) =>
                            ids.includes(post.id)
                              ? ids.filter((id) => id !== post.id)
                              : [...ids, post.id]
                          )
                      : icon === 'comment'
                        ? () => inputRef.current?.focus()
                        : icon === 'save'
                          ? () => toggleSavedPost(post.id)
                          : undefined
                  }
                  className={`h-[40px] w-[40px] shrink-0 cursor-pointer p-[8px] ${icon === 'save' ? 'ml-auto' : ''}`}
                >
                  {icon === 'like' && isLiked ? (
                    <svg
                      aria-hidden="true"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#ff3040"
                    >
                      <path d="M16.792 1.904A6.04 6.04 0 0 0 12 4.031a6.052 6.052 0 0 0-4.792-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                    </svg>
                  ) : icon === 'save' && isSaved ? (
                    <svg
                      aria-hidden="true"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#f8f9f9"
                    >
                      <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" />
                    </svg>
                  ) : (
                    <Image
                      src={`/images/post-icons/${icon}.svg`}
                      alt=""
                      width={24}
                      height={24}
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="mb-[4px] shrink-0 px-[16px] text-[14px] leading-[18px] font-semibold">
              좋아요 {likesCount.toLocaleString('ko-KR')}개
            </p>
            <time
              dateTime={post.createdAt}
              className="mb-[16px] shrink-0 pl-[16px] text-[12px] leading-[16px] text-[#a2aab4]"
            >
              {dateLabel(post.createdAt)}
            </time>
            <form
              onSubmit={submitComment}
              className="flex shrink-0 items-center border-t border-[#2b3036] py-[6px] pr-[16px]"
            >
              <button
                type="button"
                aria-label="이모티콘"
                className="h-[40px] w-[40px] shrink-0 cursor-pointer p-[8px]"
              >
                <Image
                  src="/images/post-icons/emoji.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              <textarea
                ref={inputRef}
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                aria-label="댓글 달기..."
                placeholder="댓글 달기..."
                rows={1}
                className="min-w-0 flex-1 resize-none bg-transparent p-0 text-[14px] leading-[18px]"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="cursor-pointer text-[14px] leading-[18px] font-medium text-[#b3dbff] disabled:cursor-default"
              >
                게시
              </button>
            </form>
          </div>
        </article>
      </div>
    </dialog>
  );
}
