import type { IconProps } from './types';

export default function MoreIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      <line x1="3" x2="21" y1="4" y2="4" />
      <line x1="3" x2="21" y1="12" y2="12" />
      <line x1="3" x2="21" y1="20" y2="20" />
    </svg>
  );
}
