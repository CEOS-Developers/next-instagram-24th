import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import RelativeTime from "./RelativeTime";

export type PostCaptionProps = {
  post: Post;
  author: User;
};

export default function PostCaption({ post, author }: PostCaptionProps) {
  const profileHref = `/${encodeURIComponent(author.username)}`;

  return (
    <div className="flex gap-3">
      <Link href={profileHref} tabIndex={-1} aria-hidden="true" className="shrink-0">
        <Avatar src={author.avatarUrl} alt="" size="sm" />
      </Link>

      <div className="min-w-0 flex-1 pt-1.5">
        <p className="whitespace-pre-wrap wrap-anywhere text-body text-text-primary">
          <Link
            href={profileHref}
            className="mr-1 font-semibold hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {author.username}
          </Link>
          {post.caption}
        </p>

        <RelativeTime
          dateTime={post.createdAt}
          className="mt-2 block text-caption text-text-secondary"
        />
      </div>
    </div>
  );
}
