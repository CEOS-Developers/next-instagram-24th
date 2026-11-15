import type { ReactNode } from "react";
import Link from "next/link";
import "@/styles/globals.css";

export type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  className?: string;
};

export default function SidebarItem({
  icon,
  label,
  href,
  active = false,
  className = "",
}: SidebarItemProps) {
  const itemClassName = [
    "box-border flex min-h-[48px] w-full min-w-0 items-center gap-3",
    "overflow-hidden rounded-button p-2 font-sans text-nav text-text-primary",
    "hover:bg-surface-muted",
    active ? "font-semibold" : "font-normal",
    className,
  ].join(" ");

  const content = (
    <>
      <span
        aria-hidden="true"
        className="inline-flex size-8 shrink-0 items-center justify-center"
      >
        {icon}
      </span>

      <span
        className={[
          "min-w-0 whitespace-nowrap opacity-0",
          "transition-opacity duration-200 motion-reduce:transition-none",
          "group-hover/sidebar:opacity-100",
          "group-focus-within/sidebar:opacity-100",
        ].join(" ")}
      >
        {label}
      </span>
    </>
  );

  return (
    <li className="min-w-0">
      {href ? (
        <Link
          href={href}
          className={`${itemClassName} focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand`}
        >
          {content}
        </Link>
      ) : (
        <div className={itemClassName}>{content}</div>
      )}
    </li>
  );
}
