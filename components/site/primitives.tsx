import * as React from "react";
import { cn } from "@/lib/utils";

/** The one content measure. Everything lines up to this. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/** Mono uppercase label — the "ledger" voice. */
export function Kicker({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return <Tag className={cn("kicker text-ink-3", className)}>{children}</Tag>;
}

/** A full-bleed-within-container hairline, optionally labelled at both ends. */
export function RuleRow({
  left,
  right,
  className,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-t border-ink/15 pt-3",
        className,
      )}
    >
      {left ? <Kicker>{left}</Kicker> : <span />}
      {right ? <Kicker>{right}</Kicker> : <span />}
    </div>
  );
}
