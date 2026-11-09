import { Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PostGridStats from "@/components/profile/PostGridStats";
import type { Post } from "@/data/posts";

export default function ProfilePosts({ posts }: { posts: Post[] }) {
  return (
    <section aria-labelledby="profile-posts-heading">
      <h2
        id="profile-posts-heading"
        className="border-t border-neutral-200 py-4 text-center text-sm font-semibold dark:border-neutral-800"
      >
        게시물
      </h2>
      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-6 px-4 py-16 text-center sm:py-20">
          <span className="grid size-16 place-items-center rounded-full border border-current">
            <Camera aria-hidden="true" className="size-8" strokeWidth={1.25} />
          </span>
          <h3 className="text-xl font-semibold sm:text-2xl">게시물 없음</h3>
        </div>
      ) : (
        <ul className="grid grid-cols-3 gap-1 xl:grid-cols-4">
          {posts.map(({ id, likeCount, images: [cover] }) => (
            <li key={id}>
              <Link
                href={`/posts/${id}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-neutral-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-neutral-800"
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(min-width: 1280px) 256px, (min-width: 1024px) 341px, 33vw"
                  className="object-cover"
                />
                <PostGridStats postId={id} likeCount={likeCount} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
