import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex h-12 w-full rounded-[3px] border-0 border-b bg-transparent px-0 text-[15px] text-ink",
        "placeholder:text-ink-3/60 transition-colors",
        "focus-visible:outline-none focus-visible:border-ink",
        "disabled:cursor-not-allowed disabled:opacity-50",
        invalid ? "border-orange" : "border-ink/25",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
