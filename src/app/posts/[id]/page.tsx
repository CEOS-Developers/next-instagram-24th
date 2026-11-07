import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map(({ id }) => ({ id }));
}

export default async function PostPage({ params }: PageProps<"/posts/[id]">) {
  const { id } = await params;
  const post = posts.find((post) => post.id === id);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto grid max-w-4xl border border-gray-200 lg:mt-8 lg:grid-cols-[3fr_2fr]">
      <div aria-hidden="true" className="aspect-square bg-gray-100" />
      <div className="min-w-0">
        <header className="border-b border-gray-200 px-4 py-3">
          <Link
            href={`/${post.authorUsername}`}
            className="break-all text-sm font-semibold hover:underline"
          >
            {post.authorUsername}
          </Link>
        </header>
        <h1 className="px-4 py-4 text-sm font-medium">{post.title}</h1>
      </div>
    </article>
  );
}
