import type { ComponentProps } from "react";
import "@/styles/globals.css";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "bg-brand text-surface enabled:hover:bg-brand-hover",
  secondary:
    "bg-surface-muted text-text-primary enabled:hover:bg-surface-hover",
};

export default function Button({
  children,
  variant = "secondary",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={[
        "box-border inline-flex min-h-8 items-center justify-center gap-2",
        "rounded-button border-0 px-4 py-1.5 font-sans text-body font-semibold",
        "cursor-pointer transition-[background-color,opacity] duration-150",
        "enabled:active:opacity-70",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "focus-visible:outline-2 focus-visible:outline-solid",
        "focus-visible:outline-brand focus-visible:outline-offset-2",
        "pointer-coarse:min-h-[44px] motion-reduce:transition-none",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
