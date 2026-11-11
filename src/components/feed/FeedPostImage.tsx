import Image from 'next/image';

interface FeedPostImageProps {
  src: string;
  alt: string;
}

/**
 * 홈 피드 게시물 사진. 인스타그램 세로 사진 비율(4:5, 468 × 585)로 보여주고,
 * 비율이 다른 사진은 박스를 꽉 채우도록 잘라낸다.
 */
export default function FeedPostImage({ src, alt }: FeedPostImageProps) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
      <Image src={src} alt={alt} fill sizes="468px" className="object-cover" />
    </div>
  );
}
