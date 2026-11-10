import Image from "next/image";
import "@/styles/globals.css";

export type AvatarProps = {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { pixels: 32, className: "size-8" },
  md: { pixels: 44, className: "size-11" },
  lg: { pixels: 150, className: "size-[150px]" },
};

export default function Avatar({
  src,
  alt,
  size = "md",
  className = "",
}: AvatarProps) {
  const selectedSize = sizes[size];

  return (
    <Image
      src={src || "/images/profile.svg"}
      alt={alt}
      width={selectedSize.pixels}
      height={selectedSize.pixels}
      className={[
        "shrink-0 rounded-avatar border border-border",
        "bg-surface-muted object-cover",
        selectedSize.className,
        className,
      ].join(" ")}
    />
  );
}
