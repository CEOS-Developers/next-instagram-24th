import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPost, getPosts } from "@/data/posts";
import { defaultUsername, myPageHref, profileImage } from "@/app/_lib/profile";
import PostImageSlider from "./_components/PostImageSlider";

export function generateStaticParams() {
  return getPosts().map((post) => ({ postId: post.id }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = getPost(postId);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-[430px]">
      {/* A. 헤더 */}
      <header className="grid h-11 grid-cols-[24px_minmax(0,1fr)_24px] items-center px-4">
        <Link href={myPageHref} aria-label="뒤로 가기">
          <Image
            src="/icons/arrow.svg"
            alt=""
            width={24}
            height={24}
            className="-rotate-90 dark:invert"
          />
        </Link>
        <h1 className="text-center">게시물</h1>
        <span />
      </header>

      {/* B. 작성자 줄 */}
      <div className="flex h-14 items-center pl-3">
        <Link href={myPageHref} className="flex items-center gap-3.5">
          <Image
            src={profileImage}
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
          <span className="text-sm leading-[18px] font-semibold">
            {defaultUsername}
          </span>
        </Link>
        <button
          type="button"
          disabled
          aria-label="옵션 더 보기"
          className="ml-auto p-2 disabled:cursor-not-allowed"
        >
          <Image
            src="/icons/more-options.svg"
            alt=""
            width={24}
            height={24}
            className="dark:invert"
          />
        </button>
      </div>

      {/* C. 사진 */}
      <PostImageSlider images={post.images} alt={post.caption} />

      {/* 사진 아래 정보 영역 */}
<div className="px-4 pt-1.5 pb-4">
  {/* D. 아이콘 줄 */}
  <section className="mt-1 flex h-10 items-center">
    <button
      type="button"
      disabled
      aria-label="좋아요"
      className="flex items-center gap-1.5 disabled:cursor-not-allowed"
    >
      <Image
        src="/icons/heart.svg"
        alt=""
        width={24}
        height={24}
        className="dark:invert"
      />
      <span className="text-sm font-semibold">{post.likes}</span>
    </button>
    <button
      type="button"
      disabled
      aria-label="저장"
      className="ml-auto disabled:cursor-not-allowed"
    >
      <Image
        src="/icons/bookmark.svg"
        alt=""
        width={24}
        height={24}
        className="dark:invert"
      />
    </button>
  </section>

  {/* F. 본문 */}
<p className="text-sm">
  <span className="font-semibold">{defaultUsername}</span> {post.caption}
</p>

{/* G. 날짜 */}
<time dateTime={post.createdAt} className="mt-1 block text-xs text-[#a8a8a8]">
  {formatDate(post.createdAt)}
</time>
</div>
    </main>
  );
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}