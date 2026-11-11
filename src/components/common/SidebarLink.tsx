'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type SidebarItemProps = {
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  href?: string;
  active?: boolean;
  /** 사이드바가 펼쳐져도 글자를 보여주지 않는다. (로고) */
  hideLabel?: boolean;
  /** hover 배경을 한 줄 전체가 아니라 내용 크기만큼만 그린다. (로고, 홈) */
  fitContent?: boolean;
};

const itemClassName =
  'group/item my-1 flex h-12 items-center gap-4 overflow-hidden rounded-lg p-3 transition-colors hover:bg-white/10';

/** 사이드바 메뉴 한 칸의 모양. href가 있으면 링크, 없으면 버튼으로 그린다. */
export function SidebarItem({
  label,
  icon,
  activeIcon,
  href,
  active = false,
  hideLabel = false,
  fitContent = false,
}: SidebarItemProps) {
  const className = `${itemClassName} ${fitContent ? 'w-fit' : 'w-full'}`;

  const content = (
    <>
      <span className="shrink-0 transition-transform duration-200 group-hover/item:scale-105">
        {active && activeIcon ? activeIcon : icon}
      </span>
      {!hideLabel && (
        <span
          className={`-translate-x-4 text-base leading-5 whitespace-nowrap opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 ${
            active ? 'font-semibold' : 'font-normal'
          }`}
        >
          {label}
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <button type="button" aria-label={label} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={className}
    >
      {content}
    </Link>
  );
}

/** 현재 URL을 읽어서 활성 상태를 정하는 메뉴. 페이지 이동이 있는 메뉴에만 쓴다. */
export default function SidebarLink(
  props: Omit<SidebarItemProps, 'active'> & { href: string }
) {
  const pathname = usePathname();
  const active =
    props.href === '/'
      ? pathname === '/'
      : pathname === props.href || pathname.startsWith(`${props.href}/`);

  return <SidebarItem {...props} active={active} />;
}
