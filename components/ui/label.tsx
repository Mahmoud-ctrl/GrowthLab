import * as React from "react";
import { cn } from "@/lib/utils";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "kicker text-ink-3 [font-size:0.68rem]",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";
