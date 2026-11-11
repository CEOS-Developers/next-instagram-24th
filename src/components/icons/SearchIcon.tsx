import type { IconProps } from './types';

export default function SearchIcon({
  filled = false,
  ...props
}: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={filled ? 3 : 2}
      aria-hidden="true"
      {...props}
    >
      <path
        d={
          filled
            ? 'M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z'
            : 'M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z'
        }
      />
      <line x1="16.511" x2="22" y1="16.511" y2="22" />
    </svg>
  );
}
