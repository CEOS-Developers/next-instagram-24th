import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Icon from "@/components/ui/Icon";
import IconButton from "@/components/ui/IconButton";
import type { User } from "@/types/user";
import RelativeTime from "./RelativeTime";

export type PostAuthorHeaderProps = {
  author: User;
  /** 넘기면 username 옆에 "• 1일"처럼 작성 시간을 표시합니다. */
  createdAt?: string;
};

export default function PostAuthorHeader({ author, createdAt }: PostAuthorHeaderProps) {
  const profileHref = `/${encodeURIComponent(author.username)}`;

  return (
    <div className="flex w-full items-center gap-3">
      {/* 아바타는 username 링크와 같은 곳으로 이동하므로 스크린 리더에서는 한 번만 읽습니다. */}
      <Link href={profileHref} tabIndex={-1} aria-hidden="true" className="shrink-0">
        <Avatar src={author.avatarUrl} alt="" size="sm" />
      </Link>

      <div className="flex min-w-0 flex-1 items-center gap-1 text-body">
        <Link
          href={profileHref}
          className="min-w-0 truncate font-semibold text-text-primary hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {author.username}
        </Link>

        {createdAt && (
          <>
            <span aria-hidden="true" className="text-text-secondary">
              •
            </span>
            <RelativeTime dateTime={createdAt} className="shrink-0 text-text-secondary" />
          </>
        )}
      </div>

      {/* 옵션 메뉴는 UI만 구현합니다. */}
      <IconButton aria-label="게시물 옵션 더 보기" className="-mr-2">
        <Icon name="more" />
      </IconButton>
    </div>
  );
}
