import Image from "next/image";
import type { PostImage } from "@/data/posts";

type PostPhotoProps = {
  image: PostImage;
  sizes: string;
};

export default function PostPhoto({
  image,
  sizes,
}: PostPhotoProps) {
  return (
    <div className="relative size-full overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
