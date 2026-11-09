import { Bookmark, Camera, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PostGridStats from "@/components/profile/PostGridStats";
import type { Post } from "@/data/posts";

export default function ProfilePosts({ posts, isSaved = false }: { posts: Post[]; isSaved?: boolean }) {
  if (posts.length === 0) {
    const EmptyIcon = isSaved ? Bookmark : Camera;

    return (
      <div className="flex flex-col items-center gap-6 px-4 py-16 text-center sm:py-20">
        <span className="grid size-16 place-items-center rounded-full border border-current">
          <EmptyIcon aria-hidden="true" className="size-8" strokeWidth={1.25} />
        </span>
        <h3 className="text-xl font-semibold sm:text-2xl">{isSaved ? "저장된 게시물 없음" : "게시물 없음"}</h3>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-t-md xl:grid-cols-4">
      {posts.map(({ id, likeCount, images }) => (
        <li key={id}>
          <Link
            href={`/posts/${id}`}
            className="group relative block aspect-[3/4] overflow-hidden bg-neutral-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500 dark:bg-neutral-800"
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              sizes="(min-width: 1280px) 256px, (min-width: 1024px) 341px, 33vw"
              className="object-cover"
            />
            {images.length > 1 && (
              <>
                <Copy aria-hidden="true" className="absolute top-2 right-2 size-4 fill-white text-white drop-shadow-md sm:size-5" />
                <span className="sr-only">사진 {images.length}장</span>
              </>
            )}
            <PostGridStats postId={id} likeCount={likeCount} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
