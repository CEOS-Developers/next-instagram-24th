import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProfileAvatar from "@/components/ProfileAvatar";
import { getPost, getPosts } from "@/data/posts";
import { getProfile } from "@/data/profiles";
import PostBackButton from "./_components/PostBackButton";
import PostBookmarkButton from "./_components/PostBookmarkButton";
import PostImageSlider from "./_components/PostImageSlider";
import PostLikeButton from "./_components/PostLikeButton";
import PostExtraActions from "@/components/PostExtraActions";

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
  const author = getProfile(post.authorId);
  if (!author) notFound();

  const authorHref = `/${author.username}`;

  return (
    <main className="mx-auto w-full max-w-[430px]">
      {/* A. 헤더 */}
      <header className="grid h-11 grid-cols-[24px_minmax(0,1fr)_24px] items-center px-4">
        <PostBackButton fallbackHref={authorHref} />
        <h1 className="text-center">게시물</h1>
        <span />
      </header>

      {/* B. 작성자 줄 */}
      <div className="flex h-14 items-center pl-3">
        <Link href={authorHref} className="flex items-center gap-3.5">
          <ProfileAvatar src={author.avatar} size={32} />
          <span className="text-sm leading-[18px] font-semibold">
            {author.username}
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
      <PostImageSlider key={post.id} images={post.images} />

      {/* 사진 아래 정보 영역 */}
      <div className="px-4 pt-1.5 pb-4">
        {/* D. 아이콘 줄 */}
        <section className="mt-1 flex h-10 items-center gap-4">
  <PostLikeButton postId={post.id} initialLikes={post.likes} />
  <PostExtraActions />
  <PostBookmarkButton postId={post.id} />
</section>

        {/* F. 본문 */}
        <p className="text-sm">
          <Link href={authorHref} className="font-semibold ">
            {author.username}
          </Link>{" "}
          {post.caption}
        </p>

        {/* G. 날짜 */}
        <time
          dateTime={post.createdAt}
          className="mt-1 block text-xs text-[#a8a8a8]"
        >
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
