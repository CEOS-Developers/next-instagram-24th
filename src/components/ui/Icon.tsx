import type { ComponentProps } from "react";
import "@/styles/globals.css";

export type IconName =
  | "heart"
  | "comment"
  | "more"
  | "share"
  | "save"
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
  /** 하트, 홈, 저장 아이콘 안쪽을 채웁니다. 색상은 className으로 지정합니다. */
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* heart, comment, share, more, home, save는 인스타그램 웹 아이콘 모양입니다. */}
      {name === "heart" &&
        (filled ? (
          <path
            fill="currentColor"
            stroke="none"
            transform="scale(0.5)"
            d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
          />
        ) : (
          <path
            fill="currentColor"
            stroke="none"
            d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
          />
        ))}

      {name === "comment" && (
        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
      )}

      {name === "share" && (
        <>
          <line x1="22" x2="9.218" y1="3" y2="10.083" />
          <polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" />
        </>
      )}

      {name === "save" &&
        (filled ? (
          <path
            fill="currentColor"
            stroke="none"
            d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"
          />
        ) : (
          <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" />
        ))}

      {name === "more" && (
        <g fill="currentColor" stroke="none">
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="6" cy="12" r="1.5" />
          <circle cx="18" cy="12" r="1.5" />
        </g>
      )}

      {name === "instagram" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "home" &&
        (filled ? (
          <path
            fill="currentColor"
            stroke="none"
            d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"
          />
        ) : (
          <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" />
        ))}

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
