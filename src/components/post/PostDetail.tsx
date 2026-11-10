import Image from "next/image";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import PostAuthorHeader from "./PostAuthorHeader";

export type PostDetailProps = {
  post: Post;
  author: User;
};

export default function PostDetail({ post, author }: PostDetailProps) {
  return (
    <article
      aria-label={`${author.username}님의 게시물`}
      className="mx-auto grid w-full max-w-[1217px] overflow-hidden rounded-lg border border-border bg-surface lg:grid-cols-[minmax(0,1fr)_500px]"
    >
      {/* 왼쪽: 이미지. 정사각형 영역 안에서 비율을 유지하고 남는 공간은 검은 배경입니다. */}
      <div className="relative aspect-square bg-black">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 717px, 100vw"
          className="object-contain"
        />
      </div>

      {/* 오른쪽: 정보 패널. 데스크톱에서는 이미지 높이에 맞추고 본문만 스크롤됩니다. */}
      <div className="relative border-border max-lg:border-t lg:border-l">
        <div className="flex h-full flex-col lg:absolute lg:inset-0">
          {/* 작성자 헤더 */}
          <header className="flex min-h-[70px] shrink-0 items-center border-b border-border px-4">
            <PostAuthorHeader author={author} />
          </header>

          {/* 본문과 댓글 목록 */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4" />

          {/* 좋아요·저장 버튼, 좋아요 수, 작성일 */}
          <section
            aria-label="게시물 반응"
            className="shrink-0 border-t border-border px-4 py-3"
          />

          {/* 댓글 입력 */}
          <div className="flex min-h-[52px] shrink-0 items-center border-t border-border px-4" />
        </div>
      </div>
    </article>
  );
}
