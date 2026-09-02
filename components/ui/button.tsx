import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "inverted";
type Size = "default" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-tight transition-colors duration-150 cursor-pointer " +
  "focus-visible:outline-none ring-editorial disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-[#1c2e52]",
  outline:
    "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink-2 hover:text-ink hover:bg-ink/5",
  inverted: "bg-paper text-ink hover:bg-orange hover:text-on-orange",
};

const sizes: Record<Size, string> = {
  default: "h-11 px-5 text-[13px]",
  lg: "h-[52px] px-7 text-sm",
  sm: "h-9 px-4 text-[12px]",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
