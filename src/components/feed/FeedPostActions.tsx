import type { ReactNode } from 'react';

import {
  BookmarkIcon,
  CommentIcon,
  HeartIcon,
  MessageIcon,
  RepostIcon,
} from '@/components/icons';
import formatCount from '@/lib/formatCount';

interface FeedPostActionsProps {
  likesCount: number;
  commentsCount: number;
}

function ActionButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} className="cursor-pointer p-2">
      {children}
    </button>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span className="mr-1.5 text-sm font-semibold">{formatCount(value)}</span>
  );
}

/** 홈 피드 게시물 사진 아래 액션 줄: 좋아요, 댓글, 리포스트, 공유 / 저장 */
export default function FeedPostActions({
  likesCount,
  commentsCount,
}: FeedPostActionsProps) {
  return (
    <section className="flex items-center px-1 pt-1">
      <div className="flex flex-1 items-center">
        <ActionButton label="좋아요">
          <HeartIcon />
        </ActionButton>
        {likesCount > 0 && <Count value={likesCount} />}

        <ActionButton label="댓글 달기">
          <CommentIcon />
        </ActionButton>
        {commentsCount > 0 && <Count value={commentsCount} />}

        <ActionButton label="리포스트">
          <RepostIcon />
        </ActionButton>
        <ActionButton label="공유하기">
          <MessageIcon />
        </ActionButton>
      </div>

      <ActionButton label="저장">
        <BookmarkIcon />
      </ActionButton>
    </section>
  );
}
