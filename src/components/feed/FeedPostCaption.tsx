import Link from 'next/link';

interface FeedPostCaptionProps {
  username: string;
  content: string;
}

/** 홈 피드 게시물 본문: 작성자 이름 + 내용 */
export default function FeedPostCaption({
  username,
  content,
}: FeedPostCaptionProps) {
  return (
    <p className="px-3 text-sm leading-[18px]">
      <Link href={`/${username}`} className="mr-1 font-semibold">
        {username}
      </Link>
      {content}
    </p>
  );
}
