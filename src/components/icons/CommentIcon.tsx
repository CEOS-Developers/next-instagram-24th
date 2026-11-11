import type { IconProps } from './types';

export default function CommentIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
    </svg>
  );
}
