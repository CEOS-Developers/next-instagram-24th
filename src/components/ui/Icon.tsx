import type { ComponentProps } from "react";
import "@/styles/globals.css";

export type IconName =
  | "heart"
  | "comment"
  | "more"
  | "share"
  | "instagram"
  | "home"
  | "reels"
  | "search"
  | "plus"
  | "menu"
  | "apps";

export type IconProps = Omit<ComponentProps<"svg">, "children" | "name"> & {
  name: IconName;
  size?: number;
  /** 하트와 홈 아이콘 안쪽을 채웁니다. 색상은 className으로 지정합니다. */
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

      {name === "instagram" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "home" && (
        <path
          d="m2 10 10-8 10 8h-3v11h-5v-7h-4v7H5V10H2Z"
          fill={filled ? "currentColor" : "none"}
        />
      )}

      {name === "reels" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="m10 8 7 4-7 4V8Z" />
        </>
      )}

      {name === "search" && (
        <>
          <circle cx="10.5" cy="10.5" r="7.5" />
          <path d="m16 16 5 5" />
        </>
      )}

      {name === "plus" && <path d="M12 4v16M4 12h16" />}

      {name === "menu" && <path d="M3 5h18M3 12h18M3 19h18" />}

      {name === "apps" && (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </>
      )}
    </svg>
  );
}
