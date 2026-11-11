import Image from 'next/image';
import Link from 'next/link';

import type { Post } from '@/types/post';

interface PostGridProps {
  posts: Post[];
  username: string;
  authorUsernames?: Record<string, string>;
}

export default function PostGrid({
  posts,
  username,
  authorUsernames,
}: PostGridProps) {
  return (
    <div className="grid grid-cols-4 gap-[1px]">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/${authorUsernames?.[post.authorId] ?? username}/posts/${post.id}`}
          aria-label={`${authorUsernames?.[post.authorId] ?? username}의 게시물: ${post.content}`}
          className="relative block aspect-[3/4] overflow-hidden"
        >
          <Image
            src={post.imageUrl}
            alt={post.content}
            fill
            sizes="25vw"
            className="object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
