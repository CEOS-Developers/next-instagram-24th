// 앱에서 쓰는 아이콘 (24x24 SVG, 선 아이콘)
// filled 를 넘기면 채워진 버전 (현재 메뉴, 좋아요/저장 상태 등)

type IconProps = {
  className?: string;
  filled?: boolean;
};

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function HomeIcon({ className, filled }: IconProps) {
  return (
    <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

export function PlusSquareIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function HeartIcon({ className, filled }: IconProps) {
  return (
    <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
      <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 6.9 4.5c2.1 0 3.6 1.2 5.1 3 1.5-1.8 3-3 5.1-3 3.5 0 5.5 3.5 4.2 6.8-1.8 4.6-9.3 9.2-9.3 9.2z" />
    </svg>
  );
}

export function CommentIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} fill="none">
      <path d="M20.6 16.2A9 9 0 1 0 17 20l4 1z" />
    </svg>
  );
}

export function SendIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} fill="none">
      <path d="M22 3 9.2 10.1M22 3l-6.5 18-3.3-7.9L3 9.5z" />
    </svg>
  );
}

export function BookmarkIcon({ className, filled }: IconProps) {
  return (
    <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
      <path d="M19 21 12 16l-7 5V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} fill="none">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </svg>
  );
}

// 게시물이 여러 장일 때 그리드 썸네일 우측 상단에 표시
export function MultipleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} fill="currentColor" stroke="none">
      <path d="M7 2h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M3 6v14a2 2 0 0 0 2 2h14" fill="none" stroke="currentColor" />
    </svg>
  );
}
