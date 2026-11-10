import type { ComponentProps } from "react";
import "@/styles/globals.css";

export type IconName = "heart" | "comment" | "more" | "share";

export type IconProps = Omit<ComponentProps<"svg">, "children" | "name"> & {
  name: IconName;
  size?: number;
  /** 하트 아이콘 안쪽을 채웁니다. 색상은 className으로 지정합니다. */
  filled?: boolean;
};

export default function Icon({
  name,
  size = 24,
  filled = false,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {name === "heart" && (
        <path
          d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"
          fill={filled ? "currentColor" : "none"}
        />
      )}

      {name === "comment" && (
        <path d="M21 11.5A9 9 0 1 0 4.5 16.4L3 21l4.6-1.5A9 9 0 0 0 21 11.5Z" />
      )}

      {name === "share" && (
        <>
          <path d="m22 2-7 20-4-9-9-4L22 2Z" />
          <path d="M11 13 22 2" />
        </>
      )}

      {name === "more" && (
        <g fill="currentColor" stroke="none">
          <circle cx="5" cy="12" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="19" cy="12" r="1.8" />
        </g>
      )}
    </svg>
  );
}
