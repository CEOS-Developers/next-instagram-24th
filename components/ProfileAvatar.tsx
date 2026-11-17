import Image from "next/image";
import { diaryProfile } from "@/data/profiles";

type ProfileAvatarProps = {
  src: string;
  size: number;
  className?: string;
};

export default function ProfileAvatar({ src, size, className = "" }: ProfileAvatarProps) {
  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className={`size-full object-cover ${src === diaryProfile.avatar ? "origin-top-left scale-[1.9] object-top-left" : ""}`}
      />
    </span>
  );
}
