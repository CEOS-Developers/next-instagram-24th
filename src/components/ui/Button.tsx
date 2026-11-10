import type { ComponentProps } from "react";
import "@/styles/globals.css";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary: "bg-brand text-surface enabled:hover:bg-brand-hover",
  secondary:
    "bg-surface-muted text-text-primary enabled:hover:bg-surface-hover",
};

const sizes = {
  sm: "min-h-8 px-4 py-1.5 text-body",
  md: "min-h-9 px-4 py-2 text-body",
  lg: "min-h-12 px-6 py-3 text-nav",
};

export default function Button({
  children,
  variant = "secondary",
  size = "sm",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={[
        "box-border inline-flex items-center justify-center gap-2",
        "rounded-button border-0 font-sans font-semibold",
        "cursor-pointer transition-[background-color,opacity] duration-150",
        "enabled:active:opacity-70",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "focus-visible:outline-2 focus-visible:outline-solid",
        "focus-visible:outline-brand focus-visible:outline-offset-2",
        "pointer-coarse:min-h-[44px] motion-reduce:transition-none",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
