import { notFound } from 'next/navigation';

import PostDetail from '@/components/post/PostDetail';
import { posts } from '@/data/posts';
import { currentUserId, users } from '@/data/users';

interface PostPageProps {
  params: Promise<{ username: string; postId: string }>;
}

export function generateStaticParams() {
  return posts.flatMap((post) => {
    const author = users.find((user) => user.id === post.authorId);
    return author ? [{ username: author.username, postId: post.id }] : [];
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { username, postId } = await params;
  const author = users.find((user) => user.username === username);
  const post = posts.find(
    (item) => item.id === postId && item.authorId === author?.id
  );

  if (!author || !post) notFound();

  return (
    <PostDetail
      key={post.id}
      post={post}
      author={author}
      users={users}
      currentUserId={currentUserId}
    />
  );
}
