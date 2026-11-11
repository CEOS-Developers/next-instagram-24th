import { connection } from 'next/server';

import { posts } from '@/data/posts';
import { currentUserId, users } from '@/data/users';
import shuffle from '@/lib/shuffle';

import FeedPost from './FeedPost';

/*
 * 홈 피드 목록. 내 게시물은 빼고 다른 사람 게시물만 무작위 순서로 보여준다.
 * * 새로고침할 때마다 순서가 새로 섞인다. (page.tsx에서 Suspense로 감싼다)
 */
export default async function Feed() {
  await connection();

  const feedPosts = posts.flatMap((post) => {
    if (post.authorId === currentUserId) return [];
    const author = users.find((user) => user.id === post.authorId);
    return author ? [{ post, author }] : [];
  });

  return (
    <div className="flex flex-col">
      {shuffle(feedPosts).map(({ post, author }) => (
        <FeedPost key={post.id} post={post} author={author} />
      ))}
    </div>
  );
}
