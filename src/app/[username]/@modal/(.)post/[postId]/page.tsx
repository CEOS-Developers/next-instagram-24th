import { Suspense } from "react";
import { notFound } from "next/navigation";
import PostDetail from "@/components/post/PostDetail";
import PostModal from "@/components/post/PostModal";
import { findPostWithAuthor } from "@/lib/posts";

type PostModalPageProps = {
  params: Promise<{ username: string; postId: string }>;
};

async function PostModalContent({ params }: PostModalPageProps) {
  const { username, postId } = await params;
  const result = findPostWithAuthor(username, postId);

  if (!result) notFound();

  return (
    <PostDetail
      post={result.post}
      author={result.author}
      comments={result.comments}
      variant="modal"
    />
  );
}

// 프로필에서 썸네일을 눌러 이동하면 상세 페이지 대신 이 모달이 열립니다.
export default function PostModalPage({ params }: PostModalPageProps) {
  return (
    <PostModal>
      <Suspense fallback={null}>
        <PostModalContent params={params} />
      </Suspense>
    </PostModal>
  );
}
