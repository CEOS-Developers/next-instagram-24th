import Image from "next/image";
import { getPosts } from "@/data/posts";
// 프로필 아래 게시물 그리드 (한 줄에 3칸, 3:4 비율)
export default function PostGrid() {
  const posts = getPosts();

  return (
    <div className="grid grid-cols-3 gap-[1px]">
      {posts.map((post) => (
        <div key={post.id} className="relative aspect-[3/4]">
          <Image
            src={post.images[0]}
            alt={post.caption}
            fill
            sizes="(max-width: 430px) 33vw, 143px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
