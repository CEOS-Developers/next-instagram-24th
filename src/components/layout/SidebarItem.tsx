import type { ReactNode } from "react";
import "@/styles/globals.css";

export type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  className?: string;
};

/** ul 안에 배치하고, 사이드바 부모에 group/sidebar를 지정합니다. */
export default function SidebarItem({
  icon,
  label,
  active = false,
  className = "",
}: SidebarItemProps) {
  return (
    <li
      className={[
        "box-border flex min-h-[48px] w-full min-w-0 items-center gap-3",
        "overflow-hidden rounded-button p-2 font-sans text-nav text-text-primary",
        "hover:bg-surface-muted",
        active ? "font-semibold" : "font-normal",
        className,
      ].join(" ")}
    >
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
    </li>
  );
}
