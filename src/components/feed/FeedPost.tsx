import type { Post } from '@/types/post';
import type { User } from '@/types/user';

import FeedPostActions from './FeedPostActions';
import FeedPostCaption from './FeedPostCaption';
import FeedPostHeader from './FeedPostHeader';
import FeedPostImage from './FeedPostImage';

interface FeedPostProps {
  post: Post;
  author: User;
}

/** 홈 피드 게시물 카드 하나: 헤더 / 사진 / 액션 줄 / 본문 */
export default function FeedPost({ post, author }: FeedPostProps) {
  return (
    <article className="pb-4">
      <FeedPostHeader post={post} author={author} />
      <FeedPostImage
        src={post.imageUrl}
        alt={`${author.username}님의 게시물 사진`}
      />
      <FeedPostActions
        likesCount={post.likesCount}
        commentsCount={post.comments.length}
      />
      <FeedPostCaption username={author.username} content={post.content} />
    </article>
  );
}
