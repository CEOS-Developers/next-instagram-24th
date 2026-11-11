import Link from 'next/link';

import Avatar from '@/components/common/Avatar';
import { OptionsIcon } from '@/components/icons';
import formatRelativeTime from '@/lib/formatRelativeTime';
import type { Post } from '@/types/post';
import type { User } from '@/types/user';

import FeedFollowButton from './FeedFollowButton';

interface FeedPostHeaderProps {
  post: Post;
  author: User;
}

/* 홈 피드 게시물 맨 위: 작성자, 게시 시간, 팔로우 버튼, 옵션 버튼 */
export default function FeedPostHeader({ post, author }: FeedPostHeaderProps) {
  const profileUrl = `/${author.username}`;

  return (
    <header className="flex items-center gap-3 px-3 pb-3">
      <Link href={profileUrl} aria-label={`${author.username} 프로필`}>
        <Avatar
          src={author.profileImage}
          alt={`${author.username}님의 프로필 사진`}
          size={32}
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 text-sm leading-[18px]">
          <Link href={profileUrl} className="truncate font-semibold">
            {author.username}
          </Link>
          <span className="text-ig-secondary-text" aria-hidden="true">
            •
          </span>
          <Link
            href={`${profileUrl}/posts/${post.id}`}
            className="shrink-0 text-ig-secondary-text"
          >
            <time dateTime={post.createdAt}>
              {formatRelativeTime(post.createdAt)}
            </time>
          </Link>
        </div>
        <p className="text-xs leading-4">회원님을 위한 추천</p>
      </div>

      <FeedFollowButton userId={author.id} />
      <button
        type="button"
        aria-label="옵션 더 보기"
        className="shrink-0 cursor-pointer"
      >
        <OptionsIcon />
      </button>
    </header>
  );
}
