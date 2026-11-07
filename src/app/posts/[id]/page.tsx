import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import PostDetails from "@/components/PostDetails";

export function generateStaticParams() {
  return posts.map(({ id }) => ({ id }));
}

export default function PostPage({ params }: PageProps<"/posts/[id]">) {
  return <Suspense fallback={null}><PostContent params={params} /></Suspense>;
}

async function PostContent({ params }: Pick<PageProps<"/posts/[id]">, "params">) {
  const { id } = await params;
  const post = posts.find((post) => post.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-3 py-4 md:px-8">
      <Link href={`/${post.authorUsername}`} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline">
        <ArrowLeft size={18} aria-hidden="true" />프로필로 돌아가기
      </Link>
      <PostDetails post={post} />
    </div>
  );
}
