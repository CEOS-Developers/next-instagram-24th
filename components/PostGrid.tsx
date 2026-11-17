import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/post";

export default function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-3 gap-[1px]">
      {posts.map(({ id, images: [cover] }) => (
        <Link key={id} href={`/p/${id}`} className="relative aspect-[3/4]">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 430px) 33vw, 143px"
            className="object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
