import Image from "next/image";
import type { CommentWithAuthor } from "@/lib/posts";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import CommentList from "./CommentList";
import PostActions from "./PostActions";
import PostAuthorHeader from "./PostAuthorHeader";
import PostCaption from "./PostCaption";

export type PostDetailProps = {
  post: Post;
  author: User;
  comments: CommentWithAuthor[];
  /** page: 단독 상세 페이지, modal: 프로필 위에 뜨는 모달 */
  variant?: "page" | "modal";
};

const layoutClassNames = {
  page: {
    article:
      "mx-auto grid w-full max-w-[1217px] rounded-lg border border-border lg:grid-cols-[minmax(0,1fr)_500px]",
    image: "aspect-square",
    panel: "border-border max-lg:border-t lg:border-l",
  },
  // 모달은 화면 높이에서 위아래 24px을 뺀 높이에 맞추고, 이미지는 그 높이의 정사각형입니다.
  modal: {
    article:
      "flex rounded-lg max-lg:max-h-[calc(100dvh-48px)] max-lg:w-[calc(100vw-32px)] max-lg:flex-col max-lg:overflow-y-auto lg:h-[calc(100dvh-48px)] lg:max-w-[calc(100vw-128px)]",
    image: "aspect-square min-w-0 shrink lg:h-full",
    panel: "shrink-0 lg:w-[500px]",
  },
};

export default function PostDetail({
  post,
  author,
  comments,
  variant = "page",
}: PostDetailProps) {
  const classNames = layoutClassNames[variant];
  // 댓글 버튼을 누르면 이 id의 입력창으로 포커스를 옮깁니다.
  const commentInputId = `comment-input-${post.id}`;

  return (
    <article
      aria-label={`${author.username}님의 게시물`}
      className={`overflow-hidden bg-surface ${classNames.article}`}
    >
      {/* 왼쪽: 이미지. 정사각형 영역 안에서 비율을 유지하고 남는 공간은 검은 배경입니다. */}
      <div className={`relative bg-black ${classNames.image}`}>
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
      <div className={`relative ${classNames.panel}`}>
        <div className="flex h-full flex-col lg:absolute lg:inset-0">
          {/* 작성자 헤더 */}
          <header className="flex min-h-[70px] shrink-0 items-center border-b border-border px-4">
            <PostAuthorHeader author={author} />
          </header>

          {/* 본문과 댓글 목록 */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <PostCaption post={post} author={author} />
            <CommentList comments={comments} />
          </div>

          {/* 좋아요·저장 버튼, 좋아요 수, 작성일 */}
          <section
            aria-label="게시물 반응"
            className="shrink-0 border-t border-border px-4 pt-1.5 pb-3"
          >
            <PostActions post={post} commentInputId={commentInputId} />
          </section>

          {/* 댓글 입력 */}
          <div className="flex min-h-[52px] shrink-0 items-center border-t border-border px-4" />
        </div>
      </div>
    </article>
  );
}
