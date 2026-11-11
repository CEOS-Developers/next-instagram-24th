import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  size: number;
}

export default function Avatar({ src, alt, size }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}
