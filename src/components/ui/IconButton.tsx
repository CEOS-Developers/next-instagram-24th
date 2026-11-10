import type { ComponentProps, ReactNode } from "react";
import "@/styles/globals.css";

export type IconButtonProps = Omit<
  ComponentProps<"button">,
  "children" | "aria-label"
> & {
  children: ReactNode;
  "aria-label": string;
};

export default function IconButton({
  children,
  "aria-label": ariaLabel,
  type = "button",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={ariaLabel}
      className={[
        "box-border inline-flex size-10 shrink-0 items-center justify-center",
        "rounded-button border-0 bg-transparent p-0 text-text-primary",
        "cursor-pointer transition-[background-color,opacity] duration-150",
        "enabled:hover:bg-surface-muted enabled:active:opacity-70",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "focus-visible:outline-2 focus-visible:outline-solid",
        "focus-visible:outline-brand focus-visible:outline-offset-2",
        "pointer-coarse:min-h-[44px] pointer-coarse:min-w-[44px]",
        "motion-reduce:transition-none",
        className,
      ].join(" ")}
    >
      <span aria-hidden="true" className="inline-flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}
